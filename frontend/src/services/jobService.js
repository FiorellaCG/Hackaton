import { API_URL } from "./apiConfig";
import { obtenerMiPerfil } from "./userService";

export const obtenerVacantes = async () => {
    const response = await fetch(`${API_URL}/vacantes/`);
    if (!response.ok) throw new Error("Error al obtener vacantes");
    return await response.json();
};

export const obtenerEmpresas = async () => {
    const response = await fetch(`${API_URL}/empresas/`);
    if (!response.ok) throw new Error("Error al obtener empresas");
    return await response.json();
};

export const obtenerAreasTrabajo = async () => {
    const response = await fetch(`${API_URL}/areas-trabajo/`);
    if (!response.ok) {
        throw new Error("Error al obtener áreas de trabajo");
    }
    return await response.json();
};

export const postularVacante = async (aspiranteId, vacanteId) => {
    const response = await fetch(`${API_URL}/postulaciones/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            aspirante: aspiranteId,
            vacante: vacanteId,
            estado: "pendiente"
        }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw err;
    }
    return await response.json();
};

export const obtenerEntrevistas = async (usuarioId, rol) => {
    const response = await fetch(`${API_URL}/entrevistas/?usuario_id=${usuarioId}&rol=${rol}`);
    if (!response.ok) throw new Error("Error al obtener entrevistas");
    return await response.json();
};

export const agendarEntrevista = async (data) => {
    const response = await fetch(`${API_URL}/entrevistas/`, {
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

export const actualizarEntrevista = async (id, data) => {
    const response = await fetch(`${API_URL}/entrevistas/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar entrevista");
    return await response.json();
};

export const eliminarEntrevista = async (id) => {
    const response = await fetch(`${API_URL}/entrevistas/${id}/`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar la entrevista");
    return true;
};

export const obtenerPostulacionesEmpresa = async (empresaUsuarioId) => {
    const miPerfil = await obtenerMiPerfil(empresaUsuarioId);
    const empresaId = miPerfil.empresa_id;
    if (!empresaId) return [];
    const response = await fetch(`${API_URL}/postulaciones/`);
    if (!response.ok) throw new Error("Error al obtener postulaciones");
    const allPostulaciones = await response.json();
    return allPostulaciones.filter(p => String(p.vacante_obj?.empresa) === String(empresaId));
};

export const actualizarEstadoPostulacion = async (id, estado) => {
    const response = await fetch(`${API_URL}/postulaciones/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
    });
    if (!response.ok) throw new Error("Error al actualizar la postulación");
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
