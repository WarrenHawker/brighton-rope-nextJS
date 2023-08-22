import { Prisma } from '@prisma/client';
import { EventClient } from './events';
import { Contact, UserIdEmail } from './globals';

export type TicketChoices = {
  key: string;
  value: number;
  quantity: number;
};

export interface BookingPageProps {
  prevPage: () => void;
  nextPage: () => void;
  userChoices: CreateBookingData;
  event: EventClient | undefined;
}

export interface BookingDB {
  id: number;
  eventId: number;
  totalTickets: number;
  tickets: Prisma.JsonArray;
  contact: Prisma.JsonObject;
  amountToPay: number;
  hasPaid: boolean;
  additionalInfo: string;
  adminNotes: string;
  createdOn: Date;
  updatedOn?: Date;
  updatedBy?: Prisma.JsonObject;
}

export interface BookingClient {
  id: number;
  eventId: number;
  totalTickets: number;
  tickets: TicketChoices[];
  contact: Contact;
  amountToPay: number;
  hasPaid: boolean;
  additionalInfo: string;
  adminNotes: string;
  createdOn: Date;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
}

export interface CreateBookingData {
  tickets: TicketChoices[];
  contact: Contact;
  amountToPay: number;
  additionalInfo: string;
  totalTickets: number;
}

export interface UpdateBookingData {
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  additionalInfo?: string;
  adminNotes?: string;
}
