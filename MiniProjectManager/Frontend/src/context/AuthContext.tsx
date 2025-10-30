import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse, User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (token && username && email) {
      setUser({ username, email });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response: AuthResponse = await api.login({ email, password });
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    setUser({ username: response.username, email: response.email });
    setIsAuthenticated(true);
  };

  const register = async (username: string, email: string, password: string) => {
    const response: AuthResponse = await api.register({ username, email, password });
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    setUser({ username: response.username, email: response.email });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
