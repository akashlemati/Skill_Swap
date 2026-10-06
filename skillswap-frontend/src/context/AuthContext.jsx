import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("skillswap_user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Failed to parse saved user:", error);
      localStorage.removeItem("skillswap_user");
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("skillswap_token");
    return Boolean(token);
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem("skillswap_user", JSON.stringify(user));
      localStorage.setItem("skillswap_auth", "true");
    }
  }, [user, isAuthenticated]);

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid login response from server.");
      }

      localStorage.setItem("skillswap_token", token);
      localStorage.setItem("skillswap_user", JSON.stringify(user));
      localStorage.setItem("skillswap_auth", "true");

      setUser(user);
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      throw error;
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid registration response from server.");
      }

      localStorage.setItem("skillswap_token", token);
      localStorage.setItem("skillswap_user", JSON.stringify(user));
      localStorage.setItem("skillswap_auth", "true");

      setUser(user);
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("skillswap_token");
    localStorage.removeItem("skillswap_user");
    localStorage.removeItem("skillswap_auth");
  };

  // =========================
  // UPDATE USER PROFILE
  // =========================
  const updateUserProfile = (updatedData) => {
    setUser((previousUser) => {
      const updatedUser = {
        ...previousUser,
        ...updatedData,
      };

      localStorage.setItem("skillswap_user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
