import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';
import { prismaClient } from '@/lib/prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

//create new waitlist entry
export const POST = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  if (!params.waitlistId) {
    return NextResponse.json(
      { error: 'no waitlist ID given' },
      { status: 400 }
    );
  }
  return NextResponse.json({});
};

//get all waitlist entries for event by eventId
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }

  if (!params.waitlistId) {
    return NextResponse.json(
      { error: 'no waitlist ID given' },
      { status: 400 }
    );
  }
  return NextResponse.json({});
};
