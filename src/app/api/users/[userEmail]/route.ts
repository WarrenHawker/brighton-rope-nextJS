import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import bcrypt from 'bcrypt';
import { handleError } from '@/utils/functions';
import validator from 'validator';

//get single user by userEmail
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

  //try fetching user from database
  try {
    const userData = await prismaClient.users.findUnique({
      where: { email: params.userEmail },
    });
    if (userData) {
      //remove password field from user data
      const { password, ...user } = userData;
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//edit single user by userEmail
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  const body = await request.json();

  //check if there's an email param
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

  //if password in body, hash the password
  if (body.password) {
    body.password = validator.escape(body.password).trim();
    body.password = await bcrypt.hash(body.password, 12);
  }

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //if body has email, check database for existing email
  if (body.email) {
    if (!validator.isEmail(body.email)) {
      return NextResponse.json({ error: 'invalid email' }, { status: 400 });
    }
    body.email = validator.normalizeEmail(body.email).toString();
    const user = await prismaClient.users.findUnique({
      where: { email: body.email },
    });
    if (user) {
      return NextResponse.json(
        { error: 'email is already in use' },
        { status: 409 }
      );
    }
  }

  //sanitise inputs
  if (body.name) {
    body.name = validator.escape(body.name).trim();
  }

  const updateData = {
    ...body,
    updatedOn: new Date(),
    updatedBy: loggedInUser,
  };

  //try updating user
  try {
    const updatedUserData = await prismaClient.users.update({
      where: { email: params.userEmail },
      data: updateData,
    });
    if (updatedUserData) {
      const { password, ...updatedUser } = updatedUserData;
      return NextResponse.json({ updatedUser }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//delete single user by userEmail
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  //check email param
  if (!params.userEmail) {
    return NextResponse.json({ error: 'no user email given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //try deleting user from database
  try {
    const deletedUserData = await prismaClient.users.delete({
      where: { email: params.userEmail },
    });
    if (deletedUserData) {
      const { password, ...deletedUser } = deletedUserData;
      return NextResponse.json(deletedUser, { status: 200 });
    } else {
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
