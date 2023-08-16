import { Contact } from './globals';

export interface CreateWaitlistData {
  contact: Contact;
  totalTickets: number;
  additionalInfo: string;
}
