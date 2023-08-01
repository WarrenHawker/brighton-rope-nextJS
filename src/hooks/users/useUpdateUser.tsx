import { User, UserDataEdit } from '@/utils/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export type UpdateUserOptions = {
  url: string;
  updateData: UserDataEdit;
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
  if(!res.ok) {
    throw new Error(data.error)
  }
  return data.updatedUser
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { update } = useSession();
  return useMutation<User, Error, UpdateUserOptions>(updateUserByEmail, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
      if (data.email) {
        update({ email: data.email });
      }
      if (data.name) {
        update({ name: data.name });
      }
    },
  });
};

export default useUpdateUser;
