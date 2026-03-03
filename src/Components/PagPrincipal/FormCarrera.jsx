import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { crearCarrera } from '../../services/services';

const FormCarrera = () => {
    const [areas, setAreas] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        area: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await crearCarrera(formData);
            setStatus({ type: 'success', message: '¡Carrera agregada exitosamente!' });
            setFormData({ nombre: '', area: '' });

            // Emitimos un evento global para que la tabla de abajo se actualice sola
            window.dispatchEvent(new CustomEvent('carreraAgregada'));

            // Ocultar mensaje después de 3 segundos
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.detail || 'Hubo un error al crear la carrera. Intenta de nuevo.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
        >
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={24} className="text-blue-200" />
                    <h2 className="text-2xl font-bold">Nueva Carrera</h2>
                </div>
                <p className="text-blue-100 text-sm">
                    Agrega una nueva carrera al sistema.
                </p>
            </div>

            <div className="p-6 md:p-8">
                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        {status.type === 'success' ? <CheckCircle2 className="shrink-0 mt-0.5 text-green-500" size={18} /> : <AlertCircle className="shrink-0 mt-0.5 text-red-500" size={18} />}
                        <p className="text-sm font-medium">{status.message}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Nombre de la Carrera
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <BookOpen size={18} className="text-slate-400" />
                            </div>
                            <input
                                required
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Ingeniería en Sistemas"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Guardando...
                            </>
                        ) : (
                            'Agregar Carrera'
                        )}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default FormCarrera;
