import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';

//edit booking by bookingId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  if (!params.bookingId) {
    return NextResponse.json({ error: 'no booking ID given' }, { status: 400 });
  }
  const bookingId = parseInt(params.bookingId);
  const eventId = parseInt(params.eventId);
  const res = await request.json();
  const updatedBooking = await prismaClient.bookings.update({
    where: {
      id: bookingId,
    },
    data: res,
  });
  return NextResponse.json({ updatedBooking });
};

//delete booking by bookingId, and update ticket amounts for associated event
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  if (!params.bookingId) {
    return NextResponse.json({ error: 'no booking ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const bookingId = parseInt(params.bookingId);
  const booking = await prismaClient.bookings.delete({
    where: { id: bookingId },
  });
  const event = await prismaClient.events.update({
    where: { id: eventId },
    data: {
      ticketsSold: { decrement: booking.totalTickets },
      ticketsRemaining: { increment: booking.totalTickets },
    },
  });
  return NextResponse.json({
    message: 'event deleted successfully',
    booking,
    event,
  });
};
