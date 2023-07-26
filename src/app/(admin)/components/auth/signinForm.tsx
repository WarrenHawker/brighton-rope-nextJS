'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useRef, useEffect } from 'react';

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    //attempt to sign in with email and password
    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    console.log(res);

    //if response contains a url link, redirect to that link
    if (res?.url) {
      router.push(res?.url);
    }

    //show error if credentials are incorrect
    if (res?.error == 'CredentialsSignin') {
      setError('Invalid email or password');
      emailInput.current!.value = '';
      passwordInput.current!.value = '';
      return;
    }

    //show error if unknown
    if (res?.error) {
      setError('unknown error, please contact Super Admin');
      emailInput.current!.value = '';
      passwordInput.current!.value = '';
      return;
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="login-form">
        <h1 className="page-title">Sign in to access admin area</h1>
        <label htmlFor="email">Email</label>
        <input
          ref={emailInput}
          name="email"
          type="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordInput}
          name="password"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-large">
          Sign In
        </button>
        {error ? <p className="error">{error}</p> : null}
      </form>
    </>
  );
};

export default SigninForm;
