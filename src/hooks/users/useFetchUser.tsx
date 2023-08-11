import { decodeUser } from '@/utils/functions';
import { useQuery } from '@tanstack/react-query';

export const fetchUserByEmail = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }

  const user = decodeUser(data.user);
  return user;
};

const useFetchUser = (email: string) => {
  const { data, error, status } = useQuery({
    queryKey: ['users', email],
    queryFn: () => fetchUserByEmail(`/api/users/${email}`),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchUser;
