"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

type AuthStateTypes = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
};
const defaultContextValues: AuthStateTypes = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<AuthStateTypes>(defaultContextValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  console.log(isLoggedIn, "isLoggedIn");
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
