import React from 'react';
import './notificaciones.css';

const Notificaciones = ({ notificacion }) => {
  if (!notificacion) return null;
  return (
    <div className={`notification ${notificacion.tipo}`}>
      {notificacion.mensaje}
    </div>
  );
};

export default Notificaciones;