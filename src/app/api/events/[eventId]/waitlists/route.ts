import { NextResponse, NextRequest } from 'next/server';
import { prismaClient } from '@/lib/prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { handleError } from '@/utils/functions';
import { ApiParams } from '@/utils/types/globals';

//TODO Add validation for all inputs

//create new waitlist entry
export const POST = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  const { contact, additionalInfo, totalTickets } = await request.json();

  const waitlistData = {
    eventId: parseInt(params.eventId),
    contact: contact,
    createdOn: new Date(),
    additionalInfo: additionalInfo,
    totalTickets: totalTickets,
    adminNotes: '',
  };

  try {
    const waitlist = await prismaClient.waitlists.create({
      data: waitlistData,
    });
    return NextResponse.json({ waitlist }, { status: 201 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//get all waitlist entries for event by eventId
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

  try {
    const waitlists = await prismaClient.waitlists.findMany({
      where: { eventId: eventId },
      orderBy: { id: 'asc' },
    });
    if (waitlists) {
      return NextResponse.json({ waitlists }, { status: 200 });
    } else
      return NextResponse.json(
        { error: 'no waitlists found' },
        { status: 404 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
