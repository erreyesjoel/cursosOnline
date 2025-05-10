import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, inverse = false, publicRoute = false }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = !!userData;

  // Si es una ruta pública, siempre permite el acceso
  if (publicRoute) {
    return children;
  }

  // Si es ruta inversa (como login) y está autenticado, redirige
  if (inverse && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Si es ruta normal protegida y no está autenticado, redirige a login
  if (!inverse && !isAuthenticated && !publicRoute) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;