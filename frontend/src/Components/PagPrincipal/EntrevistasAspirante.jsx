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
    ExternalLink
} from "lucide-react";
import { obtenerEntrevistas } from "../../services/services";

const EntrevistasAspirante = () => {
    const [entrevistas, setEntrevistas] = useState([]);
    const [loading, setLoading] = useState(true);
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
                            <Calendar className="w-3.5 h-3.5" /> Agenda y coordinación con empresas
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
                                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{proximas.length}</span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-2xl border border-green-100 dark:border-green-800/50">
                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest block mb-1">Completadas</span>
                                <span className="text-3xl font-black text-green-600 dark:text-green-400">{pasadas.length}</span>
                            </div>
                        </div>

                        <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                                <p className="text-[10px] text-slate-500 font-bold leading-relaxed m-0 uppercase line-clamp-4">
                                    Recuerda estar 5 minutos antes de la hora acordada. Revisa tu conexión y audio.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Próximas */}
                    <div>
                        <h2 className="text-sm font-black text-slate-800 dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                            <CalendarCheck className="w-4 h-4 text-blue-600" /> Entrevistas Programadas
                        </h2>

                        <div className="space-y-4">
                            {proximas.length > 0 ? (
                                proximas.map((e) => (
                                    <div key={e.id} className="group bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:scale-[1.01] transition-all duration-300">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="flex items-start gap-6">
                                                <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center p-2 group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors">
                                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase group-hover:text-white/80">{new Date(e.fecha).toLocaleString('es', { month: 'short' })}</span>
                                                    <span className="text-3xl font-black text-slate-800 dark:text-white leading-none group-hover:text-white">{new Date(e.fecha).getDate()}</span>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-2xl font-black text-slate-800 dark:text-white m-0 tracking-tight leading-none uppercase">{e.nombre_empresa}</h3>
                                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-200 dark:border-blue-800">Confirmada</span>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 m-0">
                                                            <Briefcase className="w-4 h-4 text-green-500" />
                                                            Candidato a: <span className="font-black text-slate-800 dark:text-white">{e.titulo_vacante}</span>
                                                        </p>
                                                        <div className="flex items-center gap-6 mt-1">
                                                            <p className="flex items-center gap-2 text-xs font-black text-blue-600 m-0 uppercase tracking-widest">
                                                                <Clock className="w-4 h-4" /> {e.hora.substring(0, 5)} hrs
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-3">
                                                <a
                                                    href={e.meet_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-none"
                                                >
                                                    <Video className="w-4 h-4 text-green-400" />
                                                    Unirse con Google Meet
                                                </a>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase text-right mr-2 tracking-tighter">Entrevista Virtual Coordenada</p>
                                            </div>
                                        </div>

                                        {e.notas && (
                                            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mensaje de la empresa:</p>
                                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs text-slate-600 dark:text-slate-400 font-medium border border-slate-100 dark:border-slate-800">
                                                    "{e.notas}"
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Video className="text-slate-300" size={32} />
                                    </div>
                                    <h3 className="text-slate-400 font-black uppercase tracking-widest">No tienes entrevistas agendadas</h3>
                                    <p className="text-slate-400 text-sm font-medium mt-1">Cuando una empresa coordine contigo, aparecerá aquí.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pasadas */}
                    {pasadas.length > 0 && (
                        <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <h2 className="text-sm font-black text-slate-800 dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                                <CheckCircle2 className="w-4 h-4 text-green-600" /> Historial de Entrevistas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pasadas.map(e => (
                                    <div key={e.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 dark:text-white m-0 leading-tight uppercase">{e.nombre_empresa}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{e.titulo_vacante}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase rounded-full border border-green-100">Completada</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EntrevistasAspirante;
