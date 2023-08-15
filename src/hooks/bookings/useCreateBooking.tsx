import { CreateBookingData, BookingClient } from '@/utils/types/bookings';
import { useQueryClient, useMutation } from '@tanstack/react-query';

type CreateBookingOptions = {
  url: string;
  bookingData: CreateBookingData;
};

export const createBooking = async (options: CreateBookingOptions) => {
  const res = await fetch(options.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.bookingData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.booking;
};

const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<BookingClient, Error, CreateBookingOptions>(
    createBooking,
    {
      onSuccess: (event) => {
        queryClient.setQueryData(
          ['bookings'],
          (prevData: BookingClient[] | undefined) => {
            if (!prevData) {
              return [event];
            }
            return [...prevData, event];
          }
        );
      },
    }
  );
};

export default useCreateBooking;
