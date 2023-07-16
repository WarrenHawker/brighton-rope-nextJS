import { BookingsData } from './interfaces';

export const bookings: BookingsData[] = [
  {
    id: '1',
    tickets: [
      {
        name: 'Child (0-16 years)',
        value: 5,
        quantity: 2,
      },
      {
        name: 'Adult (16-60 years)',
        value: 10,
        quantity: 1,
      },
      {
        name: 'Senior (60+ years)',
        value: 7,
        quantity: 0,
      },
    ],
    contact: {
      firstName: 'Joe',
      lastName: 'Boops',
      email: 'joe@mail.com',
      phone: '00000000000',
    },
    amountToPay: 20,
    additionalInfo: 'testing note',
    eventID: '1',
    bookingDate: '2023-06-13',
    adminNotes: 'perfect booking',
  },
  {
    id: '2',
    tickets: [
      {
        name: 'Child (0-16 years)',
        value: 5,
        quantity: 2,
      },
      {
        name: 'Adult (16-60 years)',
        value: 10,
        quantity: 1,
      },
      {
        name: 'Senior (60+ years)',
        value: 7,
        quantity: 0,
      },
    ],
    contact: {
      firstName: 'Someone',
      lastName: 'Notme',
      email: 'hn@mail.com',
      phone: '00000000000',
    },
    amountToPay: 20,
    additionalInfo: 'testing note',
    eventID: '1',
    bookingDate: '2023-06-13',
    adminNotes: 'perfect booking',
  },
  {
    id: '3',
    tickets: [
      {
        name: 'Child (0-16 years)',
        value: 5,
        quantity: 2,
      },
      {
        name: 'Adult (16-60 years)',
        value: 10,
        quantity: 1,
      },
      {
        name: 'Senior (60+ years)',
        value: 7,
        quantity: 0,
      },
    ],
    contact: {
      firstName: 'Hello',
      lastName: 'World',
      email: 'hello-world@mail.com',
      phone: '01234567891',
    },
    amountToPay: 20,
    additionalInfo: 'testing note',
    eventID: '2',
    bookingDate: '2023-06-13',
    adminNotes: 'perfect booking',
  },
  {
    id: '4',
    tickets: [
      {
        name: 'Child (0-16 years)',
        value: 5,
        quantity: 2,
      },
      {
        name: 'Adult (16-60 years)',
        value: 10,
        quantity: 1,
      },
      {
        name: 'Senior (60+ years)',
        value: 7,
        quantity: 0,
      },
    ],
    contact: {
      firstName: 'Hi',
      lastName: 'Work',
      email: 'hi.work@gmail.co.uk',
      phone: '01927364759',
    },
    amountToPay: 20,
    additionalInfo: 'testing note',
    eventID: '2',
    bookingDate: '2023-06-13',
    adminNotes: 'perfect booking',
  },
];
