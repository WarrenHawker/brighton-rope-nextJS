import { prismaClient } from '@/lib/prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { handleError } from '@/utils/functions';
import validator from 'validator';
import {
  Address,
  EventDateTime,
  Prices,
  UserIdEmail,
} from '@/utils/interfaces';

interface CreateEventData {
  title: string;
  description: string;
  startDate: Date;
  dateTimes: EventDateTime[];
  location: Address;
  createdOn: Date;
  createdBy: UserIdEmail;
  isFree: boolean;
  maxTickets?: number;
  ticketsSold?: number;
  ticketsRemaining?: number;
  allowMultipleTickets?: boolean;
  prices?: Prices[];
}

//create new event
export const POST = async (request: NextRequest) => {
  //check authorisation
  const session = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN' && session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'unauthorized access' }, { status: 401 });
  }

  const body = await request.json();

  //get logged in user
  const loggedInUser = {
    userId: session!.user.id,
    userEmail: session!.user.email,
  };

  //sanitise inputs and add date and user info
  const createEventData: CreateEventData = {
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
    createdOn: new Date(),
    createdBy: loggedInUser,
  };

  //if paid event, sanitise and add ticket and price info
  if (!createEventData.isFree) {
    createEventData.maxTickets = body.maxTickets;
    createEventData.ticketsSold = 0;
    createEventData.ticketsRemaining = body.maxTickets;
    createEventData.allowMultipleTickets = body.allowMultipleTickets;
    createEventData.prices = body.prices.map((item: Prices) => ({
      ...item,
      key: validator.escape(item.key).trim(),
    }));
  }

  try {
    const event = await prismaClient.events.create({
      data: createEventData,
    });
    if (event) {
      return NextResponse.json({ event }, { status: 201 });
    } else
      return NextResponse.json(
        { error: 'could not create event' },
        { status: 500 }
      );
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};

/*get collection of events
uses search params to filter events, as follows:

  limit: sets the number of events returned by request. 
    If no number is given, will return all events

  type: types of events are either "old", "upcoming", or "all". 
    If no type is given, will return events of both types 
*/
export const GET = async (request: NextRequest) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const limitParam = request.nextUrl.searchParams.get('limit');
  let typeParam = request.nextUrl.searchParams.get('type');

  let limit: number;
  let type: string;

  //check limitParam, return error if not a number
  if (limitParam) {
    if (Number.isNaN(parseInt(limitParam)) || parseInt(limitParam) < -1) {
      return NextResponse.json(
        { error: 'invalid limit parameter (must be a number greater than -1)' },
        { status: 400 }
      );
    }
    limit = parseInt(limitParam);
  } else limit = -1;

  //check typeParam
  if (typeParam) {
    type = typeParam;
  } else type = 'all';

  const session = await getServerSession(authOptions);

  //try getting events based on search params
  try {
    let eventsData;
    if (limit == -1 && type == 'all') {
      //all events all types
      eventsData = await prismaClient.events.findMany({
        orderBy: { startDate: 'desc' },
      });
    } else if (limit >= 0 && type == 'all') {
      //limited events all types
      eventsData = await prismaClient.events.findMany({
        orderBy: { startDate: 'desc' },
        take: limit,
      });
    } else if (limit == -1 && type == 'upcoming') {
      //all upcoming events
      eventsData = await prismaClient.events.findMany({
        orderBy: { startDate: 'desc' },
        where: { startDate: { gte: yesterday } },
      });
    } else if (limit == -1 && type == 'old') {
      //all old events
      eventsData = await prismaClient.events.findMany({
        orderBy: { startDate: 'desc' },
        where: { startDate: { lt: yesterday } },
      });
    } else if (limit >= 0 && type == 'upcoming') {
      //limited upcoming events
      eventsData = await prismaClient.events.findMany({
        orderBy: { startDate: 'desc' },
        where: { startDate: { gte: yesterday } },
        take: limit,
      });
    } else if (limit >= 0 && type == 'old') {
      //limited old events
      eventsData = await prismaClient.events.findMany({
        orderBy: { startDate: 'desc' },
        where: { startDate: { lt: yesterday } },
        take: limit,
      });
    }
    if (eventsData) {
      if (eventsData.length > 0) {
        if (
          session?.user.role != 'ADMIN' &&
          session?.user.role != 'SUPERADMIN'
        ) {
          const events = eventsData.map((event) => {
            return {
              id: event.id,
              title: event.title,
              description: event.description,
              startDate: event.startDate,
              dateTimes: event.dateTimes,
              location: event.location,
              isFree: event.isFree,
              maxTickets: event.maxTickets,
              ticketsSold: event.ticketsSold,
              prices: event.prices,
              allowMultipleTickets: event.allowMultipleTickets,
            };
          });
          return NextResponse.json({ events }, { status: 200 });
        }
        return NextResponse.json({ events: eventsData }, { status: 200 });
      } else
        return NextResponse.json({ error: 'no events found' }, { status: 404 });
    }
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
