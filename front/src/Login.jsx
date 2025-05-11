import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    confirmPassword: '', 
    nombre: '',
    apellido: '',
    correo: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (esRegistro) {
        // Validaciones frontend
        if (!formData.usuario.trim()) {
          throw new Error('El nombre de usuario es requerido');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }

        // Llamada a la API de registro
        const response = await fetch('http://127.0.0.1:8001/api/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            usuario: formData.usuario,
            correo: formData.correo,
            password: formData.password,
            password_confirmation: formData.confirmPassword
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.errors 
              ? Object.entries(data.errors).map(([key, value]) => `${key}: ${value}`).join(', ')
              : data.message || 'Error en el registro'
          );
        }

        setSuccessMessage('Registro exitoso! Redirigiendo...');
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => navigate('/'), 1500);
        
      } else {
        // Validación login
        if (!formData.usuario.trim() || !formData.password) {
          throw new Error('Usuario y contraseña son requeridos');
        }

        // Llamada a la API de login
        const response = await fetch('http://127.0.0.1:8001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario: formData.usuario,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Credenciales incorrectas');
        }

        setSuccessMessage('Inicio de sesión exitoso! Redirigiendo...');
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify({
    ...data.user,  // Asegúrate de que data.user incluya is_admin
    is_admin: data.user.is_admin || false  // Valor por defecto si no existe
  }));        
        // Redirigir después de 1.5 segundos
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModo = () => {
    setEsRegistro(!esRegistro);
    setError('');
    setSuccessMessage('');
    setFormData({
      usuario: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellido: '',
      correo: ''
    });
  };

  return (
    <div className="login-container">
      <h2>{esRegistro ? 'Regístrate' : 'Iniciar sesión'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        {esRegistro ? (
          <>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="usuario"
                placeholder="Nombre de usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <div className="form-group">
            <input
              type="text"
              name="usuario"
              placeholder="Nombre de usuario o correo"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        
        {esRegistro && (
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
        )}
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : esRegistro ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>
      
      <p className="toggle-text">
        {esRegistro ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
        <button 
          type="button" 
          onClick={toggleModo} 
          className="toggle-btn"
          disabled={isLoading}
        >
          {esRegistro ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  );
};

export default Login;