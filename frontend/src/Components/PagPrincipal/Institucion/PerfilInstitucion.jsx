import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Mail, Phone, User, Users, Award, BookOpen, CheckCircle,
    GraduationCap, Clock, Calendar, Edit2, MapPin, Briefcase, XCircle,
    CheckCircle2, ChevronRight, Sparkles, Shield, Plus
} from "lucide-react";
import { obtenerMiPerfil } from "../../../services/services";
import Sidebar from "../Sidebar";

const ESTADO_COLOR = {
    activo: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    inactivo: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    completado: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    pendiente: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
};

const getEstadoColor = (estado) => {
    const lower = (estado || "").toLowerCase();
    if (lower.includes("activ") || lower.includes("curso")) return ESTADO_COLOR.activo;
    if (lower.includes("complet") || lower.includes("finaliz")) return ESTADO_COLOR.completado;
    if (lower.includes("pendient")) return ESTADO_COLOR.pendiente;
    return ESTADO_COLOR.inactivo;
};

const PerfilInstitucion = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [practicanteActivo, setPracticanteActivo] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            if (!usuario.id) { navigate("/login"); return; }
            try {
                const data = await obtenerMiPerfil(usuario.id);
                if (data?.rol !== "institucion") { navigate("/"); return; }
                setPerfil(data);
            } catch {
                navigate("/login");
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    if (cargando) return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    if (!perfil) return null;

    const practicantesFiltrados = (perfil.practicantes || []).filter(p => {
        const matchNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.programa.toLowerCase().includes(busqueda.toLowerCase());
        const matchEstado = filtroEstado === "todos" || p.estado.toLowerCase().includes(filtroEstado);
        return matchNombre && matchEstado;
    });

    const stats = [
        { label: "Estudiantes Activos", value: perfil.total_practicantes || 0, icon: Users, color: "green" },
        { label: "Tipo de Institución", value: perfil.tipo || "—", icon: Building2, color: "blue" },
        { label: "Estado", value: perfil.activa ? "Activa" : "Inactiva", icon: CheckCircle, color: perfil.activa ? "green" : "red" },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 lg:ml-72 p-6 lg:p-10">
                <div className="w-full max-w-7xl mx-auto space-y-6">

                    {/* ======== BANNER CABECERA ======== */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 rounded-[2rem] p-8 overflow-hidden shadow-2xl"
                    >
                        {/* Decoración de fondo */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Avatar/Logo */}
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-900/40 flex-shrink-0">
                                <Building2 className="w-10 h-10 text-white" />
                            </div>

                            {/* Datos principales */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight truncate">
                                        {perfil.nombre}
                                    </h1>
                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${perfil.activa ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-red-500/20 border-red-500/40 text-red-400'}`}>
                                        {perfil.activa ? "✓ Activa" : "Inactiva"}
                                    </span>
                                </div>
                                <p className="text-green-400 font-bold text-sm uppercase tracking-widest mb-2">{perfil.titulo}</p>
                                <p className="text-slate-400 text-sm font-medium">{perfil.tipo}</p>
                            </div>

                            {/* Botón editar */}
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                            >
                                <Edit2 size={14} /> Editar Perfil
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative z-10 mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: Mail, label: "Correo contacto", value: perfil.correo_contacto || perfil.correo },
                                { icon: User, label: "Persona de contacto", value: perfil.nombre_contacto },
                                { icon: Phone, label: "Teléfono", value: perfil.telefono || "—" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <item.icon size={14} className="text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.label}</p>
                                        <p className="text-sm text-white font-bold truncate">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ======== STATS ======== */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.map((stat, i) => {
                            const colorMap = {
                                green: "from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900",
                                blue: "from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900",
                                red: "from-red-50 to-white dark:from-red-900/20 dark:to-slate-900 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900",
                            };
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`bg-gradient-to-br ${colorMap[stat.color]} rounded-2xl p-5 border flex items-center gap-4 shadow-sm`}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center">
                                        <stat.icon size={22} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black">{stat.value}</p>
                                        <p className="text-xs font-black uppercase tracking-widest opacity-70">{stat.label}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ======== TABLA DE PRACTICANTES ======== */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
                    >
                        {/* Encabezado */}
                        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <GraduationCap size={20} className="text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h2 className="font-black text-slate-800 dark:text-white text-lg uppercase tracking-tight">
                                        Estudiantes en Pasantía
                                    </h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                        {perfil.total_practicantes} registrados
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Búsqueda */}
                                <input
                                    type="text"
                                    placeholder="Buscar estudiante o programa..."
                                    value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    className="pl-4 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-52"
                                />
                                {/* Filtro estado */}
                                <select
                                    value={filtroEstado}
                                    onChange={e => setFiltroEstado(e.target.value)}
                                    className="pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="activ">Activos</option>
                                    <option value="complet">Completados</option>
                                    <option value="pendient">Pendientes</option>
                                </select>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-green-900/20"
                                >
                                    <Plus size={14} /> Registrar Estudiante
                                </button>
                            </div>
                        </div>

                        {/* Tabla */}
                        {practicantesFiltrados.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px] font-black">
                                            <th className="px-6 py-4">Estudiante</th>
                                            <th className="px-6 py-4">Programa / Nivel</th>
                                            <th className="px-6 py-4 text-center">Horas</th>
                                            <th className="px-6 py-4">Período</th>
                                            <th className="px-6 py-4 text-center">Estado</th>
                                            <th className="px-6 py-4 text-right">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {practicantesFiltrados.map((p, i) => (
                                            <motion.tr
                                                key={p.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                                                onClick={() => setPracticanteActivo(practicanteActivo?.id === p.id ? null : p)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                                            {p.nombre.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-800 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{p.nombre}</p>
                                                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{p.correo}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">{p.programa}</p>
                                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-black">{p.nivel_academico}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="font-black text-slate-800 dark:text-white">{p.horas_requeridas}</span>
                                                    <span className="text-xs text-slate-400 ml-1">hrs</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                                                        {p.fecha_inicio ? new Date(p.fecha_inicio).toLocaleDateString('es-CR', { month: 'short', year: 'numeric' }) : '—'}
                                                        {' → '}
                                                        {p.fecha_fin ? new Date(p.fecha_fin).toLocaleDateString('es-CR', { month: 'short', year: 'numeric' }) : '?'}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getEstadoColor(p.estado)}`}>
                                                        {p.estado}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-green-600 dark:text-green-400 hover:underline font-black text-xs uppercase tracking-widest">
                                                        Ver detalle
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                                    <GraduationCap size={32} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="font-black text-slate-700 dark:text-slate-300 uppercase mb-2">
                                    {busqueda ? "Sin resultados" : "Sin estudiantes registrados"}
                                </h3>
                                <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mb-6">
                                    {busqueda ? `No se encontraron estudiantes con "${busqueda}".` : "Registra el primer estudiante en pasantía desde el Dashboard."}
                                </p>
                                {!busqueda && (
                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-green-900/20"
                                    >
                                        <Plus size={14} /> Registrar Primer Estudiante
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* ======== DRAWER DETALLE PRACTICANTE ======== */}
                    <AnimatePresence>
                        {practicanteActivo && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                onClick={() => setPracticanteActivo(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 30 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 30 }}
                                    className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-lg p-8 shadow-2xl relative"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => setPracticanteActivo(null)}
                                        className="absolute top-5 right-5 w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <XCircle size={18} />
                                    </button>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-green-900/20">
                                            {practicanteActivo.nombre.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 dark:text-white text-xl">{practicanteActivo.nombre}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{practicanteActivo.correo}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { icon: BookOpen, label: "Programa", value: practicanteActivo.programa },
                                            { icon: GraduationCap, label: "Nivel Académico", value: practicanteActivo.nivel_academico },
                                            { icon: Clock, label: "Horas Requeridas", value: `${practicanteActivo.horas_requeridas} horas` },
                                            {
                                                icon: Calendar, label: "Período", value:
                                                    `${practicanteActivo.fecha_inicio ? new Date(practicanteActivo.fecha_inicio).toLocaleDateString('es-CR') : '—'}  →  ${practicanteActivo.fecha_fin ? new Date(practicanteActivo.fecha_fin).toLocaleDateString('es-CR') : '?'}`
                                            },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                                <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                                    <item.icon size={16} className="text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</p>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{practicanteActivo.estado}</p>
                                                </div>
                                            </div>
                                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getEstadoColor(practicanteActivo.estado)}`}>
                                                {practicanteActivo.estado}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default PerfilInstitucion;
