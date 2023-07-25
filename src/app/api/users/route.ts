import { prismaClient } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

//create new user
export const POST = async (request: NextRequest) => {
  return NextResponse.json({});
};

//get all users
export const GET = async (request: NextRequest) => {
  return NextResponse.json({});
};
