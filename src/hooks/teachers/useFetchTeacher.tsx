import { useQuery } from '@tanstack/react-query';

export const fetchTeacherByEmail = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.teacher;
};

const useFetchTeacher = (email: string) => {
  const { data, error, status } = useQuery({
    queryKey: ['teachers', email],
    queryFn: () => fetchTeacherByEmail(`/api/teachers/${email}`),
  });
  return { data, error, status };
};

export default useFetchTeacher;
