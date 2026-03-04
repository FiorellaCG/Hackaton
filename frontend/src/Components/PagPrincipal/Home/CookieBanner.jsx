import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[1000]"
                >
                    <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800 dark:border-slate-200 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-500/20 dark:bg-green-100 rounded-2xl text-green-400 dark:text-green-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black uppercase tracking-tighter leading-none mb-2">Política de Privacidad</h4>
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 leading-relaxed">
                                    Utilizamos cookies para mejorar tu experiencia y analizar el tráfico para ofrecerte mejores oportunidades de talento. Al continuar navegando, aceptas nuestra política de cookies.
                                </p>
                            </div>
                            <button onClick={() => setIsVisible(false)} className="text-slate-500 hover:text-white dark:hover:text-slate-900 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={acceptCookies}
                                className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-green-900/20"
                            >
                                Aceptar Todo
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="px-6 py-3 bg-slate-800 dark:bg-slate-100 text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-800 font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                            >
                                Configurar
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
