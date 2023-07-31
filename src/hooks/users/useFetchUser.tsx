import { useQuery } from '@tanstack/react-query';

export const fetchUserByEmail = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useFetchUser = (email: string) => {
  const { data, status } = useQuery({
    queryKey: ['users', email],
    queryFn: () => fetchUserByEmail(`/api/users/${email}`),
  });
  return { data, status };
};

export default useFetchUser;
