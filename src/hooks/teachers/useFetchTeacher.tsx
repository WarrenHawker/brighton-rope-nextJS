import { useQuery } from '@tanstack/react-query';

export const fetchTeacherByEmail = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const useFetchTeacher = (email: string) => {
  const { data, status } = useQuery({
    queryKey: ['teachers', email],
    queryFn: () => fetchTeacherByEmail(`/api/teachers/${email}`),
  });
  return { data, status };
};

export default useFetchTeacher;
