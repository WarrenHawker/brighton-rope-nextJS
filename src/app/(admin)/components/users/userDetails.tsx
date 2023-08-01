'use client';

import useFetchTeacher from '@/hooks/teachers/useFetchTeacher';
import { User, UserDataEdit, UserRole } from '@/utils/interfaces';
import { useState } from 'react';
import TeacherBio from './teacherBio';
import useUpdateUser from '@/hooks/users/useUpdateUser';
import useDeleteUser from '@/hooks/users/useDeleteUser';

interface Props {
  user: User;
  setSelectedUser:(user: User | null) => void;
  setIsModalOpen: (value: boolean) => void;
}

const UserDetails = ({ user, setIsModalOpen, setSelectedUser }: Props) => {
  const { data, status } = useFetchTeacher(user.email);
  const [editing, setEditing] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  });
  const { mutate: updateUser } = useUpdateUser();
  const {mutate: deleteUser} = useDeleteUser();

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
    updateUser({ url: `/api/users/${user.email}`, updateData });
  };

  const cancelEdit = () => {
    setEditing(false);
    setUserDetails({
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    });
  };

  const handleDeleteUser = () => {
    if(confirm("are you sure you want to delete this user? This process is irreversible!")) {
      deleteUser(`/api/users/${user.email}`)
      setIsModalOpen(false);
      setSelectedUser(null);
    } else return   
  };

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
        <button className="btn btn-delete" onClick={handleDeleteUser}>
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
