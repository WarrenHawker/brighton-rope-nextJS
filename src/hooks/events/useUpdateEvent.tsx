import { EventDBAdmin } from '@/utils/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateEventOptions = {
  url: string;
  updateData: object;
};

export const updateEventById = async (options: UpdateEventOptions) => {
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
  return data.updatedEvent;
};

const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<EventDBAdmin, Error, UpdateEventOptions>(updateEventById, {
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData(
        ['events'],
        (prevData: EventDBAdmin[] | undefined) => {
          if (!prevData) {
            return [];
          }
          return prevData.map((item) => {
            if (item.id == updatedEvent.id) {
              return updatedEvent;
            } else return item;
          });
        }
      );
    },
  });
};

export default useUpdateEvent;
