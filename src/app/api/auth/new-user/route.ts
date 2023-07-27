//change user name and password, and add bio

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const PUT = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  // const newPassword = await bcrypt.hash(body.password, 12);

  //check authorisation
  if (session?.user.email != body.accountEmail) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  try {
    //update user with new name and email, set claimed to true
    const user = await prismaClient.users.update({
      where: { email: body.accountEmail },
      data: {
        name: body.accountName,
        hashedPassword: body.password,
        claimed: true,
      },
    });

    //create user bio
    const userBio = await prismaClient.userBios.create({
      data: {
        name: body.bio.name,
        email: body.accountEmail,
        pronouns: body.bio.pronouns,
        position: body.bio.position,
        public: body.bio.public,
        bio: body.bio.bio,
        imageUrl: body.bio.imageUrl,
      },
    });
    return NextResponse.json({ user, userBio }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.meta }, { status: 400 });
    } else return NextResponse.json({ error: error }, { status: 400 });
  }
};