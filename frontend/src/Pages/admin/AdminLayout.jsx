import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AdminSidebar from '../../Components/admin/AdminSidebar';

const AdminLayout = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const usuarioStr = localStorage.getItem('usuario');
    const usuarioObj = usuarioStr ? JSON.parse(usuarioStr) : null;

    if (!usuarioObj || (usuarioObj.rol !== 'admin' && usuarioObj.correo !== 'admin@gmail.com')) {
        window.location.href = "/";
        return null;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <AdminSidebar handleLogout={handleLogout} />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen flex flex-col transition-all duration-300">
                <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-40 transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <h1 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] m-0">{t('admin.dashboard')}</h1>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs font-black text-slate-800 dark:text-white leading-none">{t('admin.admin_user') || 'Admin User'}</span>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('admin.super_admin') || 'Super Admin'}</span>
                        </div>
                        <div className="group relative">
                            <div className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-lg shadow-xl shadow-slate-200 dark:shadow-none transition-transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-green-500">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-10 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
