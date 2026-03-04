import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAdminAuth = () => {
    // Leer usuario de localStorage para confirmar autenticación y rol
    const usuarioString = localStorage.getItem('usuario');

    // Si no hay usuario, redirigir al home inmediatamente
    if (!usuarioString) {
        return <Navigate to="/" replace />;
    }

    try {
        const usuario = JSON.parse(usuarioString);

        // RESTRICCIÓN ABSOLUTA: Solo admin puede pasar de aquí
        if (usuario && (usuario.rol === 'admin' || usuario.correo === 'admin@gmail.com')) {
            return <Outlet />;
        }

        // Cualquier otro usuario (aspirante, empresa, institucion) al home
        return <Navigate to="/" replace />;
    } catch (e) {
        console.error("Auth error:", e);
        return <Navigate to="/" replace />;
    }
};

export default RequireAdminAuth;
