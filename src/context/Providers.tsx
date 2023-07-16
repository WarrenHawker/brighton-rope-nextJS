'use client';

import { ContextProviderProps } from '@/lib/interfaces';
import { AuthContextProvider } from './AuthContext';
import { EventsContextProvider } from './EventsContext';

export const Providers = ({ children }: ContextProviderProps) => {
  return (
    <AuthContextProvider>
      <EventsContextProvider>{children}</EventsContextProvider>
    </AuthContextProvider>
  );
};
