import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export const PATCH = async (request: NextRequest) => {};

export const DELETE = async (request: NextRequest) => {};

export const GET = async (request: any, { params }: any) => {
  const eventId = parseInt(params.id);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  return NextResponse.json({ event });
};
