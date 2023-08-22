import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { handleError } from '@/utils/functions';
import { ApiParams } from '@/utils/types/globals';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';

//TODO Add validation for all inputs

//edit waitlist entry by waitlistId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  //check waitlistId
  if (!params.waitlistId) {
    return NextResponse.json(
      { error: 'no waitlist ID given' },
      { status: 400 }
    );
  }

  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  try {
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//delete waitlist entry by waitlistId
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  //check waitlistId
  if (!params.waitlistId) {
    return NextResponse.json(
      { error: 'no waitlist ID given' },
      { status: 400 }
    );
  }

  const waitlistId = parseInt(params.waitlistId);

  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  try {
    const deletedWaitlist = await prismaClient.waitlists.delete({
      where: { id: waitlistId },
    });
    if (deletedWaitlist) {
      return NextResponse.json({ deletedWaitlist }, { status: 200 });
    } else
      return NextResponse.json(
        { error: 'could not delete waitlit' },
        { status: 500 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
