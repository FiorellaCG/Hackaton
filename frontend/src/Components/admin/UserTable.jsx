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
                                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="font-bold text-slate-800 dark:text-slate-200">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400 font-medium">{user.email}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex">
                                            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shadow-sm ${
                                                user.role === 'admin' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                user.role === 'empresa' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                user.role === 'institucion' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button 
                                            onClick={() => onActionClick({ ...user, quickToggle: true })}
                                            className="flex items-center gap-2 group/toggle"
                                        >
                                            <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${user.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${user.isActive ? 'left-6' : 'left-1'}`}></div>
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                {user.isActive ? t('admin.active') : t('admin.inactive')}
                                            </span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => onActionClick(user)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                                        >
                                            <Edit2 className="w-3 h-3" />
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
