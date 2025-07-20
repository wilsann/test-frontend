import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../services/authService";

function ProtectedRoute({ children, allowedRoles = ["admin", "user"] }) {
  const token = isAuthenticated();
  const role = isAdmin() ? "admin" : "user";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/user" replace />;
  }

  return children;
}

export default ProtectedRoute;