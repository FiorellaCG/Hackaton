import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Search, ChevronLeft, ChevronRight, Edit2, Shield, UserX } from 'lucide-react';

const UserTable = ({ users, onEditRow, onActionClick }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Search logic
    const filteredUsers = (users || []).filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">{t('admin.users_list')}</h3>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder={t('admin.search_user')}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-wider">
                            <th className="px-6 py-4">{t('admin.name')}</th>
                            <th className="px-6 py-4">{t('admin.email')}</th>
                            <th className="px-6 py-4">{t('admin.role')}</th>
                            <th className="px-6 py-4">{t('admin.status')}</th>
                            <th className="px-6 py-4 text-right">{t('admin.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {displayedUsers.length > 0 ? (
                            displayedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.isActive
                                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50'
                                            : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800/50'
                                            }`}>
                                            {user.isActive ? t('admin.active') : t('admin.inactive')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onActionClick(user)}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
                                        >
                                            {t('admin.manage')}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-slate-400 dark:text-slate-600 font-bold italic">
                                    {t('admin.no_users')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {t('admin.page')} {currentPage} <span className="mx-1 opacity-30">/</span> {totalPages > 0 ? totalPages : 1}
                </span>
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
