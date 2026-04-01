// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthService, type UserProfile, tokenStore } from '../../services/Auth/auth.service';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = tokenStore.get();
    if (!token) {
      setUser(null);
      return false;
    }

    try {
      const userData = await AuthService.getMe();
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      tokenStore.clear();
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  const login = (token: string, userData: UserProfile) => {
    tokenStore.set(token);
    setUser(userData);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
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