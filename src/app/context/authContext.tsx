"use client"
import React, { createContext, ReactNode, useState } from 'react';

interface AuthContextType {
  handleRegister: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean | string>;
  handleLogin: (email: string, password: string, rememberMe: boolean) => Promise<boolean | string>;
  handleLogout: () => void;
  isAuthenticated: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

 function AuthProvider  ({ children }: { children: ReactNode }) {
  const handleRegister = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean | string> => {
    try {
      const user = { firstName, lastName, email, password };
      const registerUrl = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Auth/Register';
      const result = await fetch(registerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
      });

      return result.status === 201 ? true : 'Registration failed';
    } catch (error) {
      return `Registration error: ${error}`;
    }
  };

  const handleLogin = async (email: string, password: string, rememberMe: boolean): Promise<boolean | string> => {
    try {
      const user = { email, password, rememberMe };
      const loginUrl = 'https://localhost:7279/api/Auth/Login';
      const result = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (result.status === 200) {
        const accessToken = await result.text();
        localStorage.setItem('accessToken', accessToken);
        return true;
      } else {
        return 'Login failed';
      }
    } catch (error) {
      return `Login error: ${error}`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const authUrl = 'https://your-domain.com/auth';
      const result = await fetch(authUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      });
      return result.ok;
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ handleRegister, handleLogin, handleLogout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
