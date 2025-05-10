import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
  <Link to="/">Inicio</Link>
  <Link to="/cursos">Cursos</Link>
  <Link to="/nosotros">Sobre nosotros</Link>
  <Link to="/contacto">Contacto</Link>
  <Link to="/login">Login</Link>
</nav>
    </header>
  );
};

export default Header;
