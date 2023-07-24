import getPrismaClient from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prismaClient = getPrismaClient();

export const POST = async (request: NextRequest, { params }: any) => {
  const eventId = parseInt(params.eventId);
  const res = await request.json();
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

export const GET = async (request: NextRequest, { params }: any) => {
  const eventId = parseInt(params.eventId);

  const bookings = await prismaClient.booking.findMany({
    where: { eventId: eventId },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json({ bookings });
};
