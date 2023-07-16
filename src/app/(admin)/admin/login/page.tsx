'use client';

import { FormEvent, useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={submitForm} className="login-form">
        <h1 className="page-title">Login to access admin area</h1>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-large">
          Login
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
