import { decodeEvent, decodeEventAdmin } from '@/utils/functions';
import { EventClient, EventClientAdmin } from '@/utils/types/events';
import { useQuery } from '@tanstack/react-query';

type FetchEventOptions = {
  limit?: number;
  type?: 'old' | 'upcoming' | 'all';
  queryKey?: string[];
};

export const fetchEvents = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  if (data.events[0].createdOn) {
    const events = data.events.map((event: EventClientAdmin) =>
      decodeEventAdmin(event)
    );
    return events;
  } else {
    const events = data.events.map((event: EventClient) => decodeEvent(event));
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
    queryKey: options?.queryKey || ['events'],
    queryFn: () => fetchEvents(fetchUrl),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchEvents;
