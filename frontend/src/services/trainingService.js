import { API_URL } from "./apiConfig";

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
