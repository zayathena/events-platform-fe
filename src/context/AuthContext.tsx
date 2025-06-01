import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/auth';

interface User {
  id: number;
  email: string;
  firstName?: string;
  role: string;
}

const AuthContext = createContext<{
  user: User | null;
  login: (userData: User | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User | null) => {
    setUser(userData);
  };

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};