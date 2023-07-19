import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export const PATCH = async (request: any, { params }: any) => {
  const eventId = parseInt(params.id);
  const res = await request.json();
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: res,
  });
  return NextResponse.json({ updatedEvent });
};

export const DELETE = async (request: any, { params }: any) => {
  const eventId = parseInt(params.id);
  const event = await prisma.event.delete({ where: { id: eventId } });
  return NextResponse.json({ message: 'event deleted successfully', event });
};

export const GET = async (request: any, { params }: any) => {
  const eventId = parseInt(params.id);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  return NextResponse.json({ event });
};
