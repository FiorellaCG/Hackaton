import {
    LayoutDashboard,
    Zap,
    Briefcase,
    GraduationCap,
    Video,
    BarChart3,
    Bot,
    User,
    LogOut,
    Menu
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {

    // Suponemos info del usuario extraída por ahora
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    return (
        <>
            {/* Toggle en movil */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <Menu className="w-5 h-5 text-slate-800" />
            </button>

            {/* Overlay para cerrar en móvil */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 bg-white h-screen border-r border-slate-100 flex flex-col transition-transform duration-300 z-40 w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>

                {/* Logo */}
                <div className="p-6 flex items-center gap-2">
                    <div className="bg-[#1a8641] text-white p-2 rounded-lg font-bold text-xl h-10 w-10 flex items-center justify-center">
                        GT
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 leading-none">GreenTalent</h2>
                        <span className="text-[10px] text-[#1a8641] font-bold tracking-wider">AI POWERED</span>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto w-full">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <Zap className="w-5 h-5" /> TalentMatch
                        <span className="ml-auto w-2 h-2 rounded-full bg-green-500"></span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <Briefcase className="w-5 h-5" /> Vacantes
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <GraduationCap className="w-5 h-5" /> Pasantías
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <Video className="w-5 h-5" /> Entrevistas IA
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <BarChart3 className="w-5 h-5" /> Estadísticas
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 transition-colors w-full">
                        <Bot className="w-5 h-5" /> Asistente IA
                    </a>

                    {/* Activo: Mi Perfil */}
                    <a href="/mi-perfil" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white bg-slate-900 rounded-xl shadow-md w-full mt-2">
                        <User className="w-5 h-5 text-green-400" /> Mi Perfil
                    </a>
                </nav>

                {/* Bottom user section */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-800 truncate">Juan Pérez</p>
                            <p className="text-xs text-slate-500 truncate">{usuario?.correo || "juan.perez@email.com"}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            localStorage.removeItem("usuario");
                            window.location.href = "/login";
                        }}
                        className="flex items-center gap-2 px-4 py-2 w-full text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
