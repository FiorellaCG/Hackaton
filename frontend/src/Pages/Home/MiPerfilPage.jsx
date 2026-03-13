import React, { useState } from 'react';
import MiPerfil from "../../Components/PagPrincipal/MiPerfil/MiPerfil";
import Sidebar from "../../Components/PagPrincipal/Sidebar/Sidebar";

function MiPerfilPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar Fija a la izquierda */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MiPerfil isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

export default MiPerfilPage;