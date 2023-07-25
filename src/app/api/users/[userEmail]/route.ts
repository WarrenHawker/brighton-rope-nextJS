import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextRequest, NextResponse } from 'next/server';

//get single user by userEmail
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//edit single user by userEmail
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};

//delete single user by userEmail
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  return NextResponse.json({});
};
