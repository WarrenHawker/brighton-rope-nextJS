import { TeacherDB, TeacherUpdateData } from '@/utils/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateTeacherOptions = {
  url: string;
  updateData: TeacherUpdateData;
};

export const updateUserByEmail = async (options: UpdateTeacherOptions) => {
  const res = await fetch(options.url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.updateData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.updatedTeacher;
};

const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation<TeacherDB, Error, UpdateTeacherOptions>(
    updateUserByEmail,
    {
      onSuccess: (updatedTeacher) => {
        queryClient.setQueryData(
          ['teachers', updatedTeacher.email],
          updatedTeacher
        );
      },
    }
  );
};

export default useUpdateTeacher;
