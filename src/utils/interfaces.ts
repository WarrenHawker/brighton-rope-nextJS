import { ReactNode } from 'react';

export type AdminView = 'Events' | 'Add Event' | 'Account';
export type MdeTab = 'write' | 'preview' | undefined;
export type EventView = 'details' | 'bookings' | 'waiting list';

export interface BookingPageProps {
  prevPage: () => void;
  nextPage: () => void;
  userChoices: UserChoices;
  event: EventsData | undefined;
}

export interface Address {
  lineOne: string;
  lineTwo: string | undefined;
  city: string;
  country: string;
  postcode: string;
}
export interface EventsData {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  dateTimes: EventDateTime[];
  location: Address;
  maxTickets: number;
  ticketsSold: number;
  ticketsRemaining: number;
  prices: Prices[];
  allowMultipleTickets: boolean;
}

export interface ContextProviderProps {
  children?: ReactNode;
}

export interface TicketChoices {
  name: string;
  value: number;
  quantity: number;
}

export interface UserChoices {
  tickets: TicketChoices[];
  contact: {
    firstName: string;
    lastName: string;
    email: string;
  };
  amountToPay: number;
  additionalInfo: string;
}

export interface BookingsData extends UserChoices {
  id: number;
  eventId: string;
  bookingDate: string;
  adminNotes: string;
  hasPaid: boolean;
}

export interface User {
  id: string | null;
  name: string | null;
}

export interface EventDateTime {
  date: string;
  startTime: string;
  endTime: string;
  error: string | null;
}

export interface PriceScale {
  minPrice: number;
  maxPrice: number | null;
}

export interface Prices {
  key: string;
  fixedPrice: boolean;
  value: PriceScale;
}

export interface IRequest {
  request: {
    url: string;
  };
}
