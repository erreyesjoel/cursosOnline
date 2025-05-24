import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useAuthUser from './useAuthUser';

const Header = () => {
  const { user, loading } = useAuthUser();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/nosotros">Sobre nosotros</Link>
        <Link to="/contacto">Contacto</Link>
        
        {/* Mostrar Login solo si NO hay usuario y no está cargando */}
        {!loading && !user && <Link to="/login">Login</Link>}
        
     {/* Mostrar Admin Panel solo si el usuario es admin
     pongo el 1, porque es un booleano, y para que no salga 0, si no es admin */}
        {!loading && user && user.is_admin === 1 && (
          <Link to="/admin">Admin Panel</Link>
        )}        
        {/* Saludo en la parte inferior */}
        {!loading && user && (
          <div className="user-greeting">
            <span>¡Hola, {user.usuario}!</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;