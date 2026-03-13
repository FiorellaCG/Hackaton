import { API_URL } from "./apiConfig";

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
export const actualizarEstadoVacante = async (vacanteId, data) => {
    const response = await fetch(`${API_URL}/vacantes/${vacanteId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar vacante");
    return await response.json();
};

export const eliminarVacante = async (vacanteId) => {
    const response = await fetch(`${API_URL}/vacantes/${vacanteId}/`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar vacante");
    return true;
};
