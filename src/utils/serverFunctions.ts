import { headers } from 'next/headers';

export const fetchHomeEvents = async () => {
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(
    `${protocal}://${host}/api/events?events=3&old=false`,
    {
      next: { tags: ['events'] },
    }
  );
  const data = await res.json();
  if (Array.isArray(data.events)) {
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
  } else return [data];
};

export const fetchAllUpcomingEvents = async () => {
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(
    `${protocal}://${host}/api/events?events=-1&old=false`,
    {
      next: { tags: ['events'] },
    }
  );
  const data = await res.json();
  if (Array.isArray(data.events)) {
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
  } else return [data];
};

export const fetchEventById = async (id: string) => {
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocal}://${host}/api/events/${id}`, {
    next: { tags: ['events'] },
  });
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
