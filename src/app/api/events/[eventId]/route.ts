import getPrismaClient from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';

//create Prisma client instance (use use cache if it exists)
const prismaClient = getPrismaClient();

//edit event by eventId (params)
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return;
  }
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

//delete event by eventId (params)
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return;
  }
  const eventId = parseInt(params.eventId);
  const event = await prismaClient.event.delete({ where: { id: eventId } });
  return NextResponse.json({ message: 'event deleted' }, { status: 200 });
};

//get single event by eventId (params)
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return;
  }
  const eventId = parseInt(params.eventId);
  const event = await prismaClient.event.findUnique({ where: { id: eventId } });
  return NextResponse.json({ event });
};
