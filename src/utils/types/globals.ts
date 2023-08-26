export type AdminView = 'Events' | 'Add Event' | 'Account';
export type EventView = 'details' | 'bookings' | 'waiting list';

export interface ApiParams {
  params: {
    eventId: string | undefined;
    bookingId: string | undefined;
    waitlistId: string | undefined;
    userEmail: string | undefined;
  };
}

export type PriceScale = {
  minPrice: number;
  maxPrice: number | null;
};

export type Prices = {
  key: string;
  fixedPrice: boolean;
  value: PriceScale;
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

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
};

export type SendEmailData = {
  recipient: string;
  subject: string;
  text: string;
  html: string;
};
