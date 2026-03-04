import React, { useState, useEffect } from 'react';
import UserTabs from '../../Components/admin/UserTabs';
import UserTable from '../../Components/admin/UserTable';
import UserActionsModal from '../../Components/admin/UserActionsModal';
import { useTranslation } from "react-i18next";
import { Users as UsersIcon } from 'lucide-react';
import { obtenerUsuarios } from '../../services/services';

const UsersManagement = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('All Users');
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await obtenerUsuarios();
                const mappedData = data.map(u => ({
                    id: u.id,
                    name: u.nombre_completo,
                    email: u.correo,
                    role: u.rol,
                    isActive: u.activo
                }));
                setAllUsers(mappedData);
                applyFilter(mappedData, activeTab);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        applyFilter(allUsers, activeTab);
    }, [activeTab, allUsers]);

    const applyFilter = (data, tab) => {
        if (tab === 'All Users') {
            setFilteredUsers(data.filter(user => user.role?.toLowerCase() !== 'aspirante'));
        } else {
            const roleMap = {
                'Companies': 'empresa',
                'Institutions': 'institucion'
            };
            const role = roleMap[tab];
            setFilteredUsers(data.filter(user => user.role?.toLowerCase() === role));
        }
    };

    const handleActionClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = (updatedUser) => {
        setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#1a8641] text-white rounded-2xl shadow-xl shadow-green-900/20">
                        <UsersIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
                            {t('admin.users_list')}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
                            {t('admin.manage_accounts_desc') || 'Gestiona los perfiles y permisos de todos los usuarios.'}
                        </p>
                    </div>
                </div>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-2 transition-colors">
                <UserTabs activeTab={activeTab} onTabSelect={setActiveTab} />

                <div className="p-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Cargando usuarios...</p>
                        </div>
                    ) : (
                        <UserTable
                            users={filteredUsers}
                            onActionClick={handleActionClick}
                        />
                    )}
                </div>
            </div>

            <UserActionsModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
            />
        </div>
    );
};

export default UsersManagement;
