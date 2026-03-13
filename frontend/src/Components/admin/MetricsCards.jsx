import React from 'react';
import { useTranslation } from "react-i18next";
import { Users, Building2, Briefcase, AlertTriangle } from "lucide-react";

const MetricsCards = ({ stats }) => {
    const { t } = useTranslation();
    const metrics = [
        { id: 1, title: t('admin.total_students'), value: stats?.total_estudiantes || '0', color: 'indigo', icon: Users },
        { id: 2, title: t('admin.active_companies'), value: stats?.total_empresas || '0', color: 'emerald', icon: Building2 },
        { id: 3, title: t('admin.pending_vacancies'), value: stats?.total_vacantes || '0', color: 'amber', icon: Briefcase },
        { id: 4, title: t('admin.online_users'), value: (stats?.total_estudiantes ? Math.floor(stats.total_estudiantes * 0.15) : '0'), color: 'rose', icon: AlertTriangle }
    ];

    const getColorClasses = (color) => {
        const classes = {
            indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
            emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
            amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
            rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
        };
        return classes[color] || classes.indigo;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map(metric => {
                const Icon = metric.icon;
                return (
                    <div key={metric.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${getColorClasses(metric.color)}`}>
                                <Icon size={24} />
                            </div>
                            <span className="text-sm font-black text-slate-300 dark:text-slate-600">ID: {metric.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">{metric.title}</h4>
                        <div className="text-3xl font-black text-slate-900 dark:text-white transition-colors">
                            {metric.value}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MetricsCards;
