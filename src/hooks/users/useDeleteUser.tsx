import { UserDB } from '@/utils/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const deleteUserByEmail = async (url: string) => {
  const res = await fetch(url, { method: 'DELETE' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.deletedUser;
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserDB, Error, string>(deleteUserByEmail, {
    onSuccess: (deletedUser) => {
      queryClient.setQueryData(['users'], (prevData: UserDB[] | undefined) => {
        if (!prevData) {
          return [];
        }
        return prevData.filter((item) => item.id != deletedUser.id);
      });
    },
  });
};

export default useDeleteUser;
