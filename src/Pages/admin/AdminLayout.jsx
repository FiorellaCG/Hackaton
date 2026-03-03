import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', borderRight: '1px solid #ddd' }}>
                <h2>Admin Panel</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/admin/users" style={{ textDecoration: 'none', color: '#333', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
                        Users Management
                    </Link>
                    <Link to="/admin/users/create-company" style={{ textDecoration: 'none', color: '#333', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
                        Create Company
                    </Link>
                    {/* Future links can be added here */}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, padding: '20px', backgroundColor: '#F9FAFB' }}>
                <header style={{ marginBottom: '20px' }}>
                    <h1>Admin Dashboard</h1>
                </header>
                {/* Sub-routes will be rendered here */}
                <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
