'use client';

import useFetchTeacher from '@/hooks/teachers/useFetchTeacher';
import useFetchUser from '@/hooks/users/useFetchUser';
import { User } from '@/utils/interfaces';

interface Props {
  user: User;
}

const UserDetails = ({ user }: Props) => {
  const { data, status } = useFetchTeacher(user.email);

  console.log(data);

  if (status == 'loading') {
    return (
      <>
        <h2 className="center">User Details</h2>
        <h3 className="center">Loading...</h3>
      </>
    );
  }

  if (status == 'error') {
    return (
      <>
        <h2 className="center">User Details</h2>
        <h3 className="center error">{data.error}</h3>
      </>
    );
  }

  return (
    <>
      <h2 className="center">user details</h2>
      {data.error ? (
        <h3 className="center error">{data.error}</h3>
      ) : (
        <>
          {data.teacher.map((teacher) => (
            <>
              <p>{teacher.email}</p>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default UserDetails;
