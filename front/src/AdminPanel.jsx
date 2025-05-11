import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoEditando, setCursoEditando] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    duracion: '',
    imagen_url: ''
  });
  const navigate = useNavigate();

  // Verificar si el usuario es admin
 useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || !userData.is_admin) {  // Si is_admin no existe, redirige
    navigate('/');
  }
}, [navigate]);

  // Obtener todos los cursos
  const fetchCursos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8001/api/admin/cursos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Crear o actualizar curso
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = cursoEditando 
      ? `http://127.0.0.1:8001/api/admin/cursos/${cursoEditando.id}`
      : 'http://127.0.0.1:8001/api/admin/cursos';
    const method = cursoEditando ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCursos(); // Actualizar lista
        setFormData({ titulo: '', descripcion: '', duracion: '', imagen_url: '' });
        setCursoEditando(null); // Limpiar edición
      }
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    }
  };

  // Eliminar curso
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8001/api/admin/cursos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          fetchCursos(); // Actualizar lista
        }
      } catch (error) {
        console.error('Error al eliminar el curso:', error);
      }
    }
  };

  // Editar curso (cargar datos en el formulario)
  const handleEdit = (curso) => {
    setCursoEditando(curso);
    setFormData({
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      duracion: curso.duracion,
      imagen_url: curso.imagen_url || ''
    });
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      
      {/* Formulario para crear/editar */}
      <form onSubmit={handleSubmit} className="curso-form">
        <h3>{cursoEditando ? 'Editar Curso' : 'Crear Nuevo Curso'}</h3>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
          placeholder="Duración (ej: 2 horas)"
          required
        />
        <input
          type="text"
          name="imagen_url"
          value={formData.imagen_url}
          onChange={handleChange}
          placeholder="URL de la imagen (opcional)"
        />
        <button type="submit">
          {cursoEditando ? 'Actualizar' : 'Crear'}
        </button>
        {cursoEditando && (
          <button type="button" onClick={() => setCursoEditando(null)}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de cursos con acciones */}
      <div className="cursos-list">
        <h3>Cursos Existentes</h3>
        <ul>
          {cursos.map((curso) => (
            <li key={curso.id}>
              <h4>{curso.titulo}</h4>
              <p>{curso.descripcion}</p>
              <div className="actions">
                <button onClick={() => handleEdit(curso)}>Editar</button>
                <button onClick={() => handleDelete(curso.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;