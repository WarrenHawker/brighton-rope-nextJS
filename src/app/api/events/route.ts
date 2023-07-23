import getPrismaClient from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prismaClient = getPrismaClient();

export const POST = async (request: NextRequest) => {
  const res = await request.json();
  const event = await prismaClient.event.create({
    data: res,
  });

  return NextResponse.json({ message: 'event created successfully', event });
};

export const GET = async (request: NextRequest) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const eventOption = request.nextUrl.searchParams.get('events');
  let oldOption = request.nextUrl.searchParams.get('old');
  let eventAmount: number = -1;
  let events;
  if (eventOption) {
    eventAmount = parseInt(eventOption);
  }
  if (oldOption == 'true') {
    if (eventAmount == -1) {
      events = await prismaClient.event.findMany({
        orderBy: { startDate: 'desc' },
      });
    } else {
      events = await prismaClient.event.findMany({
        take: eventAmount,
        orderBy: { startDate: 'desc' },
      });
    }
  } else {
    if (eventAmount == -1) {
      events = await prismaClient.event.findMany({
        where: { startDate: { gte: yesterday } },
        orderBy: { startDate: 'desc' },
      });
    } else {
      events = await prismaClient.event.findMany({
        where: { startDate: { gte: yesterday } },
        take: eventAmount,
        orderBy: { startDate: 'desc' },
      });
    }
  }
  return NextResponse.json({ events });
};
