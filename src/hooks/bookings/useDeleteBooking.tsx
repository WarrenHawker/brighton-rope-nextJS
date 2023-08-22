import { BookingDB } from '@/utils/types/bookings';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const deleteBookingById = async (url: string) => {
  const res = await fetch(url, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.deletedBooking;
};

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<BookingDB, Error, string>(deleteBookingById, {
    onSuccess: (deletedBooking) => {
      queryClient.setQueryData(
        ['bookings'],
        (prevData: BookingDB[] | undefined) => {
          if (!prevData) {
            return [];
          }
          return prevData.filter((item) => item.id != deletedBooking.id);
        }
      );
    },
  });
};

export default useDeleteBooking;
