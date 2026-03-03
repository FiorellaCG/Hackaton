import React, { useState, useEffect } from 'react';
import UserTabs from '../../Components/admin/UserTabs';
import UserTable from '../../Components/admin/UserTable';
import UserActionsModal from '../../Components/admin/UserActionsModal';
import { Link } from 'react-router-dom';

const UsersManagement = () => {
    const [activeTab, setActiveTab] = useState('All Users');
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Empty structure ready to fetch data via API
        // fetchUsers(activeTab) ...

        // Placeholder structure to show layout is ready without complex mocks
        setUsers([]);
    }, [activeTab]);

    const handleActionClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = (updatedUser) => {
        // API Integration to update user permissions and status goes here
        console.log('User update received:', updatedUser);
        setIsModalOpen(false);
        // Re-fetch users list after update
    };

    return (
        <div className="users-management-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Users & Accounts Management</h2>
                <Link
                    to="/admin/users/create-company"
                    style={{ textDecoration: 'none', padding: '10px 15px', backgroundColor: '#0056b3', color: '#fff', borderRadius: '4px', fontWeight: 'bold' }}
                >
                    + New Organization
                </Link>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <UserTabs activeTab={activeTab} onTabSelect={setActiveTab} />

                <UserTable
                    users={users}
                    onActionClick={handleActionClick}
                />
            </div>

            {/* Admin Actions Modal Component */}
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
