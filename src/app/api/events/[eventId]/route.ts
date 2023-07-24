import getPrismaClient from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prismaClient = getPrismaClient();

export const PATCH = async (request: NextRequest, { params }: any) => {
  const eventId = parseInt(params.eventId);
  const res = await request.json();
  const updatedEvent = await prismaClient.event.update({
    where: {
      id: eventId,
    },
    data: res,
  });
  return NextResponse.json({ updatedEvent });
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const eventId = parseInt(params.eventId);
  const event = await prismaClient.event.delete({ where: { id: eventId } });
  return NextResponse.json({ message: 'event deleted' }, { status: 200 });
};

export const GET = async (request: NextRequest, { params }: any) => {
  const eventId = parseInt(params.event);
  const event = await prismaClient.event.findUnique({ where: { id: eventId } });
  return NextResponse.json({ event });
};
