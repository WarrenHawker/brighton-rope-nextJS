import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import bcrypt from 'bcrypt';

//get single user by userEmail
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//edit single user by userEmail
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  const email = params.email;

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
