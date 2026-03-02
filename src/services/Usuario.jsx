import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const loginUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error del servidor" };
  }
};

export const registrarUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registro/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error del servidor" };
  }
};