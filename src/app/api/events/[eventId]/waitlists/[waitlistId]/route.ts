import getPrismaClient from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';

//create Prisma client instance (use use cache if it exists)
const prismaClient = getPrismaClient();

//edit waitlist entry by waitlistId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//delete waitlist entry by waitlistId
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
