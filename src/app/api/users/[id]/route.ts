import getPrismaClient from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';

//create Prisma client instance (use use cache if it exists)
const prismaClient = getPrismaClient();

//get single user by userId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//edit user by userId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//delete user by userId
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
