'use client';

import Overlay from '@/utils/globalComponents/Overlay';
import { User } from '@/utils/interfaces';
import { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data.users);
  };
  return (
    <>
      <h2 className="center">Users List</h2>
      {users ? (
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
            {users.map((user) => (
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
                <td>{user.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="center">No Users Found</h3>
      )}

      <Overlay isOpen={isModalOpen} setIsOpen={setIsModalOpen}></Overlay>
    </>
  );
};

export default UsersList;
