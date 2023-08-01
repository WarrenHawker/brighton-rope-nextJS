import { User, UserDataNew } from '@/utils/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export type CreateUserOptions = {
  url: string;
  userData: UserDataNew;
};

export const createUser = async (options: CreateUserOptions ) => {
  const res = await fetch(options.url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify(options.userData),});
  const data = await res.json();
  if(!res.ok) {
    throw new Error(data.error)
  }
  return data
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, CreateUserOptions>(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};

export default useCreateUser;
