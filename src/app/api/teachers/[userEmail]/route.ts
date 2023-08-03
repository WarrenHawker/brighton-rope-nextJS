import { prismaClient } from '@/lib/prisma/client';
import { ApiParams, Position } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import validator from 'validator';
import { Prisma } from '@prisma/client';
import { handleError } from '@/utils/functions';

//get single teacher by userEmail
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  //check email param
  if (!params.userEmail) {
    return NextResponse.json({ error: 'no user email given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (
    session?.user.role != 'SUPERADMIN' &&
    session?.user.email != params.userEmail
  ) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //try fetching teacher bio from database
  try {
    const teacher = await prismaClient.teachers.findUnique({
      where: { email: params.userEmail },
    });
    if (teacher) {
      return NextResponse.json({ teacher }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'No teacher bio found' },
        { status: 404 }
      );
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//edit single teacher by userEmail
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  const body = await request.json();
  //check email param
  if (!params.userEmail) {
    return NextResponse.json({ error: 'no user email given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (
    session?.user.role != 'SUPERADMIN' &&
    session?.user.email != params.userEmail
  ) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //sanitise inputs
  if (body.name) {
    body.name = validator.escape(body.name).trim();
  }
  if (body.pronouns) {
    body.pronouns = validator.escape(body.pronouns).trim();
  }
  if (body.description) {
    body.description = encodeURIComponent(body.description).trim();
  }
  if (body.position) {
    body.position = validator.escape(body.position).trim() as Position;
  }
  if (body.imageUrl) {
    body.imageUrl = encodeURIComponent(body.imageUrl).trim();
  }

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //add logged in user and updated date to updateData
  const updateData = {
    ...body,
    updatedOn: new Date(),
    updatedBy: loggedInUser as Prisma.JsonObject,
  };

  //try updating teacher
  try {
    const updatedTeacher = await prismaClient.teachers.update({
      where: { email: params.userEmail },
      data: updateData,
    });
    if (updatedTeacher) {
      return NextResponse.json(
        { updatedTeacher },
        {
          status: 200,
        }
      );
    } else
      return NextResponse.json(
        { error: 'could not update teacher' },
        { status: 400 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//delete single teacher by userEmail
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  //check email param
  if (!params.userEmail) {
    return NextResponse.json({ error: 'no user email given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (
    session?.user.role != 'SUPERADMIN' &&
    session?.user.email != params.userEmail
  ) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //try deleting teacher
  try {
    const deletedTeacher = await prismaClient.teachers.delete({
      where: { email: params.userEmail },
    });
    if (deletedTeacher) {
      return NextResponse.json({ deletedTeacher }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'could not delete teacher' },
        { status: 500 }
      );
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
