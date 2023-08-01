import { prismaClient } from '@/lib/prisma/client';
import { ApiParams, UserDataEdit, UserIdEmail } from '@/utils/interfaces';
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
  const body = await request.json();
  const userEmail = params.userEmail;

  //check if there's an email param
  if (!userEmail) {
    return NextResponse.json({ error: 'no user email given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.email != userEmail) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //if password in body, hash the password
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 12);
  }

  //get logged in user
  const loggedInUser: UserIdEmail = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //if body has email, check database for existing email
  if (body.email) {
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

  const updateData: UserDataEdit = {
    ...body,
    updatedOn: new Date(),
    updatedBy: JSON.stringify(loggedInUser),
  };

  //try updating user
  try {
    const updatedUserData = await prismaClient.users.update({
      where: { email: userEmail },
      data: updateData,
    });
    if (updatedUserData) {
      const updatedUser = excludePropertyFromObject(updatedUserData, [
        'password',
      ]);
      return NextResponse.json({ updatedUser }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
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
  if (
    session?.user.role != 'SUPERADMIN'
  ) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //try deleting user from database
  try {
    const deletedUser = await prismaClient.users.delete({where: {email: params.userEmail}})
    if(deletedUser) {
      return NextResponse.json({message: 'user deleted successfully'}, {status: 200})
    } else {
      return NextResponse.json({error: 'user not found'}, {status: 404})
    }
    
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500})
  }
};
