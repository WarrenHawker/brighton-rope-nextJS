import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import bcrypt from 'bcrypt';
import { excludePropertyFromObject } from '@/utils/functions';

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
      const user = excludePropertyFromObject(userData, ['hashedPassword']);
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

//edit single user by userEmail
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  const email = params.userEmail;

  //check if there's an email param
  if (!email) {
    return NextResponse.json({ error: 'no user email given' }, { status: 400 });
  }

  return NextResponse.json({});
};

//delete single user by userEmail
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
