'use client';

//fetches events. By default, fetches all events both old and upcoming
export const fetchEventsClient = async (options?: {
  amount?: number;
  old?: string;
}) => {
  const amount = options?.amount ? options.amount : -1;
  const old = options?.old ? options.old : 'true';

  const res = await fetch(`/api/events?events=${amount}&old=${old}`);
  const data = await res.json();
  const events = data.events.map((event: any) => {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      location: JSON.parse(event.location),
      maxTickets: event.maxTickets,
      ticketsSold: event.ticketsSold,
      ticketsRemaining: event.ticketsRemaining,
      dateTimes: JSON.parse(event.dateTimes),
      allowMultipleTickets: event.allowMultipleTickets,
      prices: JSON.parse(event.prices),
    };
  });
  return events;
};

//fetches single event by Id
export const fetchEventByIdClient = async (id: string) => {
  const res = await fetch(`/api/events/${id}`);
  const data = await res.json();

  const event = {
    id: data.event.id,
    title: data.event.title,
    description: data.event.description,
    location: JSON.parse(data.event.location),
    maxTickets: data.event.maxTickets,
    ticketsSold: data.event.ticketsSold,
    ticketsRemaining: data.event.ticketsRemaining,
    startDate: data.event.startDate,
    dateTimes: JSON.parse(data.event.dateTimes),
    allowMultipleTickets: data.event.allowMultipleTickets,
    prices: JSON.parse(data.event.prices),
  };

  return event;
};
