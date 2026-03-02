const API_URL = "http://127.0.0.1:8000/api";

export const loginUser = async (correo, contrasena) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contrasena }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return await response.json();
};

export const obtenerMiPerfil = async (usuarioId) => {
  const response = await fetch(`${API_URL}/mi-perfil/${usuarioId}/`);
  return await response.json();
};

export const registerUser = async (data) => {
  const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return await response.json();
};

// Agregar esta función al services.js existente
export const crearPersona = async (data) => {
  const response = await fetch(`${API_URL}/personas/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw err;
  }

  return await response.json();
};

export const crearPerfilAspirante = async (data) => {
  const response = await fetch(`${API_URL}/crear-perfil-aspirante/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw err;
  }

  return await response.json();
};