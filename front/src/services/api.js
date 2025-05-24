const API_URL = import.meta.env.VITE_API_URL;

const getData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error("Error en GET:", error);
    throw error;
  }
};

const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error("Error en POST:", error);
    throw error;
  }
};

const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error("Error en PUT:", error);
    throw error;
  }
};

const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error en DELETE:", error);
    throw error;
  }
};

export default { getData, postData, putData, deleteData }; // Exportamos todo en un objeto
