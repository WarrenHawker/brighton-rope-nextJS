import { prismaClient } from '@/lib/prisma/client';
import {
  Address,
  ApiParams,
  EventDateTime,
  Prices,
  UserIdEmail,
} from '@/utils/interfaces';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import validator from 'validator';
import { handleError } from '@/utils/functions';

interface UpdateEventData {
  title: string;
  description: string;
  startDate: Date;
  dateTimes: EventDateTime[];
  location: Address;
  updatedOn: Date;
  updatedBy: UserIdEmail;
  isFree: boolean;
  maxTickets?: number;
  ticketsSold?: number;
  ticketsRemaining?: number;
  allowMultipleTickets?: boolean;
  prices?: Prices[];
}

//edit event by eventId (params)
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

  const eventId = parseInt(params.eventId);
  const body = await request.json();

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //sanitise inputs
  const updateEventData: UpdateEventData = {
    title: validator.escape(body.title).trim(),
    description: encodeURIComponent(body.description),
    startDate: body.startDate,
    dateTimes: body.dateTimes.map((item: EventDateTime) => ({
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
    })),
    location: {
      lineOne: validator.escape(body.location.lineOne).trim(),
      lineTwo: validator.escape(body.location.lineTwo).trim(),
      city: validator.escape(body.location.city).trim(),
      country: validator.escape(body.location.country).trim(),
      postcode: validator.escape(body.location.postcode).trim(),
    },
    isFree: body.isFree,
    updatedOn: new Date(),
    updatedBy: loggedInUser,
  };

  //if paid event, sanitise and add ticket and price info
  if (!updateEventData.isFree) {
    updateEventData.maxTickets = body.maxTickets;
    updateEventData.ticketsSold = 0;
    updateEventData.ticketsRemaining = body.maxTickets;
    updateEventData.allowMultipleTickets = body.allowMultipleTickets;
    updateEventData.prices = body.prices.map((item: Prices) => ({
      ...item,
      key: validator.escape(item.key).trim(),
    }));
  }

  try {
    const updatedEvent = await prismaClient.events.update({
      where: {
        id: eventId,
      },
      data: updateEventData,
    });
    if (updatedEvent) {
      return NextResponse.json({ updatedEvent }, { status: 200 });
    } else
      return NextResponse.json(
        { error: 'could not update event' },
        { status: 500 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//delete event by eventId (params)
export const DELETE = async (request: NextRequest, { params }: ApiParams) => {
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
  //try deleting event
  try {
    const deletedEvent = await prismaClient.events.delete({
      where: { id: eventId },
    });
    if (deletedEvent) {
      return NextResponse.json({ deletedEvent }, { status: 200 });
    } else
      return NextResponse.json(
        { error: 'could not delete event' },
        { status: 500 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

//get single event by eventId (params)
export const GET = async (request: NextRequest, { params }: ApiParams) => {
  //check eventId
  if (!params.eventId) {
    return NextResponse.json({ error: 'no event ID given' }, { status: 400 });
  }
  const eventId = parseInt(params.eventId);

  //try getting event
  try {
    const event = await prismaClient.events.findUnique({
      where: { id: eventId },
    });
    if (event) {
      return NextResponse.json({ event });
    } else
      return NextResponse.json({ error: 'no event found' }, { status: 404 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
