import getPrismaClient from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';

//create Prisma client instance (use use cache if it exists)
const prismaClient = getPrismaClient();

//create new waitlist entry
export const POST = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//get all waitlist entries for event by eventId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
