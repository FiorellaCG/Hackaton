import React, { useState, useEffect } from 'react';
import { X, Shield, UserCheck, UserMinus, Save } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { actualizarEstadoUsuario } from '../../services/services';

const UserActionsModal = ({ isOpen, user, onClose, onSave }) => {
    const { t } = useTranslation();
    const [editData, setEditData] = useState({
        role: '',
        isActive: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setEditData({
                role: user.role || 'aspirante',
                isActive: user.isActive ?? true
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedUser = await actualizarEstadoUsuario(user.id, {
                role: editData.role,
                isActive: editData.isActive
            });
            const mappedUser = {
                id: updatedUser.id,
                name: updatedUser.nombre_completo,
                email: updatedUser.correo,
                role: updatedUser.rol,
                isActive: updatedUser.activo
            };
            onSave(mappedUser);
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300">
                <header className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                            {t('admin.manage')} {user.name}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="p-8 space-y-8">
                    {/* Role Selection */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            {t('admin.role')}
                        </label>
                        <select
                            value={editData.role}
                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="admin">Administrador</option>
                            <option value="empresa">Empresa</option>
                            <option value="institucion">Institución</option>
                            <option value="aspirante">Aspirante / Estudiante</option>
                        </select>
                    </div>

                    {/* Account Status */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            {t('admin.status')}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setEditData({ ...editData, isActive: true })}
                                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${editData.isActive
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10'
                                        : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
                                    }`}
                            >
                                <UserCheck size={16} />
                                {t('admin.active')}
                            </button>
                            <button
                                onClick={() => setEditData({ ...editData, isActive: false })}
                                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${!editData.isActive
                                        ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-600 dark:text-rose-400 shadow-lg shadow-rose-500/10'
                                        : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
                                    }`}
                            >
                                <UserMinus size={16} />
                                {t('admin.inactive')}
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save size={16} />
                        )}
                        {t('admin.save_changes') || 'Guardar Cambios'}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-black text-xs uppercase tracking-[0.2em] transition-colors"
                    >
                        {t('admin.cancel') || 'Cancelar'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default UserActionsModal;
