import { API_URL } from "./apiConfig";

export const obtenerMiPerfil = async (usuarioId) => {
    const response = await fetch(`${API_URL}/mi-perfil/${usuarioId}/`);
    return await response.json();
};

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

export const crearPerfilEmpresa = async (data) => {
    const isFormData = data instanceof FormData;
    const options = {
        method: "POST",
        body: isFormData ? data : JSON.stringify(data),
    };

    if (!isFormData) {
        options.headers = { "Content-Type": "application/json" };
    }

    const response = await fetch(`${API_URL}/crear-perfil-empresa/`, options);

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

export const obtenerEstudiantesInstitucion = async (institucionId) => {
    const response = await fetch(`${API_URL}/instituciones/${institucionId}/estudiantes/`);
    if (!response.ok) throw new Error("Error al obtener estudiantes de la institución");
    return await response.json();
};

export const descargarPlantillaExcel = async (institucionId) => {
    const response = await fetch(`${API_URL}/instituciones/${institucionId}/plantilla_excel/`);
    if (!response.ok) throw new Error("Error al descargar la plantilla");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_estudiantes.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
};

export const cargarExcelEstudiantes = async (institucionId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/instituciones/${institucionId}/cargar_excel/`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        const err = await response.json();
        throw err;
    }
    return await response.json();
};

export const obtenerEntrevistasInstitucion = async (institucionId) => {
    const response = await fetch(`${API_URL}/instituciones/${institucionId}/entrevistas/`);
    if (!response.ok) throw new Error("Error al obtener entrevistas de la institución");
    return await response.json();
};

export const crearPerfilInstitucion = async (data) => {
    const response = await fetch(`${API_URL}/crear-perfil-institucion/`, {
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
