import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    // Si el usuario no está autenticado, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, permite el acceso a la ruta
  return <Outlet />;
};

export default ProtectedRoute;
