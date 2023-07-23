import prisma from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const res = await request.json();
  const eventId = res.eventId;
  const booking = await prisma.booking.create({
    data: res,
  });
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  const updatedEvent = await prisma.event.update({
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

  const bookings = await prisma.booking.findMany({
    where: { eventId: event },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json({ bookings });
};
