import React, { useState } from 'react';
import DashboardAspirante from "@/src/Components/PagPrincipal/DashboardAspirante";
import Sidebar from "@/src/Components/PagPrincipal/Sidebar";
import { Bell } from "lucide-react";

function DashboardAspirantePage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Fija a la izquierda */}
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Contenido Principal */}
            <main className="flex-1 w-full lg:ml-64 p-6 flex flex-col min-h-screen transition-all">
                {/* Cabecera superior del Dashboard */}
                <div className="flex justify-between items-center mb-10 w-full pl-12 lg:pl-0">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Panel de Control</h1>
                        <p className="text-sm text-slate-500">Bienvenido de vuelta a GreenTalent</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="hidden sm:flex items-center justify-center p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                            <Bell className="w-5 h-5 text-slate-600" />
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
