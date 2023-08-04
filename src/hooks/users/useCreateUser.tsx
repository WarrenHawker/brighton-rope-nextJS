import { UserDB, UserRole } from '@/utils/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

type CreateUserOptions = {
  url: string;
  userData: {
    email: string;
    password: string;
    role: UserRole;
  };
};

type PrevData = {
  users: UserDB[];
};

export const createUser = async (options: CreateUserOptions) => {
  const res = await fetch(options.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.userData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.user;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserDB, Error, CreateUserOptions>(createUser, {
    onSuccess: (user) => {
      queryClient.setQueryData(['users'], (prevData: PrevData | undefined) => {
        if (!prevData) {
          return { users: [user] };
        }
        return {
          ...prevData,
          users: [...prevData.users, user],
        };
      });
    },
  });
};

export default useCreateUser;
