import getPrismaClient from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

//create Prisma client instance (use use cache if it exists)
const prismaClient = getPrismaClient();

//create new event
export const POST = async (request: NextRequest) => {
  const res = await request.json();
  const event = await prismaClient.event.create({
    data: res,
  });

  return NextResponse.json({ message: 'event created successfully', event });
};

/*get collection of events
uses search params to filter events, as follows:
  limit: sets the number of events returned by request. If no number is given, will return all events
  old: either returns old and upcoming events (true) or just upcoming events (false). If no value given, will return old and upcoming events
*/
export const GET = async (request: NextRequest) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const eventOption = request.nextUrl.searchParams.get('limit');
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
