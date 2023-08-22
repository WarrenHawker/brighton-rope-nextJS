import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { handleError } from '@/utils/functions';
import { ApiParams } from '@/utils/types/globals';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';
import validator from 'validator';

//TODO Add validation for all inputs

//create new booking and update ticket numbers for associated event
export const POST = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const body = await request.json();

  //sanitise inputs
  const bookingData = {
    eventId: parseInt(params.eventId),
    tickets: body.tickets,
    contact: {
      firstName: validator.escape(body.contact.firstName).trim(),
      lastName: validator.escape(body.contact.lastName).trim(),
      email: validator.normalizeEmail(body.contact.email),
    },
    totalTickets: body.totalTickets,
    amountToPay: body.amountToPay,
    hasPaid: false,
    createdOn: new Date(),
    additionalInfo: validator.escape(body.additionalInfo).trim(),
    adminNotes: '',
  };

  //try making booking
  try {
    const booking = await prismaClient.bookings.create({
      data: bookingData,
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
    if (booking && updatedEvent) {
      return NextResponse.json({ booking, updatedEvent }, { status: 201 });
    } else
      return NextResponse.json(
        { error: 'could not create booking' },
        { status: 500 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//get all bookings for event by eventId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  const eventId = parseInt(params.eventId);

  //try getting bookings
  try {
    const bookings = await prismaClient.bookings.findMany({
      where: { eventId: eventId },
      orderBy: { id: 'asc' },
    });
    if (bookings) {
      return NextResponse.json({ bookings }, { status: 200 });
    } else
      return NextResponse.json({ error: 'no bookings found' }, { status: 404 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
