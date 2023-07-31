'use client';

import useFetchTeacher from '@/hooks/teachers/useFetchTeacher';
import { User, UserDataEdit, UserRole } from '@/utils/interfaces';
import { useState } from 'react';
import TeacherBio from './teacherBio';
import useUpdateUser from '@/hooks/users/useUpdateUser';

interface Props {
  user: User;
}

const UserDetails = ({ user }: Props) => {
  const { data, status } = useFetchTeacher(user.email);
  const [editing, setEditing] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  });
  const { mutate } = useUpdateUser();

  const saveEdit = () => {
    setEditing(false);
    const updateData: UserDataEdit = {};
    //if email has changed, add to updateData
    if (userDetails.email != user.email) {
      updateData.email = userDetails.email;
    }
    //if name has changed, add to updateData
    if (userDetails.name != user.name) {
      updateData.name = userDetails.name;
    }
    //if role has changed, add to updateData
    if (userDetails.role != user.role) {
      updateData.role = userDetails.role;
    }

    mutate({ url: `/api/users/${user.email}`, updateData });
  };

  const cancelEdit = () => {
    setEditing(false);
    setUserDetails({
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    });
  };

  const deleteUser = () => {};

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
      <div className="button-container">
        {editing ? (
          <>
            <button className="btn" onClick={saveEdit}>
              Save
            </button>{' '}
            <button className="btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        <button className="btn btn-delete" onClick={deleteUser}>
          Delete
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Email</th>
            <td>
              <input
                type="email"
                defaultValue={userDetails.email}
                disabled={!editing}
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </td>
          </tr>
          <tr>
            <th>Name</th>
            <td>
              <input
                type="text"
                defaultValue={userDetails.name}
                disabled={!editing}
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </td>
          </tr>
          <tr>
            <th>Role</th>
            <td>
              <select
                defaultValue={user.role}
                disabled={!editing}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    role: e.target.value as UserRole,
                  }))
                }
              >
                <option value={'ADMIN'}>Admin</option>
                <option value={'SUPERADMIN'}>Super Admin</option>
                <option value={'INACTIVE'}>Inactive</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      {data.error ? (
        <h3 className="center error">{data.error}</h3>
      ) : (
        <TeacherBio teacher={data.teacher} />
      )}
    </>
  );
};

export default UserDetails;
