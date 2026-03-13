import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { UserPlus, PlusCircle, Briefcase, FileText, Settings, ShieldCheck } from "lucide-react";

const QuickActions = () => {
    const { t } = useTranslation();

    const actions = [
        { id: 1, label: t('admin.create_company'), icon: PlusCircle, path: '/admin/users/create-company', color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40' },
        { id: 2, label: 'Control Vacantes', icon: Briefcase, path: '/admin/content/vacantes', color: 'text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40' },
        { id: 3, label: 'Ver Usuarios', icon: UserPlus, path: '/admin/users', color: 'text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40' },
        { id: 4, label: 'Configuración', icon: Settings, path: '/admin/settings', color: 'text-orange-600 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Acceso Rápido de Gestión
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link 
                            key={action.id}
                            to={action.path}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 group border border-transparent hover:border-slate-200 dark:hover:border-slate-700 ${action.color}`}
                        >
                            <Icon className="w-6 h-6 mb-2 transition-transform group-hover:scale-110" />
                            <span className="text-[10px] font-black uppercase text-center leading-tight tracking-wider">{action.label}</span>
                        </Link>
                    );
                })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Nivel de Acceso</span>
                    <span className="text-green-600 dark:text-green-400">Super Admin</span>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;
