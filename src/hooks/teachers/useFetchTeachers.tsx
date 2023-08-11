import { decodeTeacher } from '@/utils/functions';
import { TeacherDB } from '@/utils/interfaces';
import { useQuery } from '@tanstack/react-query';

export const fetchTeachers = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  const teachers = data.teachers.map((teacher: TeacherDB) =>
    decodeTeacher(teacher)
  );
  return teachers;
};

const useFetchTeachers = () => {
  let fetchUrl = '/api/teachers';

  const { data, error, status } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchTeachers(fetchUrl),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, status };
};

export default useFetchTeachers;
