'use client';

import useCreateUser from '@/hooks/users/useCreateUser';
import { UserRole } from '@/utils/interfaces';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    role: 'ADMIN' as UserRole,
  });
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const roleInput = useRef<HTMLSelectElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);

  const {mutateAsync: createMutate, status: createStatus} = useCreateUser();

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

    if(createStatus == 'loading') {
      emailInput.current!.disabled = true;
      passwordInput.current!.disabled = true;
      roleInput.current!.disabled = true;
      submitButton.current!.disabled = true;
    }
    //send POST request to server
    try {
      await createMutate({url: '/api/users', userData:data})
      setEmptyFields([]);
      setData({ email: '', password: '', role: 'ADMIN' });
      emailInput.current!.value = '';
      passwordInput.current!.value = '';
      roleInput.current!.value = 'ADMIN';
      setError(null);
      toast.success('New user created');
      return
    } catch (error:any) {
      setError(error.message)
      return
    }
  };

  return (
    <>
      <Toaster />
      <h2>Register New User</h2>
      <form className="login-form" autoComplete='off'>
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          ref={emailInput}
          className={emptyFields.includes('email') ? 'invalid' : ''}
          name="email"
          type="email"
          autoComplete='username'
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
          autoComplete='new-password'
          type="password"
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
            setData((prev) => ({ ...prev, role: e.target.value as UserRole}))
          }
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
        {createStatus == 'loading' && <p className='center'>Creating user...</p>}
        {error ? <p className="error">{error}</p> : null}
        <button
        ref={submitButton}
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
