import { CreateWaitlistData, WaitlistClient } from '@/utils/types/waitlists';
import { useQueryClient, useMutation } from '@tanstack/react-query';

type CreateWaitlistOptions = {
  url: string;
  waitlistData: CreateWaitlistData;
};

export const createWaitlist = async (options: CreateWaitlistOptions) => {
  const res = await fetch(options.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.waitlistData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.waitlist;
};

const useCreateWaitlist = () => {
  const queryClient = useQueryClient();
  return useMutation<WaitlistClient, Error, CreateWaitlistOptions>(
    createWaitlist,
    {
      onSuccess: (waitlist) => {
        queryClient.setQueryData(
          ['waitlists'],
          (prevData: WaitlistClient[] | undefined) => {
            if (!prevData) {
              return [waitlist];
            }
            return [...prevData, waitlist];
          }
        );
      },
    }
  );
};

export default useCreateWaitlist;
