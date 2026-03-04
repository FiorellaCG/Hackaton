import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import Sidebar from '../Sidebar';
import { Bell } from 'lucide-react';

const DashboardEmpresa = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 w-full">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="flex-1 w-full lg:ml-72 p-6 flex flex-col min-h-screen transition-all">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 w-full pl-12 lg:pl-0">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight m-0" style={{ color: '#163a6d' }}>Panel de Empresa</h1>
                        <p className="text-sm font-medium mt-1" style={{ color: '#1988a6' }}>Gestiona tus vacantes y procesos</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="hidden sm:flex items-center justify-center p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                            <Bell className="w-5 h-5" style={{ color: '#b1b900' }} />
                        </button>
                    </div>
                </div>

                <div className="dashboard-main-container w-full" style={{ maxWidth: '1200px', margin: '0 auto', flex: 1 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardEmpresa;
