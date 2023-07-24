import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';

//edit waitlist entry by waitlistId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//delete waitlist entry by waitlistId
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
