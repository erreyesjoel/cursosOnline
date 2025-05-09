import React from 'react';
import './Header.css'; // Asegúrate de tener este archivo

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#">Inicio</a>
        <a href="#">Cursos</a>
        <a href="#">Sobre nosotros</a>
        <a href="#">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
