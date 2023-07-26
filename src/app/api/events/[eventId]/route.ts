import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

//edit event by eventId (params)
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const res = await request.json();
  const updatedEvent = await prismaClient.events.update({
    where: {
      id: eventId,
    },
    data: res,
  });
  return NextResponse.json({ updatedEvent });
};

//delete event by eventId (params)
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const event = await prismaClient.events.delete({ where: { id: eventId } });
  return NextResponse.json({ message: 'event deleted' }, { status: 200 });
};

//get single event by eventId (params)
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const event = await prismaClient.events.findUnique({
    where: { id: eventId },
  });
  return NextResponse.json({ event });
};
