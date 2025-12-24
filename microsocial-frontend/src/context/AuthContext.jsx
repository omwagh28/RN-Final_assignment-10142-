// Path: src/context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "../utils/storage";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on app start
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();

      if (storedToken) {
        setToken(storedToken);
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
      }

      setLoading(false);
    };

    loadToken();
  }, []);

  const login = async (newToken) => {
    await saveToken(newToken);
    setToken(newToken);

    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
