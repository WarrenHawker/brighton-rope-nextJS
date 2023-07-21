import prisma from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export const POST = async (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
  }
  const res = await request.json();
  const event = await prisma.event.create({
    data: res,
  });

  return NextResponse.json({ message: 'event created successfully', event });
};

export const GET = async (request: NextRequest) => {
  const eventOption = request.nextUrl.searchParams.get('events');
  let oldOption = request.nextUrl.searchParams.get('old');
  let eventAmount: number = -1;
  let events;
  if (eventOption) {
    eventAmount = parseInt(eventOption);
  }
  if (oldOption == 'true') {
    if (eventAmount == -1) {
      events = await prisma.event.findMany({ orderBy: { startDate: 'desc' } });
    } else {
      events = await prisma.event.findMany({
        take: eventAmount,
        orderBy: { startDate: 'desc' },
      });
    }
  } else {
    if (eventAmount == -1) {
      events = await prisma.event.findMany({
        where: { startDate: { gte: new Date() } },
        orderBy: { startDate: 'desc' },
      });
    } else {
      events = await prisma.event.findMany({
        where: { startDate: { gte: new Date() } },
        take: eventAmount,
        orderBy: { startDate: 'desc' },
      });
    }
  }
  return NextResponse.json({ events });
};
