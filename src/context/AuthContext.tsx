"use client";

import { useAppDispatch } from "@/store";
import { updateCartCount } from "@/store/feature/cart/cartSlice";
import api from "@/utils/axios";
import { clearStorage, getFromStorage } from "@/utils/helper";
import { useRouter } from "next/navigation";
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      clearStorage();
      let res = await api.delete("/auth/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const userId = getFromStorage("userId");
        if (userId) {
          let res = await api.get(`/cart/products/${userId}`);
          if (res.status === 200) {
            dispatch(updateCartCount(res.data.cart.products.length));
          }
        }
      })();
    }
  }, [isLoggedIn, dispatch]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
