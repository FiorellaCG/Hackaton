import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAdminAuth = () => {
    const usuarioString = localStorage.getItem('usuario');

    // Si no hay nada en localStorage, al home
    if (!usuarioString || usuarioString === 'undefined' || usuarioString === 'null') {
        return <Navigate to="/" replace />;
    }

    try {
        const usuario = JSON.parse(usuarioString);

        // El usuario DEBE existir y ser admin (por rol o por el correo específico)
        const isAdmin = usuario && (usuario.rol === 'admin' || usuario.correo === 'admin@gmail.com');

        if (isAdmin) {
            return <Outlet />;
        }

        // Si no es admin, al home
        return <Navigate to="/" replace />;
    } catch (e) {
        // Si hay error parseando (token corrupto, etc), al home
        return <Navigate to="/" replace />;
    }
};

export default RequireAdminAuth;
