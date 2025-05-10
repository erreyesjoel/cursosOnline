import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    confirmPassword: '', 
    nombre: '',
    apellido: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (esRegistro) {
      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      console.log('Datos de registro:', {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password
      });
      // Lógica para registrar al usuario
    } else {
      console.log('Datos de login:', { 
        usuario: formData.usuario, 
        password: formData.password 
      });
      // Lógica para loguear al usuario
    }
  };

  const toggleModo = () => {
    setEsRegistro(!esRegistro);
    setError('');
    // Limpiar campos al cambiar de modo
    setFormData({
      usuario: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellido: '',
      email: ''
    });
  };

  return (
    <div className="login-container">
      <h2>{esRegistro ? 'Regístrate' : 'Iniciar sesión'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
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
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
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
            placeholder="Contraseña"
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
        
        <button type="submit" className="submit-btn">
          {esRegistro ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>
      
      <p className="toggle-text">
        {esRegistro ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
        <button type="button" onClick={toggleModo} className="toggle-btn">
          {esRegistro ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  );
};

export default Login;