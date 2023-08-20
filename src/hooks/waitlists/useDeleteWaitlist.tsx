import { WaitlistClient } from '@/utils/types/waitlists';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const deleteWaitlistById = async (url: string) => {
  const res = await fetch(url, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.deletedWaitlist;
};

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<WaitlistClient, Error, string>(deleteWaitlistById, {
    onSuccess: (deletedWaitlist) => {
      queryClient.setQueryData(
        ['waitlists'],
        (prevData: WaitlistClient[] | undefined) => {
          if (!prevData) {
            return [];
          }
          return prevData.filter((item) => item.id != deletedWaitlist.id);
        }
      );
    },
  });
};

export default useDeleteBooking;
