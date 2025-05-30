import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from './useAuthUser';
import api from './services/api'; // Importar api js
import Notificaciones from './Notificaciones';

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
  const [notificacion, setNotificacion] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();

  // Mostrar notificación
  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({ tipo, mensaje });
    setTimeout(() => setNotificacion(null), 5000);
  };

  // Verificar si el usuario es admin
  useEffect(() => {
    if (!loading && (!user || !user.is_admin)) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Obtener todos los cursos
   const fetchCursos = async () => {
    try {
      const data = await api.getData('admin/cursos');
      setCursos(data);
    } catch (error) {
      console.error('Error:', error);
      mostrarNotificacion('error', error.message);
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
    const endpoint = cursoEditando
      ? `admin/cursos/${cursoEditando.id}`
      : 'admin/cursos';
    const method = cursoEditando ? 'putData' : 'postData';

    try {
      const data = await api[method](endpoint, formData);

      fetchCursos();
      resetForm();
      mostrarNotificacion('success',
        cursoEditando
          ? `Curso "${formData.titulo}" actualizado correctamente`
          : `Curso "${formData.titulo}" creado correctamente`
      );
    } catch (error) {
      console.error('Error:', error);
      mostrarNotificacion('error', error.message);
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
  const confirmDelete = (curso) => {
    setCursoAEliminar({
      id: curso.id,
      curso: curso // Guardamos el objeto completo para mostrar el nombre
    });
    setShowDeleteModal(true);
  };

  // Eliminar curso confirmado
 const handleDeleteConfirmed = async () => {
    try {
      await api.deleteData(`admin/cursos/${cursoAEliminar.id}`);
      fetchCursos();
      mostrarNotificacion('success', 'Curso eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      mostrarNotificacion('error', error.message);
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
      
      {/* Notificación */}
      <Notificaciones notificacion={notificacion} />
      
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
          placeholder="Duración (ej: 2:00)"
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
                <button onClick={() => confirmDelete(curso)} className="delete-btn">Eliminar</button>
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
      <p>¿Estás seguro de que deseas eliminar el curso <strong>"{cursoAEliminar?.curso?.titulo}"</strong>? Esta acción no se puede deshacer.</p>
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