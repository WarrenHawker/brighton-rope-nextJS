import prisma from '@/prisma/client';
import { revalidateTag } from 'next/cache';
import { NextResponse, NextRequest } from 'next/server';

export const PATCH = async (request: NextRequest, { params }: any) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
  }
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

export const DELETE = async (request: NextRequest, { params }: any) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
  }
  const eventId = parseInt(params.id);
  const event = await prisma.event.delete({ where: { id: eventId } });
  return NextResponse.json({ message: 'event deleted successfully', event });
};

export const GET = async (request: NextRequest, { params }: any) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
  }
  const eventId = parseInt(params.id);
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  return NextResponse.json({ event });
};
