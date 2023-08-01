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
              <th className="hide-mobile">Role</th>
              <th className="hide-mobile">Date Created</th>
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
                <td className="hide-mobile">{user.role}</td>
                <td className="hide-mobile">{getFullDate(user.createdOn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="center">{data.error}</h3>
      )}
      <Overlay
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        header={
          <div className="booking-details-header">
            <h2>User Details for User ID: {selectedUser?.id}</h2>
            <p className="left">
              <strong>Creation Date: </strong>
              {getFullDate(selectedUser?.createdOn)}
            </p>
            <p className="left">
              <strong>Has been claimed? </strong>
              {selectedUser?.claimed ? 'yes' : 'no'}
            </p>
            {selectedUser?.claimed && (
              <p className="left">
                <strong>Claimed Date: </strong>
                {getFullDate(selectedUser?.claimedOn)}
              </p>
            )}
          </div>
        }
      >
        {selectedUser ? <UserDetails user={selectedUser} setIsModalOpen={setIsModalOpen} setSelectedUser={setSelectedUser}/> : null}
      </Overlay>
    </>
  );
};

export default UsersList;
