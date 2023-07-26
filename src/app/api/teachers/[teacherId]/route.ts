import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

//get single teacher by teacherId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
