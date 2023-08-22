import { UpdateWaitlistData, WaitlistClient } from '@/utils/types/waitlists';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateWaitlistOptions = {
  url: string;
  updateData: UpdateWaitlistData;
};

export const updateWaitlistById = async (options: UpdateWaitlistOptions) => {
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

  return data.updatedWaitlist;
};

const useUpdateWaitlist = () => {
  const queryClient = useQueryClient();
  return useMutation<WaitlistClient, Error, UpdateWaitlistOptions>(
    updateWaitlistById,
    {
      onSuccess: (updatedWaitlist) => {
        queryClient.setQueryData(
          ['waitlists'],
          (prevData: WaitlistClient[] | undefined) => {
            if (!prevData) {
              return [];
            }
            return prevData.map((item) => {
              if (item.id == updatedWaitlist.id) {
                return updatedWaitlist;
              } else return item;
            });
          }
        );
      },
    }
  );
};

export default useUpdateWaitlist;
