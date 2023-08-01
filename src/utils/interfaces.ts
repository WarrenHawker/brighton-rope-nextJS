import { Prisma } from '@prisma/client';
import { ReactNode } from 'react';

export type AdminView = 'Events' | 'Add Event' | 'Account';
export type MdeTab = 'write' | 'preview' | undefined;
export type EventView = 'details' | 'bookings' | 'waiting list';
export type UserRole = 'ADMIN' | 'SUPERADMIN' | 'INACTIVE';

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UserIdEmail = {
  userId: number | string;
  userEmail: string;
};

export type Address = {
  lineOne: string;
  lineTwo: string | undefined;
  city: string;
  country: string;
  postcode: string;
};

export type TicketChoices = {
  name: string;
  value: number;
  quantity: number;
};

export type EventDateTime = {
  date: string;
  startTime: string;
  endTime: string;
  error: string | null;
};

export type PriceScale = {
  minPrice: number;
  maxPrice: number | null;
};

export type Prices = {
  key: string;
  fixedPrice: boolean;
  value: PriceScale;
};

export interface BookingPageProps {
  prevPage: () => void;
  nextPage: () => void;
  userChoices: BookingsDataNew;
  event: EventsData | undefined;
}

//events data base
export interface EventsData {
  title: string;
  description: string;
  startDate: Date;
  isFree: boolean;
  maxTickets?: number;
  ticketsSold?: number;
  ticketsRemaining?: number;
  allowMultipleTickets?: boolean;
}

//events data fetched from Database frontend
export interface EventsDataDB extends EventsData {
  id: number;
  dateTimes: EventDateTime[];
  location: Address;
  prices: Prices[];
}

//events data fetched from database admin
export interface EventsDataDBAdmin extends EventsDataDB {
  createdOn: Date;
  createdBy: UserIdEmail;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
}

//events data sent to database
export interface EventsDataNew extends EventsData {
  dateTimes: string | undefined;
  location: string | undefined;
  prices: string | undefined;
}

//inquiry data - bookings base and waitlist data from database
export interface Inquiry {
  eventId: number;
  adminNotes: string;
  createdOn: Date;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
  id: number;
  contact: Contact;
  additionalInfo: string;
}

//bookings data fetched from database
export interface BookingsDataDB extends Inquiry {
  tickets: TicketChoices[];
  totalTickets: number;
  amountToPay: number;
  hasPaid: boolean;
}

//new bookings data sent to database
export interface BookingsDataNew {
  tickets: TicketChoices[];
  totalTickets: number;
  contact: Contact;
  amountToPay: number;
  additionalInfo: string;
}

//edited bookings data sent to database
export interface BookingsDataEdit {
  contact: string | undefined;
  additionalInfo: string | undefined;
  adminNotes: string | undefined;
  eventId: number;
}

//new waitlist data sent to database
export interface WaitlistDataNewEdit {
  contact: Contact;
  additionalInfo: string;
}

//edited waitlist data sent to database
export interface WaitlistDataEdit {
  contact?: Contact;
  additionalInfo?: string;
  adminNotes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  claimed: boolean;
  createdOn: string;
  claimedOn?: string;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
}

//edited user data sent to database
export interface UserDataEdit {
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
}

export interface UserDataNew {
  email: string;
  password: string;
  role: UserRole;
}

//teacher bio base
export interface TeacherBio {
  id: number;
  name: string;
  pronouns: string;
  position: string;
  imageUrl: string;
  description: string;
}

//teacher bio admin
export interface TeacherBioAdmin extends TeacherBio {
  email: string;
  public: boolean;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: UserIdEmail;
}

//new user bio data sent to database

//edited user bio data sent to database

export interface ApiParams {
  params: {
    eventId: string | undefined;
    bookingId: string | undefined;
    waitlistId: string | undefined;
    userEmail: string | undefined;
  };
}

export interface Session {
  user: {
    id: string;
    name?: string;
    role: string;
    email: string;
  };
  expires: string;
}

export interface ReactNodeWrapper {
  children?: ReactNode;
}

export interface IRequest {
  request: {
    url: string;
  };
}


// //////////////////////////////////////////////////////////
export type UserPostReq = {
  email: string;
  password: string;
  role: UserRole
}

export type CreateUserData = {
  email: string;
  password: string;
  role: UserRole;
  createdOn: Date;
}

export type UserDB = {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
  claimed: boolean;
  createdOn: Date;
  claimedOn: Date | null;
  updatedOn: Date | null;
  updatedBy: JsonValue;
  preferences: JsonValue;
}

export interface UserPatchReq {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  preferences?: any;
}

export interface UpdateUserData extends UserPatchReq {
  updatedOn: Date;
  updatedBy: Prisma.JsonObject;
}

export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | Prisma.JsonObject
  | Prisma.JsonArray