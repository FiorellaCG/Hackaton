import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', isDanger = false, requiresInput = false, inputPlaceholder = '', expectedInput = '' }) => {
    const [inputValue, setInputValue] = useState('');
    
    if (!isOpen) return null;

    const handleConfirm = () => {
        if (requiresInput && inputValue !== expectedInput) return;
        onConfirm();
        onClose();
        setInputValue('');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
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
                    className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                >
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl ${isDanger ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}>
                                <AlertTriangle size={24} />
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight">
                            {title}
                        </h3>
                        
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                            {message}
                        </p>

                        {requiresInput && (
                            <div className="mb-6 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                                    {inputPlaceholder}
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={expectedInput}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 focus:border-rose-500 outline-none transition-all text-sm font-bold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white"
                                />
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleConfirm}
                                disabled={requiresInput && inputValue !== expectedInput}
                                className={`w-full py-4 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:grayscale ${
                                    isDanger 
                                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20' 
                                    : 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                                }`}
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;
