import { Contact, UserIdEmail } from './globals';

export interface CreateWaitlistData {
  contact: Contact;
  totalTickets: number;
  additionalInfo: string;
}

export interface WaitlistClient {
  id: number;
  eventId: number;
  contact: Contact;
  additionalInfo: string;
  totalTickets: number;
  adminNotes: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: UserIdEmail;
}

export interface UpdateWaitlistData {
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  additionalInfo?: string;
  adminNotes?: string;
  tickets?: number;
}
