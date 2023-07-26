import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';

//create new booking and update ticket numbers for associated event
export const POST = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const res = await request.json();
  const booking = await prismaClient.bookings.create({
    data: res,
  });
  const event = await prismaClient.events.findUnique({
    where: { id: eventId },
  });
  const updatedEvent = await prismaClient.events.update({
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

//get all bookings for event by eventId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);

  const bookings = await prismaClient.bookings.findMany({
    where: { eventId: eventId },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json({ bookings });
};
