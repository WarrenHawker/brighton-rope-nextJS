'use client';

import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    role: 'ADMIN',
  });
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const roleInput = useRef<HTMLSelectElement>(null);

  const handleChange = (field: string, value: string) => {
    if (value.trim() != '') {
      setEmptyFields((prev) => prev.filter((item) => item != field));
    }
    if (field == 'email') {
      setData((prev) => ({ ...prev, email: value }));
    }
    if (field == 'password') {
      setData((prev) => ({ ...prev, password: value }));
    }
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    // e.preventDefault();
    const newEmptyFields = [];
    //check if email field is empty
    if (validator.isEmpty(data.email)) {
      newEmptyFields.push('email');
    }
    //check if password field is empty
    if (validator.isEmpty(data.password)) {
      newEmptyFields.push('password');
    }
    //show error if any empty fields
    if (newEmptyFields.length > 0) {
      setEmptyFields(newEmptyFields);
      setError('Please fill in all required fields');
      return;
    }

    //show error if email is invalid
    if (!validator.isEmail(data.email)) {
      setError('Email is invalid');
      return;
    }

    //show error if password isn't strong
    if (!validator.isStrongPassword(data.password)) {
      setError(
        'passwords need to be at least 8 characters long and contain at least 1 symbol and 1 upper case letter'
      );
      return;
    }

    //send POST request to server
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      return;
    }
    setEmptyFields([]);
    setData({ email: '', password: '', role: 'ADMIN' });
    emailInput.current!.value = '';
    passwordInput.current!.value = '';
    roleInput.current!.value = 'ADMIN';
    setError(null);
    toast.success('New user created');
  };

  return (
    <>
      <Toaster />
      <h2>Register New User</h2>
      <form className="login-form">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          ref={emailInput}
          className={emptyFields.includes('email') ? 'invalid' : ''}
          name="email"
          type="email"
          defaultValue={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <label htmlFor="new-password">
          Password <span className="required">*</span>
        </label>
        <input
          ref={passwordInput}
          className={emptyFields.includes('password') ? 'invalid' : ''}
          name="new-password"
          type="password"
          id="new-password"
          autoComplete="new-password"
          defaultValue={data.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        <label htmlFor="role">Role</label>
        <select
          ref={roleInput}
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
        {error ? <p className="error">{error}</p> : null}
        <button
          type="button"
          onClick={handleFormSubmit}
          className="btn btn-large"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
