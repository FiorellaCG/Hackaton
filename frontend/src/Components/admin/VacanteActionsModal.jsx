import React, { useState, useEffect } from 'react';
import { X, Shield, CheckCircle2, AlertCircle, Save, Trash2, Briefcase } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { actualizarEstadoVacante, eliminarVacante } from '../../services/services';
import { useModal } from '../../ModalContext';

const VacanteActionsModal = ({ isOpen, vacante, onClose, onSave, onDelete }) => {
    const { t } = useTranslation();
    const { showError } = useModal();
    const [editData, setEditData] = useState({
        isActive: false
    });
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (vacante) {
            setEditData({
                isActive: vacante.isActive ?? true
            });
            setConfirmDelete(false);
        }
    }, [vacante]);

    if (!isOpen || !vacante) return null;

    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedVacante = await actualizarEstadoVacante(vacante.id, {
                activa: editData.isActive
            });
            onSave({
                ...vacante,
                isActive: updatedVacante.activa
            });
            onClose();
        } catch (error) {
            console.error("Error updating vacancy:", error);
            showError("No se pudo actualizar el estado de la vacante.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        
        setLoading(true);
        try {
            await eliminarVacante(vacante.id);
            onDelete(vacante.id);
            onClose();
        } catch (error) {
            console.error("Error deleting vacancy:", error);
            showError("Hubo un problema al intentar eliminar la vacante.");
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
                        <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                            <Briefcase size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                            {t('admin.manage')} {vacante.title}
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
                    {/* Vacancy Info Summary */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{vacante.company}</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{vacante.title}</span>
                            <span className="text-[10px] font-medium text-slate-500 mt-2">Publicada: {vacante.date}</span>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Estado de la Vacante
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setEditData({ ...editData, isActive: true })}
                                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                                    editData.isActive 
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10' 
                                    : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                <CheckCircle2 size={16} />
                                {t('admin.activate') || 'Activado'}
                            </button>
                            <button 
                                onClick={() => setEditData({ ...editData, isActive: false })}
                                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                                    !editData.isActive 
                                    ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-600 dark:text-rose-400 shadow-lg shadow-rose-500/10' 
                                    : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                <AlertCircle size={16} />
                                {t('admin.deactivate') || 'Desactivado'}
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-green-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3"
                    >
                        {loading && !confirmDelete ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Save size={16} />
                        )}
                        {t('admin.save_changes') || 'Guardar Cambios'}
                    </button>
                    
                    <button 
                        onClick={handleDelete}
                        disabled={loading}
                        className={`w-full py-4 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 border-2 ${
                            confirmDelete 
                            ? 'bg-red-600 border-red-600 text-white animate-pulse' 
                            : 'bg-transparent border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                        }`}
                    >
                        <Trash2 size={16} />
                        {confirmDelete ? '¿Estás seguro? Haz clic otra vez' : 'Eliminar Vacante'}
                    </button>

                    <button 
                        onClick={onClose}
                        className="w-full py-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
                    >
                        {t('admin.cancel') || 'Cancelar'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default VacanteActionsModal;
