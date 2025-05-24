import React, { useEffect, useState } from 'react';
import api from './services/api'; // Asegúrate de que este archivo exista y esté configurado correctamente

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

useEffect(() => {
  const obtenerCursos = async () => {
    try {
      const data = await api.getData('cursos'); // Usamos la función dentro del objeto api
      console.log('Cursos obtenidos:', data);
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
    }
  };

  obtenerCursos();
}, []);

  const abrirModal = (curso) => {
    setCursoSeleccionado(curso);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <div>
      <h1>Cursos</h1>
      <div className="cursos-container">
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <div key={curso.id} className="curso-card">
              {curso.imagen_url && (
                <img 
                  src={curso.imagen_url} 
                  alt={`Imagen del curso ${curso.titulo}`} 
                  className="curso-imagen"
                />
              )}
              <div className="curso-contenido">
                <h2>{curso.titulo}</h2>
                <p><strong>Duración:</strong> {curso.duracion}</p>
                <button 
                  className="ver-mas-btn"
                  onClick={() => abrirModal(curso)}
                >
                  Ver más detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron cursos.</p>
        )}
      </div>

      {modalAbierto && cursoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={cerrarModal}>
              &times;
            </button>
            <h2>{cursoSeleccionado.titulo}</h2>
            {cursoSeleccionado.imagen_url && (
              <img 
                src={cursoSeleccionado.imagen_url} 
                alt={`Imagen del curso ${cursoSeleccionado.titulo}`} 
                className="modal-imagen"
              />
            )}
            <div className="modal-detalles">
              <p><strong>Descripción completa:</strong></p>
              <p>{cursoSeleccionado.descripcion}</p>
              <p><strong>Duración:</strong> {cursoSeleccionado.duracion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cursos;
