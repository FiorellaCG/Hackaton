import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/PagPrincipal/Sidebar";
import { useTranslation } from "react-i18next";
import {
    Settings, Lock, Bell, Trash2, ShieldCheck,
    Globe, Key, Eye, EyeOff, Loader2, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    obtenerMiPerfil,
    actualizarPreferencias,
    cambiarPassword,
    eliminarCuenta
} from "../../services/services";
import "../../Components/PagPrincipal/Ajustes/Ajustes.css";

function AjustesPage() {
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [showPass, setShowPass] = useState(false);
    const [passStatus, setPassStatus] = useState({ type: "", msg: "" });

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const cargarDatos = async () => {
        try {
            const data = await obtenerMiPerfil(usuario.id);
            setPerfil(data);
        } catch (error) {
            console.error("Error al cargar perfil:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (usuario.id) cargarDatos();
    }, [usuario.id]);

    const handlePreferenceToggle = async (key) => {
        if (!perfil) return;

        const nuevasPreferencias = {
            ...(perfil.preferencias || {}),
            [key]: !perfil.preferencias?.[key]
        };

        try {
            await actualizarPreferencias(usuario.id, nuevasPreferencias);
            setPerfil({ ...perfil, preferencias: nuevasPreferencias });

            if (key === 'dark_mode') {
                if (nuevasPreferencias.dark_mode) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
            }
        } catch (error) {
            console.error("Error al guardar preferencia:", error);
        }
    };

    const toggleLanguage = () => {
        const nextLang = i18n.language.startsWith('es') ? 'en' : 'es';
        i18n.changeLanguage(nextLang);
        localStorage.setItem("language", nextLang);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setPassStatus({ type: "error", msg: "Las nuevas contraseñas no coinciden" });
            return;
        }

        setPasswordLoading(true);
        setPassStatus({ type: "", msg: "" });

        try {
            await cambiarPassword(usuario.id, passwords.current, passwords.new);
            setPassStatus({ type: "success", msg: t('settings.success_password') || "Contraseña actualizada" });
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (error) {
            setPassStatus({ type: "error", msg: error.error || "Error" });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("¿ESTÁS COMPLETAMENTE SEGURO?")) {
            const confirmEmail = window.prompt("Escribe tu correo para confirmar:");
            if (confirmEmail === usuario.correo) {
                try {
                    await eliminarCuenta(usuario.id);
                    localStorage.clear();
                    window.location.href = "/";
                } catch (error) {
                    alert("Error");
                }
            }
        }
    };

    if (cargando) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="flex-1 lg:ml-64 p-6 lg:p-10 transition-all">
                <header className="mb-10 pl-12 lg:pl-0">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 lowercase">
                        <div className="p-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none">
                            <Settings className="w-6 h-6" />
                        </div>
                        {t('settings.title')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">{t('settings.subtitle')}</p>
                </header>

                <div className="max-w-3xl space-y-6 ajustes-container">

                    {/* SEGURIDAD */}
                    <div className="settings-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-colors">
                        <div className="settings-header p-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">{t('settings.security')}</h2>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Key size={14} /> {t('settings.update_password')}
                                </h3>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type={showPass ? "text" : "password"}
                                            placeholder={t('settings.current_password')}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none transition-all text-sm font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900"
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPass(!showPass)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                        >
                                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="password"
                                            placeholder={t('settings.new_password')}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none transition-all text-sm font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900"
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder={t('settings.confirm_password')}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none transition-all text-sm font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900"
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {passStatus.msg && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`p-4 rounded-2xl text-[11px] font-black uppercase tracking-wider flex items-center gap-3 ${passStatus.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30'}`}
                                        >
                                            {passStatus.type === 'success' && <CheckCircle size={14} />}
                                            {passStatus.msg}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    disabled={passwordLoading}
                                    className="px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-3 disabled:opacity-50 shadow-lg shadow-slate-200 dark:shadow-none"
                                >
                                    {passwordLoading ? <Loader2 size={16} className="animate-spin" /> : t('settings.save_password')}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* NOTIFICACIONES */}
                    <div className="settings-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-colors">
                        <div className="settings-header p-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-2">
                            <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">{t('settings.notifications')}</h2>
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {[
                                { key: 'empleo_alertas', title: t('settings.ia_alerts'), desc: t('settings.ia_alerts_desc') },
                                { key: 'mensajes_alertas', title: t('settings.direct_messages'), desc: t('settings.direct_messages_desc') }
                            ].map(item => (
                                <div key={item.key} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{item.title}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={perfil?.preferencias?.[item.key] ?? true}
                                            onChange={() => handlePreferenceToggle(item.key)}
                                        />
                                        <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* INTERFAZ */}
                    <div className="settings-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition-colors">
                        <div className="settings-header p-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">{t('settings.interface')}</h2>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{t('settings.dark_mode')}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('settings.dark_mode_desc')}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={perfil?.preferencias?.dark_mode ?? false}
                                        onChange={() => handlePreferenceToggle('dark_mode')}
                                    />
                                    <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>

                            <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{t('settings.system_language')}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{i18n.language.startsWith('es') ? 'Español (ES)' : 'English (EN)'}</p>
                                </div>
                                <button
                                    onClick={toggleLanguage}
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-[10px] rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all uppercase tracking-widest"
                                >
                                    {t('settings.change_language')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* PELIGRO */}
                    <div className="p-8 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 transition-colors">
                        <div className="space-y-1">
                            <h3 className="text-sm font-black text-red-800 dark:text-red-400 uppercase tracking-tight">{t('settings.danger_zone')}</h3>
                            <p className="text-xs text-red-600/70 dark:text-red-400/60 font-medium max-w-sm">{t('settings.delete_account_desc')}</p>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-6 py-3 border-2 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-black text-[10px] rounded-xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
                        >
                            <Trash2 size={14} /> {t('settings.delete_account')}
                        </button>
                    </div>

                </div>

                <footer className="mt-24 py-10 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-slate-400 dark:text-slate-600 gap-6 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <ShieldCheck size={16} className="text-green-600" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('settings.data_protected')}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest">GreenTalent AI Platform © 2026</p>
                </footer>
            </main>
        </div>
    );
}

export default AjustesPage;
