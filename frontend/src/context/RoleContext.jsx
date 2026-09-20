import React, { createContext, useContext, useState, useCallback } from 'react';
import { getRoleProfile } from '../config/roleConfig';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState(() => {
    try {
      const saved = localStorage.getItem('krishiflow_role');
      return saved === 'farmer' ? 'farmer' : 'buyer';
    } catch {
      return 'buyer';
    }
  });

  const setRole = useCallback((role) => {
    const nextRole = role === 'farmer' ? 'farmer' : 'buyer';
    setCurrentRoleState(nextRole);
    try {
      localStorage.setItem('krishiflow_role', nextRole);
    } catch {
      // ignore
    }
  }, []);

  const currentUser = getRoleProfile(currentRole);
  const isFarmer = currentRole === 'farmer';
  const isBuyer = currentRole === 'buyer';

  return (
    <RoleContext.Provider value={{ currentRole, setRole, currentUser, isFarmer, isBuyer }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
