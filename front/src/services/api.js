const API_URL = import.meta.env.VITE_API_URL; // http://127.0.0.1:8001
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // http://127.0.0.1:8001/api

// Función robusta para parsear JSON solo si la respuesta es JSON
const parseJSON = async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  // Si no es JSON, probablemente es HTML de error
  const text = await response.text();
  throw new Error(text.slice(0, 200) || 'Respuesta inesperada del servidor');
};

const getData = async (endpoint) => {
  try {
    console.log('GET:', `${API_BASE_URL}/${endpoint}`); // <-- Añade esto
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      credentials: 'include'
    });
    return await parseJSON(response);
  } catch (error) {
    console.error("Error en GET:", error);
    throw error;
  }
};

const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return await parseJSON(response);
  } catch (error) {
    console.error("Error en POST:", error);
    throw error;
  }
};

const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return await parseJSON(response);
  } catch (error) {
    console.error("Error en PUT:", error);
    throw error;
  }
};
const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      credentials: 'include'
    });
    return await parseJSON(response);
  } catch (error) {
    console.error("Error en DELETE:", error);
    throw error;
  }
};

const getCSRF = async () => {
  try {
    const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('No se pudo obtener el CSRF cookie');
    }
    return true;
  } catch (error) {
    console.error("Error obteniendo CSRF cookie:", error);
    throw error;
  }
};



export default { getData, postData, putData, deleteData, getCSRF };