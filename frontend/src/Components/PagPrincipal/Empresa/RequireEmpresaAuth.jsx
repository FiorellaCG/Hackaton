import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireEmpresaAuth = () => {
    // Leer usuario de localStorage para confirmar autenticación y rol
    const usuarioString = localStorage.getItem('usuario');

    if (!usuarioString) {
        return <Navigate to="/" replace />; // Redirigir al inicio o login
    }

    try {
        const usuario = JSON.parse(usuarioString);
        // Validar que el usuario sea empresa
        if (usuario.rol === 'empresa') {
            return <Outlet />;
        } else {
            // Si está autenticado pero no es empresa, mandarlo a su dashboard o inicio
            return <Navigate to="/" replace />;
        }
    } catch (e) {
        return <Navigate to="/" replace />;
    }
};

export default RequireEmpresaAuth;
