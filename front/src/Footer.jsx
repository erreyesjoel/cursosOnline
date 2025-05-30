import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
  <footer className="footer">
  <div className="footer-content">
    <p className="footerText">
      © 2025 CursosOnline. Todos los derechos reservados.<br />
      Created by{' '}
      <a
        href="https://portafoli-joel-erreyes-773469.gitlab.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        Joel Erreyes
      </a>
    </p>
  </div>
</footer>
  );
};

export default Footer;
