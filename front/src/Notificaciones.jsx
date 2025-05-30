import React, { useEffect, useState } from 'react';
import './notificaciones.css';

const Notificaciones = ({ notificacion }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (notificacion) {
      setFade(false);
      const timer = setTimeout(() => setFade(true), 2000); // Empieza a desvanecer después de 2s
      return () => clearTimeout(timer);
    }
  }, [notificacion]);

  if (!notificacion) return null;
  return (
    <div className={`notification ${notificacion.tipo}${fade ? ' fade-out' : ''}`}>
      {notificacion.mensaje}
    </div>
  );
};

export default Notificaciones;