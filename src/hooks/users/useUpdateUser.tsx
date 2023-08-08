import { UserDB, UserUpdateData } from '@/utils/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type UpdateUserOptions = {
  url: string;
  updateData: UserUpdateData;
};

export const updateUserByEmail = async (options: UpdateUserOptions) => {
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
  return data.updatedUser;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { data: session, update } = useSession();
  return useMutation<UserDB, Error, UpdateUserOptions>(updateUserByEmail, {
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['users'], (prevData: UserDB[] | undefined) => {
        if (session?.user.id == updatedUser.id) {
          update({ email: updatedUser.email });
          update({ name: updatedUser.name });
        }
        if (!prevData) {
          return [];
        }
        return prevData.map((item) => {
          if (item.id == updatedUser.id) {
            return updatedUser;
          } else return item;
        });
      });
    },
  });
};

export default useUpdateUser;
