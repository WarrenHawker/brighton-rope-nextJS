import { useQuery } from '@tanstack/react-query';

export const fetchEvents = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const useFetchEvents = () => {
  const { data, status } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents('/api/events'),
  });
  return { data, status };
};

export default useFetchEvents;
