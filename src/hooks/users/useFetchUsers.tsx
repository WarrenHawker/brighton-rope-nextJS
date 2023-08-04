import { useQuery } from '@tanstack/react-query';

export const fetchUsers = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const useFetchUsers = () => {
  const { data, status } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers('/api/users'),
  });
  return { data, status };
};

export default useFetchUsers;
