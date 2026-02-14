import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Function to register a new user
  const createUser = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        // Set user data after successful registration
        setUser(response.data.user);
        return response.data;
      }
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Function to login user
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return response.data;
      }
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Function to get current user
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      setUser(null);
    }
  };

  // Function to logout user
  const logOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Try to get current user to check if session exists
        await getCurrentUser();
      } catch (error) {
        console.error('No active session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;