import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prismaClient } from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';

//edit waitlist entry by waitlistId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
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

//delete waitlist entry by waitlistId
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
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
