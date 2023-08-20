import { useQuery } from '@tanstack/react-query';

export const fetchWaitlistsByEventId = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.waitlists;
};

const useFetchWaitlists = (eventId: number) => {
  const { data, error, status } = useQuery({
    queryKey: ['waitlists', `event: ${eventId}`],
    queryFn: () => fetchWaitlistsByEventId(`/api/events/${eventId}/waitlists`),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchWaitlists;
