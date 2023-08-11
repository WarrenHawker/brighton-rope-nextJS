import { decodeEvent, decodeEventAdmin } from '@/utils/functions';
import { useQuery } from '@tanstack/react-query';

export const fetchSingleEvent = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  if (data.event.createdOn) {
    const event = decodeEventAdmin(data.event);
    return event;
  } else {
    const event = decodeEvent(data.event);
    return event;
  }
};

const useFetchEvent = (eventId: number) => {
  const fetchUrl = `/api/events/${eventId}`;
  const { data, error, status } = useQuery({
    queryKey: ['events', eventId],
    queryFn: () => fetchSingleEvent(fetchUrl),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchEvent;
