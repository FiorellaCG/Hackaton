import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { obtenerMiPerfil } from "../../services/services";
import logoImg from "../../assents/Logo.png";
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
    Menu,
    Settings
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const [perfil, setPerfil] = useState(null);
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    useEffect(() => {
        if (usuario?.id) {
            obtenerMiPerfil(usuario.id)
                .then(data => setPerfil(data))
                .catch(err => console.error("Error sidebar:", err));
        }
    }, [usuario?.id]);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const navLinks = [
        { path: "/", icon: LayoutDashboard, label: "Dashboard" },
        { path: "#", icon: Zap, label: "TalentMatch", badge: true },
        { path: "#", icon: Briefcase, label: "Vacantes" },
        { path: "#", icon: GraduationCap, label: "Pasantías" },
        { path: "/entrevista-ia", icon: Video, label: "Entrevistas IA" },
        { path: "#", icon: BarChart3, label: "Estadísticas" },
        { path: "#", icon: Bot, label: "Asistente IA" },
    ];

    return (
        <>
            {/* Toggle en movil */}
            <button
                className="lg:hidden fixed top-5 left-5 z-50 p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-lg border dark:border-slate-700 transition-colors"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            </button>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 bg-white dark:bg-slate-900 h-screen border-r border-slate-100 dark:border-slate-800 flex flex-col transition-all duration-300 z-40 w-72 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>

                {/* Logo */}
                <div className="p-8">
                    <Link to="/" className="flex items-center gap-4 no-underline group">
                        <div className="relative group-hover:scale-110 transition-all duration-500 bg-[#1a8641] p-3 rounded-2xl shadow-xl shadow-green-900/30">
                            <img src={logoImg} alt="Logo" className="w-11 h-11 object-contain" />
                            <div className="absolute -inset-3 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-none tracking-tighter m-0 uppercase">GreenTalent</h2>
                            <span className="text-[11px] text-green-600 dark:text-green-400 font-black tracking-[0.2em] uppercase mt-1 block">ZFL La Lima</span>
                        </div>
                    </Link>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
                    {navLinks.map((link, idx) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <div
                                key={idx}
                                onClick={() => link.path !== "#" && navigate(link.path)}
                                className={`flex items-center gap-4 px-4 py-3.5 text-xs font-black uppercase tracking-[0.15em] rounded-2xl transition-all cursor-pointer group ${isActive
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl"
                                    : "text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-green-400 dark:text-green-600" : "group-hover:text-green-500 transition-colors"}`} />
                                {link.label}
                                {link.badge && <span className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
                            </div>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-800">
                        <div
                            onClick={() => navigate("/ajustes")}
                            className={`flex items-center gap-4 px-4 py-3.5 text-xs font-black uppercase tracking-[0.15em] rounded-2xl cursor-pointer transition-all ${location.pathname === "/ajustes"
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl"
                                : "text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            <Settings className={`w-5 h-5 ${location.pathname === "/ajustes" ? "text-green-400 dark:text-green-600" : ""}`} />
                            {t('admin.settings')}
                        </div>
                    </div>
                </nav>

                {/* User Section */}
                <div className="p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                    <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-2xl mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0 border-2 border-white dark:border-slate-900 shadow-inner">
                            {perfil?.foto_url ? (
                                <img src={perfil.foto_url} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-black text-lg">
                                    {perfil?.nombre?.charAt(0) || usuario?.correo?.charAt(0) || "U"}
                                </div>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-black text-slate-800 dark:text-slate-200 truncate m-0 tracking-tight leading-tight">
                                {perfil?.nombre ? `${perfil.nombre} ${perfil.apellidos}` : "..."}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate tracking-tight m-0 mt-1 uppercase">{usuario?.correo}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3.5 w-full text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all uppercase tracking-widest"
                    >
                        <LogOut className="w-5 h-5" /> {t('navbar.logout')}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
