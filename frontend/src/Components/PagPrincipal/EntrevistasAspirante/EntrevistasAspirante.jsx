import React, { useState, useEffect } from "react";
import {
    Video,
    Calendar,
    Clock,
    Briefcase,
    Building2,
    CheckCircle2,
    CalendarCheck,
    AlertCircle,
    ExternalLink,
    Trash2
} from "lucide-react";
import { obtenerEntrevistas, actualizarEntrevista, eliminarEntrevista } from "../../../services/services";
import { useModal } from "../../../ModalContext";

const EntrevistasAspirante = () => {
    const [entrevistas, setEntrevistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showError, showConfirm } = useModal();
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const fetchEntrevistas = async () => {
        try {
            setLoading(true);
            const data = await obtenerEntrevistas(usuario.id, 'aspirante');
            setEntrevistas(data);
        } catch (error) {
            console.error("Error al cargar entrevistas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntrevistas();
    }, []);

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const proximas = entrevistas.filter(e => e.estado !== 'completada' && e.estado !== 'cancelada');
    const pasadas = entrevistas.filter(e => e.estado === 'completada');

    const handleConfirmarAsistencia = async (entrevistaId) => {
        try {
            await actualizarEntrevista(entrevistaId, { estado: 'confirmada' });
            fetchEntrevistas();
        } catch (error) {
            showError("Error al confirmar asistencia");
        }
    };

    const handleEliminarEntrevista = (entrevistaId) => {
        showConfirm({
            title: "¿Eliminar entrevista?",
            message: "¿Estás seguro de que deseas eliminar esta entrevista? Esta acción no se puede deshacer.",
            confirmText: "Eliminar",
            isDanger: true,
            onConfirm: async () => {
                try {
                    await eliminarEntrevista(entrevistaId);
                    fetchEntrevistas();
                } catch (error) {
                    showError("Error al eliminar la entrevista");
                }
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="relative h-48 bg-gradient-to-br from-[#1a3a6d] to-[#1988a6] rounded-[40px] overflow-hidden flex items-center p-12 shadow-2xl shadow-[#1a3a6d]/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-xl">
                        <Video size={36} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white m-0 tracking-tight uppercase">Mis Entrevistas</h1>
                        <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-2 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" /> Gestiona tus citas y únete a las reuniones
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Lateral Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-xs font-black text-slate-800 dark:text-white mb-6 uppercase tracking-[0.2em]">Resumen Profesional</h3>
                        <div className="space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Próximas citas</span>
                                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                                    {entrevistas.filter(e => e.estado !== 'completada' && e.estado !== 'cancelada').length}
                                </span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-2xl border border-green-100 dark:border-green-800/50">
                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest block mb-1">Completadas</span>
                                <span className="text-3xl font-black text-green-600 dark:text-green-400">
                                    {entrevistas.filter(e => e.estado === 'completada').length}
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                                <p className="text-[10px] text-slate-500 font-bold leading-relaxed m-0 uppercase line-clamp-4">
                                    Usa audífonos para una mejor calidad de audio. Revisa tu fondo y asegúrate de tener buena iluminación.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Areas */}
                <div className="lg:col-span-3 space-y-12">
                    {['proximas', 'completadas', 'vencidas'].map((categoria) => {
                        const ahora = new Date();
                        const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
                        const filtered = entrevistas.filter(e => {
                            const [year, month, day] = e.fecha.split('-').map(Number);
                            const [hours, minutes] = e.hora.split(':').map(Number);
                            const fechaSolo = new Date(year, month - 1, day);
                            const fechaEntrevista = new Date(year, month - 1, day, hours, minutes);

                            if (categoria === 'completadas') return e.estado === 'completada';
                            if (categoria === 'vencidas') return e.estado !== 'completada' && fechaSolo < hoy;
                            // Próximas (Hoy o Futuro) y no completas
                            return (e.estado !== 'completada' && e.estado !== 'cancelada') && (fechaSolo >= hoy);
                        });

                        if (filtered.length === 0) return null;

                        const config = {
                            proximas: { title: "Próximas Entrevistas (Hoy y Futuro)", icon: CalendarCheck, color: "blue" },
                            completadas: { title: "Realizadas", icon: CheckCircle2, color: "green" },
                            vencidas: { title: "Entrevistas Pasadas/Vencidas", icon: Clock, color: "rose" }
                        }[categoria];

                        return (
                            <div key={categoria} className="space-y-6">
                                <h2 className={`text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 ${categoria === 'vencidas' ? 'text-rose-600' :
                                    categoria === 'completadas' ? 'text-green-600' : 'text-blue-600'
                                    }`}>
                                    <config.icon className="w-4 h-4" /> {config.title}
                                </h2>

                                <div className="space-y-4">
                                    {filtered.map((e) => {
                                        const [h, m] = e.hora.split(':');
                                        const hNum = parseInt(h);
                                        const ampm = hNum >= 12 ? 'PM' : 'AM';
                                        const h12 = hNum % 12 || 12;
                                        const horaStr = `${h12}:${m} ${ampm}`;
                                        const [y, mon, day] = e.fecha.split('-').map(Number);
                                        const fechaObj = new Date(y, mon - 1, day);
                                        const fechaLarga = fechaObj.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                                        return (
                                            <div key={e.id} className={`group bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 ${categoria === 'por_confirmar' ? 'border-l-4 border-l-orange-500' : ''
                                                }`}>
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                                    <div className="flex items-start gap-6">
                                                        <div className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center p-2 text-white shadow-lg ${categoria === 'vencidas' ? 'bg-rose-500 shadow-rose-500/20' :
                                                            categoria === 'completadas' ? 'bg-green-500 shadow-green-500/20' :
                                                                categoria === 'por_confirmar' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-blue-500 shadow-blue-500/20'
                                                            }`}>
                                                            <span className="text-[10px] font-black uppercase opacity-80">{fechaObj.toLocaleString('es', { month: 'short' })}</span>
                                                            <span className="text-3xl font-black leading-none">{day}</span>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h3 className="text-2xl font-black text-slate-800 dark:text-white m-0 tracking-tight leading-none uppercase">{e.nombre_empresa}</h3>
                                                                {categoria === 'por_confirmar' && (
                                                                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-black uppercase rounded-full border border-orange-200">Pendiente</span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <p className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-tighter">
                                                                    <Briefcase className="w-4 h-4 text-green-500" />
                                                                    Candidato a: <span className="font-black text-slate-800 dark:text-white">{e.titulo_vacante}</span>
                                                                </p>
                                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                                                                    <p className="flex items-center gap-2 text-xs font-black text-slate-500 m-0 uppercase tracking-widest">
                                                                        <Calendar className="w-4 h-4" /> {fechaLarga}
                                                                    </p>
                                                                    <p className={`flex items-center gap-2 text-xs font-black m-0 uppercase tracking-widest ${categoria === 'vencidas' ? 'text-rose-600' : 'text-blue-600'
                                                                        }`}>
                                                                        <Clock className="w-4 h-4" /> {horaStr}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-3">
                                                        {categoria === 'por_confirmar' ? (
                                                            <button
                                                                onClick={() => handleConfirmarAsistencia(e.id)}
                                                                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-orange-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-600/20"
                                                            >
                                                                <CheckCircle2 className="w-4 h-4" />
                                                                Confirmar Asistencia
                                                            </button>
                                                        ) : (
                                                            <a
                                                                href={e.meet_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl ${categoria === 'completadas' ? 'bg-slate-100 text-slate-400 pointer-events-none' :
                                                                    categoria === 'vencidas' ? 'bg-slate-100 text-slate-400' :
                                                                        'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-slate-900/10'
                                                                    }`}
                                                            >
                                                                <Video className={`w-4 h-4 ${categoria === 'completadas' || categoria === 'vencidas' ? 'text-slate-300' : 'text-green-400'}`} />
                                                                {categoria === 'completadas' ? 'Entrevista Realizada' :
                                                                    categoria === 'vencidas' ? 'Entrevista Finalizada' : 'Acceso Directo'}
                                                            </a>
                                                        )}
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase text-right mr-2 tracking-tighter">
                                                            {categoria === 'por_confirmar' ? 'Acción requerida' : 'Entrevista Virtual Directa'}
                                                        </p>
                                                        <button
                                                            onClick={() => handleEliminarEntrevista(e.id)}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-[10px] font-black uppercase tracking-widest mt-2"
                                                        >
                                                            <Trash2 size={12} /> Eliminar
                                                        </button>
                                                    </div>
                                                </div>

                                                {e.notas && (
                                                    <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nota de la empresa:</p>
                                                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs text-slate-600 dark:text-slate-400 font-medium border border-slate-100 dark:border-slate-800">
                                                            "{e.notas}"
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {entrevistas.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <Video className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-slate-400 font-black uppercase tracking-widest">No hay entrevistas</h3>
                            <p className="text-slate-400 text-sm font-medium mt-1">Cuando una empresa coordine contigo, aparecerá aquí.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EntrevistasAspirante;
