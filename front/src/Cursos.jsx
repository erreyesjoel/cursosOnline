import React, { useEffect, useState } from 'react';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8001/api/cursos');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log('Cursos obtenidos:', data); // depuración
        setCursos(data);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      }
    };

    obtenerCursos();
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <div className="cursos-container">
        {cursos.length > 0 ? (
          cursos.map((curso) => (  /* 
        "curso" es el nombre de la variable que representa cada objeto individual del array "cursos".
        Podríamos llamarla como quisiéramos (por ejemplo: item, elemento, etc.), siempre y cuando seamos consistentes.
        Luego accedemos a sus propiedades con curso.titulo, curso.descripcion, etc.,
        que corresponden a los campos que vienen desde la API (y están en la base de datos).
    */
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
