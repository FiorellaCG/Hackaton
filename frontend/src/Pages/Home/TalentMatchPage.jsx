import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { useTranslation } from "react-i18next";
import MatchCard from '../../Components/PagPrincipal/TalentMatch/MatchCard';
import Sidebar from '../../Components/PagPrincipal/Sidebar/Sidebar';
import { RefreshCcw, Heart, X, Sparkles, Info, CheckCircle } from 'lucide-react';
import { obtenerVacantesAdmin, toggleFavorito } from '../../services/services';

const TalentMatchPage = () => {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [lastAction, setLastAction] = useState(null);
    const [liked, setLiked] = useState([]);
    const [toast, setToast] = useState(null);
    const x = useMotionValue(0);

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    useEffect(() => {
        obtenerVacantesAdmin()
            .then(data => {
                const shuffled = [...data]
                    .sort(() => Math.random() - 0.5)
                    .map(v => ({
                        id: v.id,
                        title: v.titulo,
                        company: v.nombre_empresa || (v.empresa && v.empresa.nombre) || 'Empresa',
                        location: v.canton || 'Costa Rica',
                        type: v.tipo_vacante || 'Empleo',
                        schedule: v.nivel_educativo || '',
                        level: v.nivel_educativo || '',
                        salary: 'A convenir',
                        logo: v.logo_url || `https://picsum.photos/seed/${String(v.id).slice(0, 8)}/200/200`,
                        tags: []
                    }));
                setJobs(shuffled);
            })
            .catch(() => setJobs([]));
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const handleSwipe = async (direction) => {
        setLastAction(direction === 'right' ? 'like' : 'dislike');
        const currentJob = jobs[currentIndex];

        if (direction === 'right' && currentJob && usuario?.id) {
            try {
                await toggleFavorito(usuario.id, currentJob.id, null);
                setLiked(prev => [...prev, currentJob]);
                showToast(`¡${currentJob.title} guardado en favoritos!`);
            } catch (err) {
                console.error('Error al guardar favorito:', err);
            }
        }

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setLastAction(null);
            x.set(0);
        }, 200);
    };

    const resetDeck = () => {
        setCurrentIndex(0);
        setJobs(prev => [...prev].sort(() => Math.random() - 0.5));
    };

    const currentJob = jobs[currentIndex];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="flex-1 lg:ml-72 flex flex-col items-center justify-center p-4 lg:p-10 relative">

                {/* Toast notification */}
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl shadow-2xl font-bold text-sm"
                        >
                            <CheckCircle size={18} />
                            {toast}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <div className="absolute top-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="text-green-500 w-5 h-5" />
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white tracking-tighter mb-4 uppercase">
                            {t('talent_match.title')} <span className="text-green-600 dark:text-green-400">Match</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto uppercase tracking-widest text-sm">
                        {t('talent_match.subtitle')}
                    </p>
                    {liked.length > 0 && (
                        <p className="mt-2 text-green-600 dark:text-green-400 font-black text-xs uppercase tracking-widest">
                            ❤️ {liked.length} vacante{liked.length > 1 ? 's' : ''} guardada{liked.length > 1 ? 's' : ''} en tu perfil
                        </p>
                    )}
                </div>

                {/* Card Container */}
                <div className="relative w-full max-w-[400px] aspect-[3/4] z-20">
                    <AnimatePresence mode='popLayout'>
                        {currentJob ? (
                            <MatchCard
                                key={currentJob.id}
                                job={currentJob}
                                onSwipe={handleSwipe}
                                dragValue={x}
                            />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800"
                            >
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6">
                                    <RefreshCcw className="w-12 h-12 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 uppercase">
                                    {t('talent_match.no_more')}
                                </h2>
                                {liked.length > 0 && (
                                    <p className="text-green-600 font-bold mb-4 text-sm">
                                        ✅ {liked.length} vacante(s) guardadas en tus favoritos
                                    </p>
                                )}
                                <button
                                    onClick={resetDeck}
                                    className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-95"
                                >
                                    <RefreshCcw size={20} />
                                    {t('talent_match.reset')}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Action Buttons */}
                {currentJob && (
                    <div className="flex items-center gap-6 mt-12 z-30">
                        <button
                            onClick={() => handleSwipe('left')}
                            className="p-5 bg-white dark:bg-slate-900 text-red-500 rounded-full shadow-xl border border-red-50 dark:border-red-900/20 hover:scale-110 active:scale-95 transition-all"
                        >
                            <X size={32} strokeWidth={3} />
                        </button>

                        <button className="p-4 bg-white dark:bg-slate-900 text-blue-500 rounded-full shadow-lg border border-slate-100 dark:border-slate-800 hover:scale-110 transition-all">
                            <Info size={24} />
                        </button>

                        <button
                            onClick={() => handleSwipe('right')}
                            className="p-5 bg-white dark:bg-slate-900 text-green-500 rounded-full shadow-xl border border-green-50 dark:border-green-900/20 hover:scale-110 active:scale-95 transition-all"
                        >
                            <Heart size={32} strokeWidth={3} fill="currentColor" />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TalentMatchPage;
