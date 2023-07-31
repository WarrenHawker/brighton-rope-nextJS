'use client';

import useFetchUsers from '@/hooks/users/useFetchUsers';
import { getFullDate } from '@/utils/functions';
import Overlay from '@/utils/globalComponents/Overlay';
import { User } from '@/utils/interfaces';
import { useState } from 'react';
import UserDetails from './userDetails';

const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, status } = useFetchUsers();

  if (status == 'loading') {
    return (
      <>
        <h2 className="center">Users List</h2>
        <h3 className="center">Loading...</h3>
      </>
    );
  }

  if (status == 'error') {
    return (
      <>
        <h2 className="center">Users List</h2>
        <h3 className="center error">{data.error}</h3>
      </>
    );
  }

  return (
    <>
      <h2 className="center">Users List</h2>
      {data.users ? (
        <table className="main-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user: User) => (
              <tr
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
              >
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{getFullDate(user.createdOn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="center">No Users Found</h3>
      )}
      <Overlay isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {selectedUser ? <UserDetails user={selectedUser} /> : null}
      </Overlay>
    </>
  );
};

export default UsersList;
