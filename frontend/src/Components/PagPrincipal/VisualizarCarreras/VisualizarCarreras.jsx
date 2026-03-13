import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Loader2 } from 'lucide-react';
import { obtenerCarreras } from '../../../services/services';

const VisualizarCarreras = () => {
    const [carreras, setCarreras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCarreras = async () => {
        try {
            setLoading(true);
            const data = await obtenerCarreras();
            setCarreras(data);
            setError(null);
        } catch (err) {
            setError('No pudimos cargar las carreras. Por favor, intenta de nuevo más tarde.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarreras();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-10 px-4 md:px-8 bg-white dark:bg-transparent transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 font-bold text-sm mb-4 transition-colors">
                        <GraduationCap size={18} />
                        Catálogo Educativo
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Explora las <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Carreras Disponibles</span>
                    </h2>
                </motion.div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-lg animate-pulse">Cargando carreras...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 rounded-3xl p-8 text-center max-w-lg mx-auto transition-colors">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-2">¡Ups! Algo salió mal</h3>
                    <p className="text-red-700 dark:text-red-400 font-medium mb-6">{error}</p>
                    <button
                        onClick={fetchCarreras}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-200 dark:shadow-none"
                    >
                        Intentar nuevamente
                    </button>
                </div>
            ) : (
                <>
                    <AnimatePresence>
                        {carreras.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {carreras.map((carrera) => (
                                    <motion.div
                                        key={carrera.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-100 dark:hover:border-indigo-800 transition-all cursor-pointer group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>

                                        <div className="relative z-10 flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                <BookOpen size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                                                    {carrera.nombre}
                                                </h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900/50 text-slate-300 dark:text-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No hay carreras</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    Parece que aún no hay carreras agregadas al sistema.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};

export default VisualizarCarreras;
