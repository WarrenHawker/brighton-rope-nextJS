import { BookingClient, UpdateBookingData } from '@/utils/types/bookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateBookingOptions = {
  url: string;
  updateData: UpdateBookingData;
};

export const updateBookingById = async (options: UpdateBookingOptions) => {
  const res = await fetch(options.url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.updateData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.updatedBooking;
};

const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<BookingClient, Error, UpdateBookingOptions>(
    updateBookingById,
    {
      onSuccess: (updatedBooking) => {
        queryClient.setQueryData(
          ['bookings'],
          (prevData: BookingClient[] | undefined) => {
            if (!prevData) {
              return [];
            }
            return prevData.map((item) => {
              if (item.id == updatedBooking.id) {
                return updatedBooking;
              } else return item;
            });
          }
        );
      },
    }
  );
};

export default useUpdateBooking;
