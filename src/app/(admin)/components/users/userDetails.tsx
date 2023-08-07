'use client';

import { UserDB, UserRole, UserUpdateData } from '@/utils/interfaces';
import { useEffect, useRef, useState } from 'react';
import TeacherBio from './TeacherBio';
import useUpdateUser from '@/hooks/users/useUpdateUser';
import useDeleteUser from '@/hooks/users/useDeleteUser';
import toast from 'react-hot-toast';
import validator from 'validator';

interface Props {
  user: UserDB;
  setSelectedUser?: (user: UserDB | null) => void;
  setIsModalOpen?: (value: boolean) => void;
}

interface UserDetails {
  email?: string | undefined;
  name?: string | undefined;
  role?: UserRole | undefined;
}

const UserDetails = ({ user, setIsModalOpen, setSelectedUser }: Props) => {
  const [error, setError] = useState<string | null | undefined>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { mutateAsync: updateMutate, status: updateStatus } = useUpdateUser();
  const { mutateAsync: deleteMutate, status: deleteStatus } = useDeleteUser();

  const emailInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const roleInput = useRef<HTMLSelectElement>(null);

  console.log(user.role);

  useEffect(() => {
    setUserDetails({
      email: user.email,
      name: user.name ? user.name : '',
      role: user.role as UserRole,
    });
  }, [user]);

  const saveEdit = async () => {
    //check if email field is empty or invalid {
    if (userDetails!.email == '') {
      setError('Email cannot be empty');
      return;
    }
    if (!validator.isEmail(userDetails!.email!)) {
      setError('Email  is not valid');
      return;
    }

    const updateData: UserUpdateData = {};
    //if email has changed, add to updateData
    if (userDetails!.email != user.email) {
      updateData.email = userDetails!.email;
    }
    //if name has changed, add to updateData
    if (userDetails!.name != user.name) {
      updateData.name = userDetails!.name;
    }
    //if role has changed, add to updateData
    if (userDetails!.role != user.role) {
      updateData.role = userDetails!.role;
    }

    //if no changes found, end function
    if (Object.keys(updateData).length == 0) {
      setEditing(false);
      setError(null);
      return;
    }

    //try updating user
    try {
      await updateMutate({ url: `/api/users/${user.email}`, updateData });
      setEditing(false);
      setError(null);
      toast.success('user updated successfully');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setUserDetails({
      email: user.email,
      name: user.name ? user.name : '',
      role: user.role as UserRole,
    });
    emailInput.current!.value = user.email;
    nameInput.current!.value = user.name ? user.name : '';
    if (user.role == 'SUPERADMIN') {
      roleInput.current!.value = user.role as UserRole;
    }
    setError(null);
  };

  const handleDeleteUser = async () => {
    if (
      confirm(
        'are you sure you want to delete this user? This process is irreversible!'
      )
    ) {
      try {
        await deleteMutate(`/api/users/${user.email}`);
        if (setIsModalOpen) {
          setIsModalOpen(false);
        }
        if (setSelectedUser) {
          setSelectedUser(null);
        }
        toast.success('user deleted successfully');
      } catch (error: any) {
        setError(error.message);
      }
    } else return;
  };

  if (!user || !userDetails) {
    return <></>;
  }

  return (
    <>
      <h2 className="center">user details</h2>
      <div className="button-container">
        {editing ? (
          <>
            <button className="btn" onClick={saveEdit}>
              Save
            </button>
            <button className="btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        {user.role == 'SUPERADMIN' && (
          <button className="btn btn-delete" onClick={handleDeleteUser}>
            Delete
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <tbody>
          <tr>
            <th>Email</th>
            <td>
              <input
                ref={emailInput}
                type="email"
                defaultValue={userDetails!.email}
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
                ref={nameInput}
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
            {user.role == 'SUPERADMIN' ? (
              <td>
                <select
                  ref={roleInput}
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
            ) : (
              <td>{user.role}</td>
            )}
          </tr>
        </tbody>
      </table>
      {updateStatus == 'loading' && (
        <h3 className="center">Updating User...</h3>
      )}
      {deleteStatus == 'loading' && (
        <h3 className="center">Deleting User...</h3>
      )}
      <TeacherBio userEmail={user.email} role={user.role} />
    </>
  );
};

export default UserDetails;
