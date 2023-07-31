import { useQuery } from '@tanstack/react-query';

export const createUser = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useCreateUser = async () => {
  const { data, status } = useQuery({
    queryKey: ['users'],
    queryFn: () => createUser('/api/users'),
  });
  return { data, status };
};

export default useCreateUser;
