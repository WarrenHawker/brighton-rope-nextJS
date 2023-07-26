'use client';

import { ContextProviderProps } from '@/utils/interfaces';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: ContextProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
