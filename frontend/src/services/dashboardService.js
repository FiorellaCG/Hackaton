import { obtenerMiPerfil as getProfile } from "./userService";

/**
 * Servicio específico para manejar la lógica y datos del Dashboard del Aspirante
 */

export const obtenerPerfilDashboard = async (usuarioId) => {
    return await getProfile(usuarioId);
};

export const cargarRecomendacionesIA = async () => {
    // Simulación de respuesta de IA (Mock sugerido por el usuario)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, cargo: "Full Stack Engineer", empresa: "Intel Costa Rica", match: 98, location: "Heredia", color: "green" },
                { id: 2, cargo: "UI/UX Designer", empresa: "Boston Scientific", match: 85, location: "Alajuela", color: "blue" },
                { id: 3, cargo: "Project Manager", empresa: "Procter & Gamble", match: 72, location: "San José", color: "purple" }
            ]);
        }, 1500);
    });
};
