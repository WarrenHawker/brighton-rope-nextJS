import prisma from '@/prisma/client';
import { revalidateTag } from 'next/cache';
import { NextResponse, NextRequest } from 'next/server';

export const PATCH = async (request: NextRequest, { params }: any) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
  }
  const bookingId = parseInt(params.id);
  const res = await request.json();
  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: res,
  });
  return NextResponse.json({ updatedBooking });
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
  }
  const bookingId = parseInt(params.id);
  const booking = await prisma.booking.delete({ where: { id: bookingId } });
  return NextResponse.json({ message: 'event deleted successfully', booking });
};
