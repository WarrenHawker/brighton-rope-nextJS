import { useQuery } from '@tanstack/react-query';

export const deleteUserById = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useDeleteUser = async () => {
  const { data, status } = useQuery({
    queryKey: ['users'],
    queryFn: () => deleteUserById('/api/users'),
  });
  return { data, status };
};

export default useDeleteUser;
