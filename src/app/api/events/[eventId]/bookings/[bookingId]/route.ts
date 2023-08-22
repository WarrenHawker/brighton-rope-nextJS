import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { handleError } from '@/utils/functions';
import { ApiParams } from '@/utils/types/globals';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';
import validator from 'validator';

//TODO Add validation for all inputs
//TODO automatically move firt waitlist inquiry to bookings on booking deletion

//edit booking by bookingId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //check bookingId
  if (!params.bookingId) {
    return NextResponse.json({ error: 'no booking ID given' }, { status: 400 });
  }

  const bookingId = parseInt(params.bookingId);
  const eventId = parseInt(params.eventId);
  const body = await request.json();

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //sanitise inputs
  if (body.contact.firstName) {
    body.contact.firstName = validator.escape(body.contact.firstName).trim();
  }
  if (body.contact.lastName) {
    body.contact.lastName = validator.escape(body.contact.lastName).trim();
  }
  if (body.contact.email) {
    body.contact.email = validator.normalizeEmail(body.contact.lastName);
  }
  if (body.additionalInfo) {
    body.additionalInfo = validator.escape(body.additionalInfo).trim();
  }
  if (body.adminNotes) {
    body.adminNotes = validator.escape(body.adminNotes).trim();
  }

  //add updated date and user
  const updateData = {
    ...body,
    updatedOn: new Date(),
    updatedBy: loggedInUser,
  };

  //try updating booking
  try {
    const updatedBooking = await prismaClient.bookings.update({
      where: {
        id: bookingId,
      },
      data: updateData,
    });
    if (updatedBooking) {
      return NextResponse.json({ updatedBooking });
    } else
      return NextResponse.json({ error: 'no booking found' }, { status: 500 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//delete booking by bookingId, and update ticket amounts for associated event
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  //check bookingId
  if (!params.bookingId) {
    return NextResponse.json({ error: 'no booking ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);
  const bookingId = parseInt(params.bookingId);

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //try deleting booking and updating event tickets
  try {
    const booking = await prismaClient.bookings.delete({
      where: { id: bookingId },
    });
    const event = await prismaClient.events.findUnique({
      where: { id: eventId },
      include: { waitingList: true },
    });
    await prismaClient.events.update({
      where: { id: eventId },
      data: {
        ticketsSold: { decrement: booking.totalTickets },
        ticketsRemaining: { increment: booking.totalTickets },
        updatedOn: new Date(),
        updatedBy: loggedInUser,
      },
    });
    if (booking && event) {
      return NextResponse.json(
        {
          booking,
          event,
        },
        { status: 200 }
      );
    } else
      return NextResponse.json(
        { error: 'could not delete booking or update event' },
        { status: 500 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
