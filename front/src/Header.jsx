import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  // Obtener datos del usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const usuario = userData?.usuario;

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/nosotros">Sobre nosotros</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/login">Login</Link>
        
        {/* Saludo en la parte inferior */}
        {usuario && (
          <div className="user-greeting">
            <span>¡Hola, {usuario}!</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;