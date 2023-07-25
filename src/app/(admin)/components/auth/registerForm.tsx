'use client';

import { useState } from 'react';

const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', role: 'ADMIN' });

  return (
    <>
      <h2>Register New User</h2>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          defaultValue={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          defaultValue={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <label htmlFor="role">Role</label>
        <select
          defaultValue={data.role}
          id="role"
          name="role"
          onChange={(e) =>
            setData((prev) => ({ ...prev, role: e.target.value }))
          }
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
        <button className="btn btn-large">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
