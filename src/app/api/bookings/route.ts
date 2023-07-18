import prisma from '@/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const res = await request.json();
  const booking = await prisma.booking.create({
    data: res,
  });

  return NextResponse.json({ booking });
};

export const GET = async (request: NextRequest) => {
  const eventOption = request.nextUrl.searchParams.get('event');
  let event;
  if (eventOption) {
    event = parseInt(eventOption);
  }

  const bookings = await prisma.booking.findMany({
    where: { eventId: event },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json({ bookings });
};

export const PATCH = async (request: NextRequest) => {};

export const DELETE = async (request: NextRequest) => {};
