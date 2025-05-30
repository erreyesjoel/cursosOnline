import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from './useAuthUser';
import api from './services/api';

const Header = () => {
  const { user, loading, setUser } = useAuthUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await api.postData('logout');
  } catch (error) {
    // Ignora errores
  } finally {
    navigate('/');
    window.location.reload(); // <-- Fuerza recarga
  }
};

  return (
    <header className="header">
       <nav className="nav">
    <Link to="/">Inicio</Link>
    <Link to="/cursos">Cursos</Link>
    <Link to="/nosotros">Sobre nosotros</Link>
    <Link to="/contacto">Contacto</Link>

    {!loading && !user && <Link to="/login">Login</Link>}

    {!loading && user && user.is_admin === 1 && (
      <Link to="/admin">Admin Panel</Link>
    )}

    {/* Contenedor separado para saludo y botón */}
    {!loading && user && (
      <div className="user-actions">
        <div className="user-greeting">
          <span>¡Hola, {user.usuario}!</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      </div>
    )}
  </nav>

    </header>
  );
};

export default Header;