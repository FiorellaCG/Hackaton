import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, DollarSign, X, Heart, Info } from 'lucide-react';
import { useTranslation } from "react-i18next";

const MatchCard = ({ job, onSwipe, dragValue }) => {
    const { t } = useTranslation();

    // Valores reactivos para el feedback visual
    const opacity = useTransform(dragValue, [-150, 0, 150], [1, 0, 1]);
    const backgroundColor = useTransform(
        dragValue,
        [-150, 0, 150],
        ["rgba(239, 68, 68, 0.15)", "rgba(255, 255, 255, 0)", "rgba(34, 197, 94, 0.15)"]
    );
    const iconScale = useTransform(dragValue, [-150, 0, 150], [1.2, 0.5, 1.2]);

    if (!job) return null;

    return (
        <motion.div
            style={{ x: dragValue }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
                if (info.offset.x > 150) onSwipe('right');
                else if (info.offset.x < -150) onSwipe('left');
            }}
            className="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden cursor-grab active:cursor-grabbing"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: dragValue > 0 ? 1000 : -1000, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* Header / Image Area */}
            <div className="relative h-2/5 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-8">
                <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-900 bg-white">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>

                {/* Overlay Tags */}
                <div className="absolute top-6 right-6">
                    <span className="px-4 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {job.type}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 h-3/5 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight mb-2 uppercase tracking-tight">
                        {job.title}
                    </h2>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-[0.2em] mb-6">
                        {job.company}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <MapPin size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <DollarSign size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <GraduationCap size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">{job.level}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <Briefcase size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">{job.schedule || t('navbar.full_time')}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {job.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] font-black uppercase tracking-widest rounded-lg">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Status Indicator (Swipe visual feedback) */}
                <motion.div
                    style={{ opacity, backgroundColor }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                    <motion.div
                        style={{ scale: iconScale }}
                        className={`p-6 rounded-full border-4 ${dragValue.get() > 0 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                    >
                        {/* Como dragValue es reactivo pero queremos el icono estático durante el render, 
                            usamos un pequeño truco o simplemente mostramos ambos y filtramos */}
                        {dragValue.get() >= 0 ? <Heart size={64} fill="currentColor" /> : <X size={64} />}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MatchCard;
