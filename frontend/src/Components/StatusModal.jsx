import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, type = 'info', title, message, confirmText = 'Aceptar' }) => {
    if (!isOpen) return null;

    const config = {
        success: {
            icon: CheckCircle2,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            border: 'border-emerald-100 dark:border-emerald-800',
            btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
        },
        error: {
            icon: AlertCircle,
            color: 'text-rose-500',
            bg: 'bg-rose-50 dark:bg-rose-900/20',
            border: 'border-rose-100 dark:border-rose-800',
            btn: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            border: 'border-amber-100 dark:border-amber-800',
            btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
        },
        info: {
            icon: Info,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50 dark:bg-indigo-900/20',
            border: 'border-indigo-100 dark:border-indigo-800',
            btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
        }
    };

    const current = config[type] || config.info;
    const Icon = current.icon;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                />
                
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                >
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className={`w-20 h-20 rounded-3xl ${current.bg} flex items-center justify-center mb-6`}>
                            <Icon size={40} className={current.color} />
                        </div>
                        
                        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight">
                            {title || (type === 'error' ? 'Error' : type === 'success' ? 'Éxito' : 'Aviso')}
                        </h3>
                        
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                            {message}
                        </p>
                        
                        <button
                            onClick={onClose}
                            className={`w-full py-4 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all transform active:scale-95 ${current.btn}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default StatusModal;
