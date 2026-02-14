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
      setUser(null);
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try { await getCurrentUser(); } 
      catch { setUser(null); } 
      finally { setLoading(false); }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, createUser, signIn, logOut, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
