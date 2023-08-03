//change user name and password, and add bio

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { handleError } from '@/utils/functions';

export const PUT = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const newPassword = await bcrypt.hash(body.accountPassword, 12);

  //check authorisation
  if (session?.user.email != body.accountEmail) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //sanitise inputs
  body.accountName = validator.escape(body.accountName).trim();
  body.accountEmail = validator.normalizeEmail(body.accountEmail);
  body.bio.name = validator.escape(body.bio.name).trim();
  body.bio.pronouns = validator.escape(body.bio.pronouns).trim();
  body.bio.description = encodeURIComponent(body.bio.description).trim();
  body.bio.imageUrl = encodeURIComponent(body.bio.imageUrl).trim();

  try {
    //update user with new name and email, set claimed to true
    const user = await prismaClient.users.update({
      where: { email: body.accountEmail },
      data: {
        name: body.accountName,
        password: newPassword,
        claimed: true,
        claimedOn: new Date(),
      },
    });

    //create user bio
    const teacher = await prismaClient.teachers.create({
      data: {
        name: body.bio.name,
        email: body.accountEmail,
        pronouns: body.bio.pronouns,
        position: body.bio.position,
        public: body.bio.public,
        description: body.bio.bio,
        imageUrl: body.bio.imageUrl,
        createdOn: new Date(),
      },
    });
    return NextResponse.json({ user, teacher }, { status: 201 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
