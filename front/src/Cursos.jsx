import React, { useEffect, useState } from 'react';
import api from './services/api';
import useAuthUser from './useAuthUser'; // Asegúrate de importar tu hook
import Notificaciones from './Notificaciones';
import './cursos.css'; // Asegúrate de tener un archivo CSS para los estilos de los cursos

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  const { user, loading } = useAuthUser();

  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const data = await api.getData('cursos');
        setCursos(data);
      } catch (error) {
        setNotificacion({ tipo: 'error', mensaje: 'Error al cargar los cursos' });
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

  // Manejar el intento de empezar el curso
  const handleEmpezarCurso = () => {
    if (loading) return;
    if (user) {
      setNotificacion({ tipo: 'success', mensaje: `¡Has empezado el curso "${cursoSeleccionado.titulo}"!` });
      // Aquí podrías redirigir o guardar el progreso, etc.
    } else {
      setNotificacion({ tipo: 'error', mensaje: 'Debes iniciar sesión para empezar el curso.' });
    }
  };

  return (
    <div>
      <Notificaciones notificacion={notificacion} />
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
            {/* Pregunta y botón para empezar el curso */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p>¿Quieres empezar este curso?</p>
              <button 
                className="ver-mas-btn"
                onClick={handleEmpezarCurso}
                style={{ marginTop: '0.5rem' }}
              >
                Empezar curso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cursos;