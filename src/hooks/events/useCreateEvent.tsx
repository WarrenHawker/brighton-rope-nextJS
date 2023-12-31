import { decodeEventAdmin } from '@/utils/functions';
import { EventDateTime, EventDBAdmin } from '@/utils/types/events';
import { Prices, Address } from '@/utils/types/globals';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export type CreateEventData = {
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

type CreateEventOptions = {
  url: string;
  eventData: CreateEventData;
};

export const createEvent = async (options: CreateEventOptions) => {
  const res = await fetch(options.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.eventData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }

  const event = decodeEventAdmin(data.event);
  return event;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<EventDBAdmin, Error, CreateEventOptions>(createEvent, {
    onSuccess: (event) => {
      queryClient.setQueryData(
        ['events'],
        (prevData: EventDBAdmin[] | undefined) => {
          if (!prevData) {
            return [event];
          }
          return [...prevData, event];
        }
      );
    },
  });
};

export default useCreateUser;
