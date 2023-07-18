import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export const PATCH = async (request: NextRequest) => {};

export const DELETE = async (request: NextRequest) => {};

export const GET = async (context: { params: { id: string } }) => {
  const eventId = parseInt(context.params.id);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  return NextResponse.json({ event });
};
