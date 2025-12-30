import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authed = !!localStorage.getItem("auth_demo"); // set in Login.jsx
  return authed ? children : <Navigate to="/login" replace />;
}
