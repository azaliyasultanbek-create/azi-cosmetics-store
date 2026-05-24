import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Failed to restore auth session:", err);
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error("Email and password are required"));
          return;
        }
        if (password.length < 4) {
          reject(new Error("Password must be at least 4 characters"));
          return;
        }
        const userData = {
          id: 1,
          email,
          name: email.split("@")[0] || "User",
          role: "customer",
        };
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
        resolve(userData);
      }, 500);
    });
  }, []);

  const register = useCallback(async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error("All fields are required"));
          return;
        }
        const userData = {
          id: Date.now(),
          email,
          name,
          role: "customer",
        };
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
        resolve(userData);
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
