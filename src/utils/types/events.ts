import { Address, Prices, UserIdEmail } from './globals';
import { Prisma } from '@prisma/client';

export type EventDateTime = {
  date: string;
  startTime: string;
  endTime: string;
  error?: string | null;
};

export interface EventDB {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  dateTimes: Prisma.JsonArray;
  location: Prisma.JsonObject;
  isFree: boolean;
  maxTickets?: number;
  ticketsSold?: number;
  ticketsRemaining?: number;
  prices?: Prisma.JsonArray;
  allowMultipleTickets?: boolean;
}

export interface EventDBAdmin extends EventDB {
  createdOn: Date;
  createdBy: Prisma.JsonObject;
  updatedOn?: Date;
  updatedBy?: Prisma.JsonObject;
}

export interface EventClient {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  dateTimes: EventDateTime[];
  location: Address;
  isFree: boolean;
  maxTickets?: number;
  ticketsSold?: number;
  ticketsRemaining?: number;
  prices?: Prices[];
  allowMultipleTickets?: boolean;
}

export interface EventClientAdmin extends EventClient {
  createdOn: Date;
  createdBy: UserIdEmail;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
}

export type CreateEventData = {
  title: string;
  description: string;
  startDate: Date;
  location: Address;
  isFree: boolean;

  dateTimes?: EventDateTime[];
  maxTickets?: number;
  prices?: Prices[];
  allowMultipleTickets?: boolean;
};
