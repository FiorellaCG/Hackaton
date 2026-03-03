import React, { useState } from 'react';
import DashboardAspirante from "@/src/Components/PagPrincipal/DashboardAspirante";
import Sidebar from "@/src/Components/PagPrincipal/Sidebar";
import { Bell } from "lucide-react";

function DashboardAspirantePage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            {/* Sidebar Fija a la izquierda */}
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Contenido Principal */}
            <main className="flex-1 w-full lg:ml-64 p-4 lg:p-8 flex flex-col min-h-screen transition-all">
                {/* Cabecera superior del Dashboard */}
                <div className="flex justify-between items-center mb-8 lg:mb-10 w-full pl-12 lg:pl-0">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-white tracking-tight">Panel de Control</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Bienvenido de vuelta a GreenTalent AI</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="hidden sm:flex items-center justify-center p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Instancia del Dashboard */}
                <DashboardAspirante />
            </main>
        </div>
    );
}

export default DashboardAspirantePage;
