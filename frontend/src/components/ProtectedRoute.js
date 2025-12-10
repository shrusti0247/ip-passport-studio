// frontend/src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  // If no token → block access
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // User authenticated → allow access
  return children;
}

export default ProtectedRoute;
