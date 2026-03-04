import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Search, Calendar, Filter } from "lucide-react";

const FiltersBar = ({ onFilterChange }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('all');

    const handleApply = () => {
        if (onFilterChange) {
            onFilterChange({ searchTerm, dateRange });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <div className="relative flex-1 group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <input
                    type="text"
                    placeholder={t('admin.search_keywords')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-sm font-medium"
                />
            </div>

            <div className="relative group w-full sm:w-48">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-sm font-bold appearance-none"
                >
                    <option value="all">{t('admin.all_time')}</option>
                    <option value="today">{t('admin.today')}</option>
                    <option value="week">{t('admin.this_week')}</option>
                    <option value="month">{t('admin.this_month')}</option>
                </select>
            </div>

            <button
                onClick={handleApply}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
            >
                <Filter size={16} />
                {t('admin.apply_filter')}
            </button>
        </div>
    );
};

export default FiltersBar;
