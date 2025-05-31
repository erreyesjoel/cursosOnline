import React from 'react';
import './paginacion.css'; // import de paginacion.css
const Paginacion = ({ paginaActual, totalPaginas, onPageChange }) => {
  if (totalPaginas <= 1) return null;

  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <div className="paginacion">
      <button onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1} > Anterior </button>

      {paginas.map((num) => (
        <button key={num} onClick={() => onPageChange(num)}
          className={paginaActual === num ? 'activa' : ''}>
          {num}
        </button>
      ))}
      <button
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;