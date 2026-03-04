import React, { useState, useEffect } from 'react';
import UserTabs from '../../Components/admin/UserTabs';
import UserTable from '../../Components/admin/UserTable';
import UserActionsModal from '../../Components/admin/UserActionsModal';
import { useTranslation } from "react-i18next";
import { obtenerUsuarios, actualizarEstadoUsuario } from '../../services/services';
import { Link } from 'react-router-dom';

const UsersManagement = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('All Users');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await obtenerUsuarios();
            const normalizedUsers = data.map(u => ({
                id: u.id,
                name: u.nombre_completo,
                email: u.correo,
                role: u.rol,
                isActive: u.activo
            }));
            setUsers(normalizedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleActionClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (updatedUser) => {
        try {
            await actualizarEstadoUsuario(updatedUser.id, updatedUser);
            await fetchUsers();
            setIsModalOpen(false);
        } catch (error) {
            alert('Error al actualizar usuario');
        }
    };

    const filteredByTab = users.filter(user => {
        if (activeTab === 'All Users') return true;
        if (activeTab === 'Companies') return user.role === 'empresa';
        if (activeTab === 'Students') return user.role === 'aspirante';
        if (activeTab === 'Institutions') return user.role === 'admin' || user.role === 'institucion'; // Ajuste según base de datos
        return true;
    });

    return (
        <div className="users-management-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase">{t('admin.users')}</h2>
                <Link
                    to="/admin/users/create-company"
                    style={{ textDecoration: 'none', padding: '10px 20px', backgroundColor: '#1a8641', color: '#fff', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(26, 134, 65, 0.2)' }}
                >
                    + {t('admin.create_company')}
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <UserTabs activeTab={activeTab} onTabSelect={setActiveTab} />

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <UserTable
                        users={filteredByTab}
                        onActionClick={handleActionClick}
                    />
                )}
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
