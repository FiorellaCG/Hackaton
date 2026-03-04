import React, { useState, useEffect } from "react";
import {
    Video,
    Link as LinkIcon,
    Calendar,
    Clock,
    User,
    Users,
    Briefcase,
    ChevronRight,
    Plus,
    CheckCircle2,
    Search,
    X,
    MessageSquare,
    ExternalLink
} from "lucide-react";
import {
    obtenerPostulacionesEmpresa,
    agendarEntrevista,
    obtenerEntrevistas,
    actualizarEntrevista
} from "../../../services/services";
import { useTranslation } from "react-i18next";

const EntrevistasEmpresa = () => {
    const { t } = useTranslation();
    const [candidatos, setCandidatos] = useState([]);
    const [entrevistas, setEntrevistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [form, setForm] = useState({
        fecha: "",
        hora: "",
        notas: ""
    });

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const fetchData = async () => {
        try {
            setLoading(true);
            const posts = await obtenerPostulacionesEmpresa(usuario.id);
            // Solo candidatos con estado 'Aceptado' pasivos (sin entrevista aún)
            setCandidatos(posts.filter(p => p.estado === 'Aceptado'));

            const entries = await obtenerEntrevistas(usuario.id, 'empresa');
            setEntrevistas(entries);
        } catch (error) {
            console.error("Error al cargar datos de entrevistas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAgendar = async (e) => {
        e.preventDefault();
        try {
            // Generar un link de Google Meet falso (o usar uno real si tuviéramos integración API completa)
            const meetCode = Math.random().toString(36).substring(2, 5) + "-" +
                Math.random().toString(36).substring(2, 6) + "-" +
                Math.random().toString(36).substring(2, 5);
            const meetUrl = `https://meet.google.com/${meetCode}`;

            await agendarEntrevista({
                postulacion: selectedPost.id,
                empresa: selectedPost.vacante_obj.empresa,
                aspirante: selectedPost.aspirante,
                fecha: form.fecha,
                hora: form.hora,
                meet_url: meetUrl,
                notas: form.notas,
                estado: 'confirmada'
            });

            // Actualizar estado de la postulación
            // (Opcional: podrías cambiar el estado a 'entrevistando' o dejarlo en 'Aceptado')

            setShowModal(false);
            setForm({ fecha: "", hora: "", notas: "" });
            fetchData();
        } catch (error) {
            alert("Error al agendar la entrevista");
        }
    };

    const handleComplete = async (entrevistaId) => {
        try {
            await actualizarEntrevista(entrevistaId, { estado: 'completada' });
            fetchData();
        } catch (error) {
            alert("Error al completar entrevista");
        }
    };

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Gestión de Entrevistas</h1>
                        <p className="text-slate-500 font-medium mt-1">Coordina reuniones vía Google Meet con tus mejores candidatos.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-black px-4 py-2 rounded-xl text-sm border border-green-200 dark:border-green-800/50">
                            {entrevistas.length} {entrevistas.length === 1 ? 'Entrevista' : 'Entrevistas'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel de Candidatos por Entrevistar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <h2 className="text-sm font-black text-slate-800 dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                            <User className="w-4 h-4 text-green-600" /> Candidatos Aceptados
                        </h2>

                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar candidato..."
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-green-500 transition-all text-sm font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin">
                            {candidatos.length > 0 ? (
                                candidatos.filter(c => c.aspirante_obj?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())).map((c) => (
                                    <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-green-200 dark:hover:border-green-900/50 transition-all group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center font-black">
                                                {c.aspirante_obj?.nombre?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 dark:text-white leading-tight">
                                                    {c.aspirante_obj?.nombre} {c.aspirante_obj?.apellidos}
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                                                    {c.vacante_obj?.titulo}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedPost(c);
                                                setShowModal(true);
                                            }}
                                            className="w-full py-2.5 bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-all shadow-sm"
                                        >
                                            Agendar Entrevista
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 opacity-50">
                                    <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                        <Users size={20} />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin candidatos pendientes</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Listado de Entrevistas Agendadas */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <h2 className="text-sm font-black text-slate-800 dark:text-white mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" /> Próximas Entrevistas
                        </h2>

                        <div className="space-y-4">
                            {entrevistas.length > 0 ? (
                                entrevistas.map((e) => (
                                    <div key={e.id} className="relative group p-6 bg-white dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-start gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                                    <span className="text-[10px] font-black uppercase opacity-80">{new Date(e.fecha).toLocaleString('es', { month: 'short' })}</span>
                                                    <span className="text-xl font-black leading-none">{new Date(e.fecha).getDate()}</span>
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-black text-slate-800 dark:text-white m-0">
                                                            {e.nombre_aspirante}
                                                        </h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight border ${e.estado === 'confirmada' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 border-blue-100 dark:border-blue-800' :
                                                            'bg-green-50 dark:bg-green-900/30 text-green-600 border-green-100 dark:border-green-800'
                                                            }`}>
                                                            {e.estado}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                                            <Briefcase className="w-3.5 h-3.5" />
                                                            {e.titulo_vacante}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {e.hora.substring(0, 5)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <a
                                                    href={e.meet_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
                                                >
                                                    <Video className="w-4 h-4 text-green-400 dark:text-green-600" />
                                                    Unirse a Meet
                                                </a>
                                                {e.estado !== 'completada' && (
                                                    <button
                                                        onClick={() => handleComplete(e.id)}
                                                        className="p-3 bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-400 hover:text-green-500 rounded-2xl border border-slate-100 dark:border-slate-600 transition-all shadow-sm"
                                                        title="Marcar como completada"
                                                    >
                                                        <CheckCircle2 size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {e.notas && (
                                            <div className="mt-5 pt-5 border-t border-slate-50 dark:border-slate-700">
                                                <div className="flex items-start gap-2">
                                                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                                                    <p className="text-xs text-slate-500 font-medium italic">"{e.notas}"</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                    <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
                                        <Calendar size={24} />
                                    </div>
                                    <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm">No hay entrevistas programadas</h3>
                                    <p className="text-slate-400 text-xs font-medium mt-1">Selecciona un candidato de la lista lateral para agendar.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para Agendar */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-800">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white relative">
                            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all">
                                <X size={20} />
                            </button>
                            <h3 className="text-2xl font-black uppercase tracking-tight m-0">Agendar Entrevista</h3>
                            <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                                Para: {selectedPost?.aspirante_obj?.nombre}
                            </p>
                        </div>

                        <form onSubmit={handleAgendar} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Fecha de la entrevista</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500" />
                                    <input
                                        required
                                        type="date"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-green-500 text-sm font-black transition-all"
                                        value={form.fecha}
                                        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Hora (24h)</label>
                                <div className="relative group">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500" />
                                    <input
                                        required
                                        type="time"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-green-500 text-sm font-black transition-all"
                                        value={form.hora}
                                        onChange={(e) => setForm({ ...form, hora: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Notas adicionales</label>
                                <textarea
                                    className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-green-500 text-sm font-medium transition-all"
                                    rows="3"
                                    placeholder="Temas a tratar en la reunión..."
                                    value={form.notas}
                                    onChange={(e) => setForm({ ...form, notas: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-[1.02] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <LinkIcon size={18} />
                                Generar Link y Agendar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntrevistasEmpresa;
