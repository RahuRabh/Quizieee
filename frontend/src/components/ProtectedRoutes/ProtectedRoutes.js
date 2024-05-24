import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ Component }) {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <Component /> : <Navigate to="/auth" />;
}
