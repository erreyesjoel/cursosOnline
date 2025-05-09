import React, { useEffect, useState } from 'react';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/cursos')
      .then((response) => response.json())
      .then((data) => {
        console.log('Cursos obtenidos:', data);  // Ver los datos en la consola, depuracion vamos
        setCursos(data);
      })
      .catch((error) => console.error('Error al cargar los cursos:', error));
  }, []);

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
          style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
        />
      )}
      <h2>{curso.titulo}</h2>
      <p>{curso.descripcion}</p>
      <p><strong>Duración:</strong> {curso.duracion}</p>
    </div>
  ))
) : (
  <p>No se encontraron cursos.</p>
)}

      </div>
    </div>
  );
};

export default Cursos;
