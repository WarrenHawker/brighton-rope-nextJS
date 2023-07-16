import { createContext, useContext, useState } from 'react';
import { ContextProviderProps, User } from '../lib/interfaces';

interface UseAuthProps {
  user: User;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext) as UseAuthProps;

export const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User>({ id: null, name: null });

  const loginUser = (email: string, password: string) => {
    if (email == 'hawker.warren@gmail.com') {
      setUser({ id: '1', name: 'Warren' });
    } else setUser({ id: null, name: null });
  };

  const logoutUser = () => {
    setUser({ id: null, name: null });
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
