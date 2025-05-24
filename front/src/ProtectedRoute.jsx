import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthUser from './useAuthUser';

const ProtectedRoute = ({ children, inverse = false, publicRoute = false }) => {
  const { user, loading } = useAuthUser();

  // Mientras carga, no renderiza nada (o puedes poner un loader)
  if (loading) return null;

  // Si es una ruta pública, siempre permite el acceso
  if (publicRoute) {
    return children;
  }

  // Si es ruta inversa (como login) y está autenticado, redirige
  if (inverse && user) {
    return <Navigate to="/" replace />;
  }
  
  // Si es ruta normal protegida y no está autenticado, redirige a login
  if (!inverse && !user && !publicRoute) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;