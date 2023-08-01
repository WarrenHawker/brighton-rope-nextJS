'use client';

import useFetchTeacher from '@/hooks/teachers/useFetchTeacher';
import { User, UserDataEdit, UserRole } from '@/utils/interfaces';
import { useState } from 'react';
import TeacherBio from './teacherBio';
import useUpdateUser from '@/hooks/users/useUpdateUser';
import useDeleteUser from '@/hooks/users/useDeleteUser';
import toast from 'react-hot-toast';
import validator from 'validator';

interface Props {
  user: User;
  setSelectedUser:(user: User | null) => void;
  setIsModalOpen: (value: boolean) => void;
}

const UserDetails = ({ user, setIsModalOpen, setSelectedUser }: Props) => {
  const { data, status } = useFetchTeacher(user.email);
  const [error, setError] = useState<string | null | undefined>(null)
  const [editing, setEditing] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  });
  const { mutateAsync: updateMutate, status: updateStatus } = useUpdateUser();
  const { mutateAsync: deleteMutate, status: deleteStatus } = useDeleteUser();

  const saveEdit = async() => {
    //check if email field is empty or invalid {
    if(userDetails.email == '') {
      setError('Email cannot be empty')
      return
    }
    if(!validator.isEmail(userDetails.email)) {
      setError('Email  is not valid')
      return
    }

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

    //if no changes found, end function
    if(Object.keys(updateData).length == 0) {
      setEditing(false)
      setError(null)
      return
    }

    //try updating user 
    try {
      await updateMutate({ url: `/api/users/${user.email}`, updateData });
      setEditing(false);
      setError(null);
      toast.success('user updated successfully');
    } catch (error:any) {
      setError(error.message)
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setUserDetails({
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    });
    setError(null)
  };

  const handleDeleteUser = async() => {
    if(confirm("are you sure you want to delete this user? This process is irreversible!")) {
      try {
        await deleteMutate(`/api/users/${user.email}`)
        setIsModalOpen(false);
        setSelectedUser(null);
      } catch (error:any) {
        setError(error.message)
      }
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
      {error && <p className='error'>{error}</p>}
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
