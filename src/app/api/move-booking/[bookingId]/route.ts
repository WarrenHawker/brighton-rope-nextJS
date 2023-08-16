import { ApiParams } from '@/utils/types/globals';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { handleError } from '@/utils/functions';

//TODO Add validation for all inputs

//move booking from one event to another
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  //check params
  if (!params.bookingId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  const { oldEventId, newEventId, ticketAmount } = await request.json();
  const bookingId = parseInt(params.bookingId);

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  try {
    //change booking eventId
    const movedBooking = await prismaClient.bookings.update({
      where: { id: bookingId },
      data: { eventId: newEventId },
    });

    //change old event ticket info
    await prismaClient.events.update({
      where: { id: oldEventId },
      data: {
        ticketsSold: { decrement: ticketAmount },
        ticketsRemaining: { increment: ticketAmount },
      },
    });

    //change new event ticket info
    await prismaClient.events.update({
      where: { id: newEventId },
      data: {
        ticketsSold: { increment: ticketAmount },
        ticketsRemaining: { decrement: ticketAmount },
      },
    });
    return NextResponse.json({ movedBooking }, { status: 200 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
