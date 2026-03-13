import React from 'react';
import { useTranslation } from "react-i18next";

const UserTabs = ({ activeTab, onTabSelect }) => {
    const { t } = useTranslation();
    const tabs = [
        { id: 'All Users', label: t('admin.all_users') },
        { id: 'Aspirantes', label: t('admin.estudiantes_tab') },
        { id: 'Companies', label: t('admin.empresas_tab') },
        { id: 'Institutions', label: t('admin.instituciones_tab') }
    ];

    return (
        <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 mb-6 overflow-x-auto pb-px">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabSelect(tab.id)}
                    className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.id
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-t-full shadow-[0_-4px_10px_rgba(34,197,94,0.3)]"></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default UserTabs;
