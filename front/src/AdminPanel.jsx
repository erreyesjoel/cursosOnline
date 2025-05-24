import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from './useAuthUser';

const AdminPanel = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoEditando, setCursoEditando] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    duracion: '',
    imagen_url: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cursoAEliminar, setCursoAEliminar] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  // Verificar si el usuario es admin
  useEffect(() => {
    if (!loading && (!user || !user.is_admin)) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Obtener todos los cursos
  const fetchCursos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8001/api/admin/cursos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al cargar cursos');
      }

      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
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
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCursos();
        resetForm();
      }
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      duracion: '',
      imagen_url: ''
    });
    setCursoEditando(null);
  };

  // Mostrar modal de confirmación para eliminar
  const confirmDelete = (id) => {
    setCursoAEliminar(id);
    setShowDeleteModal(true);
  };

  // Eliminar curso confirmado
  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8001/api/admin/cursos/${cursoAEliminar}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        fetchCursos();
      }
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    } finally {
      setShowDeleteModal(false);
      setCursoAEliminar(null);
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
        <h3>{cursoEditando ? `Editando: ${cursoEditando.titulo}` : 'Crear Nuevo Curso'}</h3>
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
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {cursoEditando ? 'Actualizar' : 'Crear'}
          </button>
          {(cursoEditando || formData.titulo) && (
            <button type="button" onClick={resetForm} className="cancel-btn">
              {cursoEditando ? 'Cancelar Edición' : 'Limpiar Formulario'}
            </button>
          )}
        </div>
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
                <button onClick={() => handleEdit(curso)} className="edit-btn">Editar</button>
                <button onClick={() => confirmDelete(curso.id)} className="delete-btn">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                Cancelar
              </button>
              <button onClick={handleDeleteConfirmed} className="confirm-delete-btn">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;