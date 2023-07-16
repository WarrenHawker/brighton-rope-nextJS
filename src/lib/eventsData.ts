import { EventsData } from './interfaces';

export const events: EventsData[] = [
  {
    id: '1',
    title: "Beginner's Course",
    description:
      "Our beginner's course is designed for complete beginner's. We take you through the basics from start to finish.",
    dateTimes: [
      {
        date: '2023-06-27',
        startTime: '16:00',
        endTime: '20:00',
        error: null,
      },
      {
        date: '2023-06-28',
        startTime: '16:00',
        endTime: '20:00',
        error: null,
      },
      {
        date: '2023-06-29',
        startTime: '16:00',
        endTime: '20:00',
        error: null,
      },
    ],
    location: {
      lineOne: 'Uckfield Leisure Centre',
      lineTwo: 'Downsview Crescent',
      city: 'Uckfield',
      country: 'UK',
      postcode: 'TN22 1UB',
    },
    maxTickets: 50,
    ticketsSold: 0,
    ticketsRemaining: 50,
    allowMultipleTickets: true,
    prices: [
      {
        key: 'Child (0-16 years)',
        fixedPrice: false,
        value: {
          minPrice: 1,
          maxPrice: 5,
        },
      },
      {
        key: 'Adult (16-60 years)',
        fixedPrice: true,
        value: {
          minPrice: 10,
          maxPrice: null,
        },
      },
      {
        key: 'Senior (60+ years)',
        fixedPrice: true,
        value: {
          minPrice: 7,
          maxPrice: null,
        },
      },
    ],
  },

  {
    id: '2',
    title: "Beginner's Course 2",
    description:
      "Our beginner's course is designed for complete beginner's. We take you through the basics from start to finish.",
    dateTimes: [
      {
        date: '2023-06-27',
        startTime: '16:00',
        endTime: '20:00',
        error: null,
      },
      {
        date: '2023-06-28',
        startTime: '16:00',
        endTime: '20:00',
        error: null,
      },
      {
        date: '2023-06-29',
        startTime: '16:00',
        endTime: '20:00',
        error: null,
      },
    ],
    location: {
      lineOne: 'Uckfield Leisure Centre',
      lineTwo: 'Downsview Crescent',
      city: 'Uckfield',
      country: 'UK',
      postcode: 'TN22 1UB',
    },
    maxTickets: 50,
    ticketsSold: 0,
    ticketsRemaining: 50,
    allowMultipleTickets: true,
    prices: [
      {
        key: 'Child (0-16 years)',
        fixedPrice: false,
        value: {
          minPrice: 1,
          maxPrice: 5,
        },
      },
      {
        key: 'Adult (16-60 years)',
        fixedPrice: true,
        value: {
          minPrice: 10,
          maxPrice: null,
        },
      },
      {
        key: 'Senior (60+ years)',
        fixedPrice: true,
        value: {
          minPrice: 7,
          maxPrice: null,
        },
      },
    ],
  },
];
