import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { currentUser } from '../data/mockUser';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  saveScholarship: (scholarshipId: string) => void;
  unsaveScholarship: (scholarshipId: string) => void;
  addAppliedScholarship: (scholarshipId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(currentUser); // Pre-populated for demo
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for demo

  const login = async (email: string, password: string) => {
    // This would typically call an API endpoint
    // For demo, we're just setting the mock user
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const saveScholarship = (scholarshipId: string) => {
    if (!user) return;
    
    if (!user.savedScholarships.includes(scholarshipId)) {
      setUser({
        ...user,
        savedScholarships: [...user.savedScholarships, scholarshipId]
      });
    }
  };

  const unsaveScholarship = (scholarshipId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      savedScholarships: user.savedScholarships.filter(id => id !== scholarshipId)
    });
  };

  const addAppliedScholarship = (scholarshipId: string) => {
    if (!user) return;
    
    if (!user.appliedScholarships.includes(scholarshipId)) {
      setUser({
        ...user,
        appliedScholarships: [...user.appliedScholarships, scholarshipId]
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      saveScholarship, 
      unsaveScholarship,
      addAppliedScholarship
    }}>
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