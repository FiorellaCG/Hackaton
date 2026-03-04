const API_URL = "http://127.0.0.1:8000/api";

export const obtenerEmpresas = async () => {
  const response = await fetch(`${API_URL}/empresas/`);
  if (!response.ok) throw new Error("Error al obtener empresas");
  return await response.json();
};

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
  const isFormData = data instanceof FormData;
  const options = {
    method: "POST",
    body: isFormData ? data : JSON.stringify(data),
  };

  if (!isFormData) {
    options.headers = { "Content-Type": "application/json" };
  }

  const response = await fetch(`${API_URL}/crear-perfil-aspirante/`, options);

  if (!response.ok) {
    const err = await response.json();
    throw err;
  }

  return await response.json();
};

export const obtenerCarreras = async () => {
  const response = await fetch(`${API_URL}/carreras/`);
  if (!response.ok) {
    throw new Error("Error al obtener las carreras");
  }
  return await response.json();
};

export const enviarCredenciales = async (data) => {
  const response = await fetch(`${API_URL}/enviar-credenciales/`, {
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

export const obtenerAreasTrabajo = async () => {
  const response = await fetch(`${API_URL}/areas-trabajo/`);
  if (!response.ok) {
    throw new Error("Error al obtener áreas de trabajo");
  }
  return await response.json();
};

export const crearCarrera = async (data) => {
  const response = await fetch(`${API_URL}/carreras/`, {
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

export const crearPerfilEmpresa = async (data) => {
  const response = await fetch(`${API_URL}/crear-perfil-empresa/`, {
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

export const actualizarPreferencias = async (usuarioId, preferencias) => {
  const response = await fetch(`${API_URL}/usuarios/${usuarioId}/preferencias/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preferencias }),
  });
  return await response.json();
};

export const cambiarPassword = async (usuarioId, currentPassword, newPassword) => {
  const response = await fetch(`${API_URL}/usuarios/${usuarioId}/cambiar-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
};

export const eliminarCuenta = async (usuarioId) => {
  const response = await fetch(`${API_URL}/usuarios/${usuarioId}/eliminar-cuenta/`, {
    method: "DELETE",
  });
  return await response.json();
};

// --- SERVICIOS DE ADMINISTRACIÓN ---

export const obtenerUsuarios = async () => {
  const response = await fetch(`${API_URL}/usuarios/`);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return await response.json();
};

export const obtenerEstadisticasGeneral = async () => {
  const response = await fetch(`${API_URL}/usuarios/stats/`);
  if (!response.ok) throw new Error("Error al obtener métricas");
  return await response.json();
};

export const actualizarEstadoUsuario = async (usuarioId, data) => {
  const response = await fetch(`${API_URL}/usuarios/${usuarioId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar usuario");
  return await response.json();
};

export const obtenerVacantesAdmin = async () => {
  const response = await fetch(`${API_URL}/vacantes/`);
  if (!response.ok) throw new Error("Error al obtener vacantes");
  return await response.json();
};

export const obtenerProgramas = async () => {
  const response = await fetch(`${API_URL}/programas-formacion/`);
  if (!response.ok) throw new Error("Error al obtener programas");
  return await response.json();
};

export const obtenerCapacitaciones = async () => {
  const response = await fetch(`${API_URL}/capacitaciones/`);
  if (!response.ok) throw new Error("Error al obtener capacitaciones");
  return await response.json();
};

export const crearCapacitacion = async (data) => {
  const response = await fetch(`${API_URL}/capacitaciones/`, {
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

export const toggleFavorito = async (aspiranteId, vacanteId = null, capacitacionId = null) => {
  const response = await fetch(`${API_URL}/favoritos/toggle/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      aspirante_id: aspiranteId,
      vacante_id: vacanteId,
      capacitacion_id: capacitacionId
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw err;
  }
  return await response.json();
};

export const inscribirCapacitacion = async (aspiranteId, capacitacionId) => {
  const response = await fetch(`${API_URL}/inscripciones-capacitacion/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      aspirante: aspiranteId,
      capacitacion: capacitacionId
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw err;
  }
  return await response.json();
};
