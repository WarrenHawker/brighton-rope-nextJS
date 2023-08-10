import {
  Address,
  EventClient,
  EventClientAdmin,
  EventDateTime,
  Prices,
  UserIdEmail,
} from '@/utils/interfaces';
import { useQuery } from '@tanstack/react-query';
import validator from 'validator';

type FetchEventOptions = {
  limit?: number;
  type?: 'old' | 'upcoming' | 'all';
};

export const fetchEvents = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  if (data.events[0].createdOn) {
    const events = data.events.map((event: EventClientAdmin) => {
      return {
        id: event.id,
        title: validator.unescape(event.title),
        description: decodeURIComponent(event.description),
        startDate: event.startDate,
        dateTimes: event.dateTimes as EventDateTime[],
        location: {
          lineOne: validator.unescape(event.location.lineOne),
          lineTwo: event.location.lineTwo
            ? validator.unescape(event.location.lineTwo)
            : '',
          city: validator.unescape(event.location.city),
          country: validator.unescape(event.location.country),
          postcode: validator.unescape(event.location.postcode),
        } as Address,
        isFree: event.isFree,
        maxTickets: event.maxTickets,
        ticketsSold: event.ticketsSold,
        ticketsRemaining: event.ticketsRemaining,
        prices: event.prices?.map((item) => ({
          key: validator.unescape(item.key),
          value: {
            maxPrice: item.value.maxPrice,
            minPrice: item.value.minPrice,
          },
          fixedPrice: item.fixedPrice,
        })) as Prices[],
        allowMultipleTickets: event.allowMultipleTickets,
        createdOn: event.createdOn,
        createdBy: event.createdBy as UserIdEmail,
        updatedOn: event.updatedOn,
        updatedBy: event.updatedBy as UserIdEmail,
      };
    });
    return events;
  } else {
    const events = data.events.map((event: EventClient) => {
      return {
        id: event.id,
        title: validator.unescape(event.title),
        description: decodeURIComponent(event.description),
        startDate: event.startDate,
        dateTimes: event.dateTimes as EventDateTime[],
        location: {
          lineOne: validator.unescape(event.location.lineOne),
          lineTwo: event.location.lineTwo
            ? validator.unescape(event.location.lineTwo)
            : '',
          city: validator.unescape(event.location.city),
          country: validator.unescape(event.location.country),
          postcode: validator.unescape(event.location.postcode),
        } as Address,
        isFree: event.isFree,
        maxTickets: event.maxTickets,
        ticketsSold: event.ticketsSold,
        ticketsRemaining: event.ticketsRemaining,
        prices: event.prices?.map((item) => ({
          key: validator.unescape(item.key),
          value: {
            maxPrice: item.value.maxPrice,
            minPrice: item.value.minPrice,
          },
          fixedPrice: item.fixedPrice,
        })) as Prices[],
        allowMultipleTickets: event.allowMultipleTickets,
      };
    });
    return events;
  }
};

const useFetchEvents = (options?: FetchEventOptions) => {
  let fetchUrl = '/api/events';
  if (options) {
    if (options.limit && !options.type) {
      fetchUrl += `?limit=${options.limit}`;
    } else if (!options.limit && options.type) {
      fetchUrl += `?type=${options.type}`;
    } else if (options.limit && options.type) {
      fetchUrl += `?limit=${options.limit}&type=${options.type}`;
    }
  }

  const { data, error, status } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(fetchUrl),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchEvents;
