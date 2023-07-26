import { prismaClient } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth/next';

//create new user
export const POST = async (request: NextRequest) => {
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
        hashedPassword: hash,
        role: role,
      },
    });
    return NextResponse.json({ id: user.id, email, role }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

//get all users
export const GET = async (request: NextRequest) => {
  return NextResponse.json({});
};
