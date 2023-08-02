import { prismaClient } from '@/lib/prisma/client';
import { ApiParams, TeacherBioAdmin } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

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
      return NextResponse.json(teacher as TeacherBioAdmin, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'No teacher bio found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
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

  //try updating teacher
};

//delete single teacher by userEmail
