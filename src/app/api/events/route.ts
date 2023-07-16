import prisma from '@/prisma/client';
import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const res = await request.json();
  const user = await prisma.event.create({
    data: res,
  });

  return NextResponse.json({ message: 'event created successfully', user });
};
