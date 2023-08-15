import { decodeEventAdmin } from '@/utils/functions';
import { EventDateTime, EventDBAdmin } from '@/utils/types/events';
import { Address, Prices } from '@/utils/types/globals';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UpdateEventData = {
  title: string;
  description: string;
  startDate: Date;
  location: Address;
  isFree: boolean;

  dateTimes?: EventDateTime[];
  maxTickets?: number;
  prices?: Prices[];
  allowMultipleTickets?: boolean;
};

type UpdateEventOptions = {
  url: string;
  updateData: UpdateEventData;
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

  const updatedEvent = decodeEventAdmin(data.updatedEvent);
  return updatedEvent;
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
