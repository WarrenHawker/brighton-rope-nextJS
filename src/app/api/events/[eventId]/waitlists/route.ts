import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';
import { prismaClient } from '@/lib/prisma/client';

//create new waitlist entry
export const POST = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//get all waitlist entries for event by eventId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
