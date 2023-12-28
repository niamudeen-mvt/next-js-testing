"use client";

import { clearStorage, getFromStorage } from "@/utils/helper";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
    clearStorage();
  };

  const storedUserId = getFromStorage("userId");
  useEffect(() => {
    if (storedUserId) return setIsLoggedIn(true);
    return setIsLoggedIn(false);
  }, [storedUserId]);

  const updateAuthStatus = () => {
    if (storedUserId) return setIsLoggedIn(true);
    return setIsLoggedIn(false);
  };

  useEffect(() => {
    updateAuthStatus();
    window.addEventListener("storage", updateAuthStatus);

    return () => {
      window.removeEventListener("storage", updateAuthStatus);
    };
  }, []);

  console.log(isLoggedIn, "isLoggedIn");

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
