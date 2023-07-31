import { useQuery } from '@tanstack/react-query';

export const updateUserById = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useUpdateUser = async () => {
  const { data, status } = useQuery({
    queryKey: ['users'],
    queryFn: () => updateUserById('/api/users'),
  });
  return { data, status };
};

export default useUpdateUser;
