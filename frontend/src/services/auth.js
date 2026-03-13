import { API_URL } from "./apiConfig";

export const loginUser = async (correo, contrasena) => {
    const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            correo: correo.trim(),
            contrasena: contrasena.trim()
        }),
    });

    if (!response.ok) {
        throw new Error("Credenciales inválidas");
    }

    return await response.json();
};

export const registerUser = async (data) => {
    const processedData = {
        ...data,
        correo: data.correo?.trim().toLowerCase(),
        contrasena: data.contrasena?.trim(),
        telefono: data.telefono?.trim()
    };

    const response = await fetch(`${API_URL}/usuarios/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }

    return await response.json();
};
