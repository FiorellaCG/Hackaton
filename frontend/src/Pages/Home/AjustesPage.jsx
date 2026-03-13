import React, { useState } from 'react';
import Sidebar from "../../Components/PagPrincipal/Sidebar/Sidebar";
import Ajustes from "../../Components/PagPrincipal/Ajustes/Ajustes";

function AjustesPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Ajustes isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
    );
}

export default AjustesPage;

