import { prismaClient } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

//create new user
export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }
  const { email, password, role } = await request.json();
  //check is user exists
  const exists = await prismaClient.users.findUnique({
    where: { email: email },
  });
  if (exists) {
    return NextResponse.json({ error: 'user already exists' }, { status: 409 });
  }

  //hash password with salt
  const hash = await bcrypt.hash(password, 12);

  try {
    const user = await prismaClient.users.create({
      data: {
        email: email,
        password: hash,
        role: role,
        createdOn: new Date(),
      },
    });
    return NextResponse.json({ id: user.id, email, role }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

//get all users
export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  try {
    const usersData = await prismaClient.users.findMany();
    const users = usersData.map((user: any) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        claimed: user.claimed,
        createdOn: user.createdOn,
        claimedOn: user.claimedOn,
      };
    });
    if (!users) {
      return NextResponse.json({ error: 'no users found' }, { status: 404 });
    }
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
