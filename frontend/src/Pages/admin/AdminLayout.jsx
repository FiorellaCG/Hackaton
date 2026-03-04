import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { BarChart3, Users, Building2, Briefcase, Settings, LogOut, Globe } from 'lucide-react';
import logoImg from '../../assents/Logo.png';

const AdminLayout = () => {
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // SEGURIDAD ADICIONAL: Si por alguna razón RequireAdminAuth fallara, 
    // este check secundario sacará al usuario si no es admin.
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario.rol !== 'admin' && usuario.correo !== 'admin@gmail.com') {
        window.location.href = '/';
        return null; // O un spinner
    }

    const navItems = [
        { path: '/admin', label: t('admin.analytics'), icon: BarChart3 },
        { path: '/admin/users', label: t('admin.users'), icon: Users },
        { path: '/admin/users/create-company', label: t('admin.create_company'), icon: Building2 },
        { path: '/admin/content/vacantes', label: t('admin.vacancies'), icon: Briefcase },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 z-50 transition-colors">
                <div className="p-8">
                    <Link to="/" className="flex flex-col items-center gap-5 no-underline group text-center">
                        <div className="bg-[#1a8641] p-2 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20 transition-all duration-500 group-hover:scale-105 h-[50px] w-[100px]">
                            <img src={logoImg} alt="Logo" className="h-full w-full object-contain" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter m-0 uppercase leading-none">{t('admin.panel_title') || 'AdminPanel'}</h2>
                            <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest mt-2 opacity-80">{t('admin.control_system') || 'Control System'}</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isActive
                                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-sm border border-green-100 dark:border-green-800/50'
                                    : 'text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {/* Language Toggler in Admin */}
                    <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4">
                        <button
                            onClick={() => changeLanguage('es')}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${i18n.language.startsWith('es') ? 'bg-white dark:bg-slate-700 text-green-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            ES
                        </button>
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${i18n.language.startsWith('en') ? 'bg-white dark:bg-slate-700 text-green-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            EN
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3.5 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
                    >
                        <LogOut size={18} />
                        {t('admin.logout')}
                    </button>
                </div>
            </aside>

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
