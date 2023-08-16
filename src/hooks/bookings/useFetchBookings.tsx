import { useQuery } from '@tanstack/react-query';

export const fetchBookingsByEventId = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.bookings;
};

const useFetchBookings = (eventId: number) => {
  const { data, error, status } = useQuery({
    queryKey: ['bookings', `event: ${eventId}`],
    queryFn: () => fetchBookingsByEventId(`/api/events/${eventId}/bookings`),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchBookings;
