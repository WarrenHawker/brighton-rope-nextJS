import { decodeUser } from '@/utils/functions';
import { UserClient, UserRole } from '@/utils/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

type CreateUserOptions = {
  url: string;
  userData: {
    email: string;
    password: string;
    role: UserRole;
  };
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

  const user = decodeUser(data.user);
  return user;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserClient, Error, CreateUserOptions>(createUser, {
    onSuccess: (user) => {
      queryClient.setQueryData(
        ['users'],
        (prevData: UserClient[] | undefined) => {
          if (!prevData) {
            return [user];
          }
          return [...prevData, user];
        }
      );
    },
  });
};

export default useCreateUser;
