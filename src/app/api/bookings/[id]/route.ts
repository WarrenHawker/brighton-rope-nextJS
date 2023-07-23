import getPrismaClient from '@/lib/prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prismaClient = getPrismaClient();

export const PATCH = async (request: NextRequest, { params }: any) => {
  const bookingId = parseInt(params.id);
  const res = await request.json();
  const updatedBooking = await prismaClient.booking.update({
    where: {
      id: bookingId,
    },
    data: res,
  });
  return NextResponse.json({ updatedBooking });
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const bookingId = parseInt(params.id);
  const booking = await prismaClient.booking.delete({
    where: { id: bookingId },
  });
  return NextResponse.json({ message: 'event deleted successfully', booking });
};
