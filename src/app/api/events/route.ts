import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
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
      events = await prisma.event.findMany();
    } else {
      events = await prisma.event.findMany({ take: eventAmount });
    }
  } else {
    if (eventAmount == -1) {
      events = await prisma.event.findMany({
        where: { startDate: { gte: new Date() } },
      });
    } else {
      events = await prisma.event.findMany({
        where: { startDate: { gte: new Date() } },
        take: eventAmount,
      });
    }
  }
  return NextResponse.json({ events });
};
