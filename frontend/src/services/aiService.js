import { GEMINI_API_KEY } from "./apiConfig";

const GOOGLE_AI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Función genérica para interactuar con Gemini
 */
export const fetchGeminiResponse = async (prompt) => {
    try {
        const response = await fetch(GOOGLE_AI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) throw new Error("Error en la comunicación con Gemini");

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Lo siento, tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.";
    }
};

/**
 * Simulador de Entrevista: Genera una pregunta basada en el rol y CV
 */
export const obtenerPreguntaEntrevista = async (rol, habilidades) => {
    const prompt = `Eres un reclutador experto para la zona franca La Lima en Costa Rica. 
    Estás entrevistando a un candidato para el puesto de ${rol}. 
    Sus habilidades son: ${habilidades}.
    Por favor, genera UNA sola pregunta de entrevista técnica o de comportamiento basada en su perfil. 
    Mantén un tono profesional pero amable.`;

    return await fetchGeminiResponse(prompt);
};

/**
 * Feedback de Entrevista: Analiza la respuesta del usuario
 */
export const analizarRespuestaEntrevista = async (pregunta, respuesta) => {
    const prompt = `Como reclutador experto, analiza la siguiente respuesta a la pregunta de entrevista.
    Pregunta: "${pregunta}"
    Respuesta del candidato: "${respuesta}"
    
    Por favor, proporciona un breve análisis (máximo 3 frases) indicando qué hizo bien y qué podría mejorar. 
    Sé constructivo y profesional.`;

    return await fetchGeminiResponse(prompt);
};

/**
 * Análisis de Perfil: Mejora del CV
 */
export const optimizarPerfilIA = async (perfilData) => {
    const prompt = `Analiza el siguiente perfil profesional y sugiere 3 mejoras clave para aumentar su empleabilidad en empresas tecnológicas:
    Nombre: ${perfilData.nombre}
    Habilidades: ${perfilData.habilidades}
    Experiencia: ${perfilData.experiencia || 'No especificada'}
    
    Responde en formato de lista breve.`;

    return await fetchGeminiResponse(prompt);
};
