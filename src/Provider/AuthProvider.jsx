import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) setUser(res.data.user);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) setUser(res.data.user);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true });
      if (res.data.success) setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      // 401 is expected when no session exists - silently handle it
      if (error.response?.status === 401) {
        // No active session, this is normal
        setUser(null);
        return null;
      }
      // For other errors, still set user to null but don't log
      setUser(null);
      return null;
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (_) {
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if user has an active session on app load
      await getCurrentUser();
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, createUser, signIn, logOut, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }
