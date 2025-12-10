// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse auth from localStorage", err);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => loadAuthFromStorage());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(auth?.token);

  useEffect(() => {
    // keep localStorage in sync
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const value = {
    auth,
    setAuth,
    isAuthenticated,
    loading,
    setLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
