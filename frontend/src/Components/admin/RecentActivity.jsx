import React from 'react';
import { useTranslation } from "react-i18next";
import { UserPlus, Briefcase, CheckCircle2, Clock } from "lucide-react";

const RecentActivity = ({ activities }) => {
    const { t } = useTranslation();

    // Mock activities if none provided
    const mockActivities = [
        { id: 1, type: 'user', text: 'Nuevo aspirante registrado: Juan Pérez', time: 'Hace 5 min', icon: UserPlus, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
        { id: 2, type: 'job', text: 'Nueva vacante publicada: Frontend Dev en Amazon', time: 'Hace 20 min', icon: Briefcase, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
        { id: 3, type: 'match', text: 'Match exitoso detectado por IA', time: 'Hace 1 hora', icon: CheckCircle2, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
        { id: 4, type: 'user', text: 'Empresa Intel ha completado su perfil', time: 'Hace 3 horas', icon: UserPlus, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
    ];

    const displayActivities = activities || mockActivities;

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm h-full transition-colors flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    Actividad Reciente
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">En vivo</span>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {displayActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="flex gap-4 group cursor-default">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${activity.color}`}>
                                <Icon size={18} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                                    {activity.text}
                                </p>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {activity.time}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <button className="mt-6 w-full py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all border border-slate-100 dark:border-slate-700">
                Ver todo el historial
            </button>
        </div>
    );
};

export default RecentActivity;
