import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Calendar, FileText, Check, Loader2 } from 'lucide-react';
import { crearPerfilAspirante } from '../../../services/services';
import { useModal } from '../../../ModalContext';

const FormExperiencia = ({ isOpen, onClose, currentPerfil, onSuccess }) => {
    const { showError } = useModal();
    const [cargando, setCargando] = useState(false);
    const [form, setForm] = useState({
        puesto: '',
        empresa: '',
        periodo: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            // Preparamos la nueva lista de experiencia
            const nuevaExperiencia = [
                ...(currentPerfil.experiencia || []),
                {
                    id: Date.now().toString(),
                    ...form
                }
            ];

            // Preparamos el FormData (el backend espera FormData para esta vista por la imagen)
            const formData = new FormData();

            // Campos requeridos por el backend según el serializer
            formData.append('usuario_id', currentPerfil.usuario_id);
            formData.append('nombre', currentPerfil.nombre);
            formData.append('apellidos', currentPerfil.apellidos);
            formData.append('cedula', currentPerfil.cedula);
            formData.append('genero', currentPerfil.genero);
            formData.append('nacionalidad', currentPerfil.nacionalidad);
            formData.append('telefono', currentPerfil.telefono);
            formData.append('provincia', currentPerfil.provincia);
            formData.append('canton', currentPerfil.canton);
            formData.append('nivel_educativo', currentPerfil.nivel_educativo);
            formData.append('estado_laboral', currentPerfil.estado_laboral);

            // Campos opcionales o JSON
            formData.append('sobre_mi', currentPerfil.sobre_mi || '');
            formData.append('carrera_id', currentPerfil.carrera_id || '');
            formData.append('habilidades_tecnicas', JSON.stringify(currentPerfil.habilidades_tecnicas || []));
            formData.append('habilidades_blandas', JSON.stringify(currentPerfil.habilidades_blandas || []));
            formData.append('experiencia', JSON.stringify(nuevaExperiencia));

            await crearPerfilAspirante(formData);
            onSuccess();
            onClose();
            setForm({ puesto: '', empresa: '', periodo: '', descripcion: '' });
        } catch (error) {
            console.error("Error al guardar experiencia:", error);
            showError("Hubo un error al guardar la experiencia.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
                    >
                        <div className="bg-green-600 p-6 flex justify-between items-center text-white">
                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                <Briefcase className="w-6 h-6" /> Agregar Experiencia
                            </h3>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">Puesto / Cargo</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Briefcase size={18} />
                                        </div>
                                        <input
                                            required
                                            name="puesto"
                                            value={form.puesto}
                                            onChange={handleChange}
                                            placeholder="Ej. Desarrollador Fullstack"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 bg-slate-50 dark:bg-slate-800 transition-all font-bold text-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">Empresa</label>
                                    <input
                                        required
                                        name="empresa"
                                        value={form.empresa}
                                        onChange={handleChange}
                                        placeholder="Ej. Global Tech Solutions"
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 bg-slate-50 dark:bg-slate-800 transition-all font-bold text-slate-700 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">Periodo</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Calendar size={18} />
                                        </div>
                                        <input
                                            required
                                            name="periodo"
                                            value={form.periodo}
                                            onChange={handleChange}
                                            placeholder="Ej. Ene 2022 - Act"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 bg-slate-50 dark:bg-slate-800 transition-all font-bold text-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">Descripción</label>
                                    <textarea
                                        required
                                        name="descripcion"
                                        value={form.descripcion}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Describe tus principales logros y responsabilidades..."
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 bg-slate-50 dark:bg-slate-800 transition-all font-bold text-slate-700 dark:text-white resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={cargando}
                                className={`w-full py-5 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 shadow-xl shadow-green-900/20 transition-all transform active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-2 ${cargando ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {cargando ? (
                                    <><Loader2 className="animate-spin w-5 h-5" /> Guardando...</>
                                ) : (
                                    <><Check className="w-5 h-5" /> Guardar Experiencia</>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormExperiencia;
