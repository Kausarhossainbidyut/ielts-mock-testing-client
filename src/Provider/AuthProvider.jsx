import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const createUser = async (userData) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/auth/register`, userData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) setUser(res.data.user);
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMsg);
      throw err.response?.data || err;
    }
  };

  const signIn = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/auth/login`, { email, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) setUser(res.data.user);
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMsg);
      throw err.response?.data || err;
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
      if (res.data.success) setUser(res.data.user);
      return res.data.user;
    } catch {
      setUser(null);
    }
  };

  const logOut = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch {
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try { await getCurrentUser(); } 
      catch { setUser(null); } 
      finally { setLoading(false); }
    };
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    error,
    createUser,
    signIn,
    logOut,
    getCurrentUser,
    updateUser,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
