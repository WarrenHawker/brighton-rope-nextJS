import { useQueryClient, useMutation } from '@tanstack/react-query';

export const deleteUserByEmail = async (url: string) => {
  const res = await fetch(url, {method: 'DELETE'});
  const data = await res.json();
  if(!res.ok) {
    throw new Error(data.error)
  }
  return data
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>(deleteUserByEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};

export default useDeleteUser;
