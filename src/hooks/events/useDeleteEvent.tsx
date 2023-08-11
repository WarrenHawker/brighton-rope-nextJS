import { EventDBAdmin } from '@/utils/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const deleteEventById = async (url: string) => {
  const res = await fetch(url, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.deletedEvent;
};

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<EventDBAdmin, Error, string>(deleteEventById, {
    onSuccess: (deletedEvent) => {
      queryClient.setQueryData(
        ['events'],
        (prevData: EventDBAdmin[] | undefined) => {
          if (!prevData) {
            return [];
          }
          return prevData.filter((item) => item.id != deletedEvent.id);
        }
      );
    },
  });
};

export default useDeleteEvent;
