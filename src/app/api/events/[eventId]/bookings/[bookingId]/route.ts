import getPrismaClient from '@/lib/prisma/client';
import { ApiParams } from '@/utils/interfaces';
import { NextResponse, NextRequest } from 'next/server';

//create Prisma client instance (use use cache if it exists)
const prismaClient = getPrismaClient();

//edit booking by bookingId
export const PATCH = async (request: NextRequest, { params }: ApiParams) => {
  if (!params.eventId) {
    return;
  }
  if (!params.bookingId) {
    return;
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
  if (!params.eventId) {
    return;
  }
  if (!params.bookingId) {
    return;
  }
  const eventId = parseInt(params.eventId);
  const bookingId = parseInt(params.bookingId);
  const booking = await prismaClient.bookings.delete({
    where: { id: bookingId },
  });
  return NextResponse.json({ message: 'event deleted successfully', booking });
};
