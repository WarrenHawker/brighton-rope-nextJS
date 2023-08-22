import { BookingClient } from '@/utils/types/bookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MoveBookingOptions = {
  url: string;
  moveData: {
    oldEventId: number;
    newEventId: number;
    ticketAmount: number;
  };
};

export const moveBookingById = async (options: MoveBookingOptions) => {
  const res = await fetch(options.url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.moveData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.movedBooking;
};

const useMoveBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<BookingClient, Error, MoveBookingOptions>(
    moveBookingById,
    {
      onSuccess: (movedBooking) => {
        queryClient.invalidateQueries(['events']);
        queryClient.setQueryData(
          ['bookings'],
          (prevData: BookingClient[] | undefined) => {
            if (!prevData) {
              return [];
            }
            return prevData.map((item) => {
              if (item.id == movedBooking.id) {
                return movedBooking;
              } else return item;
            });
          }
        );
      },
    }
  );
};

export default useMoveBooking;
