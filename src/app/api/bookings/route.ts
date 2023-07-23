import getPrismaClient from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prismaClient = getPrismaClient();

export const POST = async (request: NextRequest) => {
  const res = await request.json();
  const eventId = res.eventId;
  const booking = await prismaClient.booking.create({
    data: res,
  });
  const event = await prismaClient.event.findUnique({ where: { id: eventId } });
  const updatedEvent = await prismaClient.event.update({
    where: {
      id: eventId,
    },
    data: {
      ticketsSold: event?.ticketsSold! + booking.totalTickets,
      ticketsRemaining: event?.ticketsRemaining! - booking.totalTickets,
    },
  });

  return NextResponse.json({ booking, updatedEvent });
};

export const GET = async (request: NextRequest) => {
  const eventOption = request.nextUrl.searchParams.get('event');
  let event;
  if (eventOption) {
    event = parseInt(eventOption);
  }

  const bookings = await prismaClient.booking.findMany({
    where: { eventId: event },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json({ bookings });
};
