import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./DA.css";
import {
    User, Briefcase, FileText, Calendar, Award, Rocket,
    CheckCircle2, BookOpen, X, GraduationCap, Sparkles,
    MapPin, Phone, UploadCloud, ChevronRight, Star, Cpu,
    Code, Database, Globe, MessageSquare, Users, Clock, Shield, Edit, Bot
} from 'lucide-react';
import { obtenerMiPerfil } from '../../services/services';
import CVIAModal from './MiPerfil/CVIAModal';
import FormAspirante from './MiPerfil/FormAspirante';

const DashboardAspirante = () => {
    const navigate = useNavigate();
    const usuarioLocalStorage = JSON.parse(localStorage.getItem("usuario") || "{}");

    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [mostrarCVIAModal, setMostrarCVIAModal] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [isModalOnboardingOpen, setIsModalOnboardingOpen] = useState(false);
    const [skillInfo, setSkillInfo] = useState(null);
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [analizandoIA, setAnalizandoIA] = useState(false);

    const iconsMap = { Code, Database, Cpu, Globe, Users, MessageSquare, Clock, Shield };

    const renderSkillIcon = (iconName, size = "w-4 h-4") => {
        const IconComponent = iconsMap[iconName] || Star;
        return <IconComponent className={size} />;
    };

    const cargarDatos = async () => {
        try {
            const data = await obtenerMiPerfil(usuarioLocalStorage.id);
            setPerfil(data);
        } catch (error) {
            console.error("Error al cargar el perfil:", error);
        } finally {
            setCargando(false);
        }
    };

    const cargarDondeRecomendar = async () => {
        setAnalizandoIA(true);
        // Simulación de análisis de IA sobre vacantes reales (puedes conectar con /api/vacantes/ más tarde)
        setTimeout(() => {
            setRecomendaciones([
                { id: 1, cargo: "Full Stack Engineer", empresa: "Intel Costa Rica", match: 98, location: "Heredia", color: "green" },
                { id: 2, cargo: "UI/UX Designer", empresa: "Boston Scientific", match: 85, location: "Alajuela", color: "blue" },
                { id: 3, cargo: "Project Manager", empresa: "Procter & Gamble", match: 72, location: "San José", color: "purple" }
            ]);
            setAnalizandoIA(false);
        }, 3000);
    };

    useEffect(() => {
        cargarDatos();
        cargarDondeRecomendar();
    }, []);

    const [formData, setFormData] = useState({
        centro: '',
        nombre_programa: '',
        nivel_academico: '',
        periodo_practica: '',
        horas_requeridas: ''
    });

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBecomePracticante = (e) => {
        e.preventDefault();

        if (window.confirm('¿Estás seguro que deseas activar tu perfil como Practicante?')) {
            setAspirante(prev => ({
                ...prev,
                practicante: {
                    nombre_programa: formData.nombre_programa,
                    nivel_academico: formData.nivel_academico,
                    periodo_practica: formData.periodo_practica,
                    horas_requeridas: formData.horas_requeridas,
                    estado_pasantia: 'En proceso',
                    fecha_inicio: new Date().toISOString().split('T')[0],
                    fecha_fin: 'Por definir'
                }
            }));

            setIsModalOpen(false);
            window.alert('¡Tu perfil ahora es Practicante!');
        }
    };

    const getBadgeClass = (estado) => {
        switch (estado) {
            case 'En revisión': return 'badge badge-yellow';
            case 'Entrevista': return 'badge badge-green';
            case 'Rechazado': return 'badge badge-red';
            default: return 'badge badge-blue';
        }
    };

    if (cargando) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 text-green-600"></div>
        </div>
    );

    if (!perfil || perfil.error) return (
        <div className="dashboard-container flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <User size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Bienvenido a GreenTalent!</h2>
            <p className="text-slate-500 mb-8 max-w-sm">Parece que aún no has completado tu perfil profesional. Hazlo ahora para que las empresas puedan encontrarte.</p>
            <button
                onClick={() => setMostrarForm(true)}
                className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-xl shadow-green-100 transition-all transform hover:scale-105"
            >
                Completar mi Perfil
            </button>

            {/* Modal para crear perfil si no existe */}
            <AnimatePresence>
                {mostrarForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-white rounded-3xl w-full max-w-4xl p-1 relative shadow-2xl my-auto"
                        >
                            <button
                                onClick={() => setMostrarForm(false)}
                                className="absolute top-6 right-6 z-10 p-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="max-h-[85vh] overflow-y-auto px-4 py-8">
                                <FormAspirante usuarioId={usuarioLocalStorage.id} onSuccess={() => { setMostrarForm(false); cargarDatos(); }} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">

                {/* TARJETA SI NO ES PRACTICANTE */}
                {!perfil.practicante && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dashboard-card bg-gradient-to-r from-green-50 to-white border-l-4 border-l-green-500"
                    >
                        <h3 className="text-green-800 font-bold">
                            <Rocket size={18} className="text-green-600" /> ¿Buscas tu primera experiencia?
                        </h3>

                        <p className="profile-description text-green-700/70">
                            Activa tu perfil de Practicante para acceder a oportunidades académicas exclusivas.
                        </p>

                        <button
                            className="dashboard-btn !bg-green-600 !text-white hover:!bg-green-700"
                            onClick={() => setIsModalOnboardingOpen(true)}
                        >
                            Convertirme en Practicante
                        </button>
                    </motion.div>
                )}

                {/* PERFIL HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-card relative overflow-hidden bg-white"
                >
                    <div className="profile-header flex flex-col md:flex-row gap-8 items-start p-6">
                        <div className="relative group self-center md:self-start">
                            <img
                                src={perfil.foto_url || "https://i.pravatar.cc/150?u=default"}
                                alt="Perfil"
                                className="profile-img w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                <Sparkles size={16} />
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="profile-name text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                        {perfil.nombre} {perfil.apellidos}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <span className="profile-career bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-green-200">
                                            <GraduationCap className="w-4 h-4" /> {perfil.carrera || "Estudiante"}
                                        </span>
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-black rounded-lg uppercase tracking-wider border border-slate-200">
                                            {perfil.estado_laboral}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                                            <MapPin size={12} /> {perfil.provincia}, {perfil.canton}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setMostrarForm(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all text-sm shadow-lg shadow-slate-200"
                                    >
                                        <Edit className="w-4 h-4" /> Editar Perfil
                                    </button>
                                </div>
                            </div>

                            <p className="profile-description mt-6 text-slate-500 font-medium leading-relaxed max-w-3xl border-l-2 border-slate-100 pl-4">
                                {perfil.sobre_mi || "Sin descripción profesional."}
                            </p>

                            {/* SKILLS EN EL HEADER PARA EVITAR ESPACIOS VACÍOS */}
                            <div className="flex flex-wrap gap-2 mt-6">
                                {[...perfil.habilidades_tecnicas, ...perfil.habilidades_blandas].slice(0, 8).map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -2 }}
                                        onMouseEnter={() => setSkillInfo(skill)}
                                        onMouseLeave={() => setSkillInfo(null)}
                                        className="relative flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-green-300 hover:bg-green-50 transition-all cursor-help"
                                    >
                                        {renderSkillIcon(skill.icon, "w-3 h-3 text-green-600")}
                                        {skill.name}

                                        {skillInfo === skill && (
                                            <div className="absolute bottom-full left-0 mb-2 p-2 w-48 bg-slate-900 text-white text-[10px] rounded-lg shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
                                                {skill.desc}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* GRID */}
                <div className="dashboard-grid">

                    <div>
                        <div className="dashboard-card">
                            <h3 className="flex items-center gap-2 text-slate-800 font-bold border-b pb-4 mb-4">
                                <Briefcase size={18} className="text-green-600" /> Experiencia Laboral
                            </h3>

                            {perfil.experiencia && perfil.experiencia.length > 0 ? perfil.experiencia.map(exp => (
                                <div key={exp.id} className="timeline-item border-l-2 border-green-100 pl-4 pb-6 last:pb-0">
                                    <div className="timeline-title font-bold text-slate-800">
                                        {exp.puesto}
                                    </div>
                                    <div className="timeline-company text-green-600 text-xs font-bold mb-1">
                                        {exp.empresa} • {exp.periodo}
                                    </div>
                                    <div className="timeline-description text-sm text-slate-500 line-clamp-2">
                                        {exp.descripcion}
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-slate-400 italic">No has agregado experiencia laboral.</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="dashboard-card bg-gradient-to-br from-green-600 to-[#1a8641] text-white">
                            <h3 className="flex items-center gap-2 font-bold mb-4">
                                <Sparkles size={18} /> Gestión de CV con IA
                            </h3>
                            <p className="text-white/80 text-xs mb-6">Analiza tu perfil y crea un CV optimizado para las empresas de la zona.</p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setMostrarCVIAModal(true)}
                                    className="w-full py-2.5 bg-white text-green-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                                >
                                    <Bot className="w-4 h-4" /> Generar con IA
                                </button>
                                <label className="w-full py-2.5 bg-green-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-green-400 transition-colors border border-green-400 cursor-pointer">
                                    <UploadCloud className="w-4 h-4" /> Subir PDF
                                    <input type="file" className="hidden" accept=".pdf" onChange={(e) => alert("Simulación de subida: " + e.target.files[0]?.name)} />
                                </label>
                            </div>
                        </div>

                        {/* RECOMENDACIONES DE IA */}
                        <div className="dashboard-card border-l-4 border-green-500 relative overflow-hidden bg-white">
                            <div className="absolute top-0 right-0 p-3 opacity-5">
                                <Rocket size={60} className="text-green-600" />
                            </div>

                            <h3 className="flex items-center gap-2 text-slate-800 font-bold mb-1">
                                <Sparkles size={18} className="text-green-600" /> Match Perfecto IA
                            </h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-6">Recomendaciones personalizadas</p>

                            {analizandoIA ? (
                                <div className="space-y-4 py-4">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="w-10 h-10 border-4 border-green-100 border-t-green-500 rounded-full animate-spin"></div>
                                        <p className="text-[11px] font-bold text-slate-400 animate-pulse">Escaneando 150+ vacantes...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recomendaciones.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 hover:bg-green-50/30 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-green-700 transition-colors line-clamp-1">{job.cargo}</h4>
                                                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-1">
                                                        <Briefcase size={10} /> {job.empresa}
                                                    </p>
                                                </div>
                                                <div className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-lg">
                                                    {job.match}% MATCH
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3 gap-2">
                                                <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                                                    <MapPin size={10} /> {job.location}
                                                </span>
                                                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-green-600 hover:text-white hover:border-green-600 rounded-lg text-[9px] font-black transition-all shadow-sm">
                                                    APLICAR YA
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <button
                                        onClick={cargarDondeRecomendar}
                                        className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-green-600 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Rocket size={12} /> Refrescar Análisis
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="dashboard-card">
                            <h3 className="flex items-center gap-2 text-slate-800 font-bold mb-5">
                                <FileText size={18} className="text-green-600" /> Postulaciones
                            </h3>

                            {perfil.postulaciones && perfil.postulaciones.length > 0 ? perfil.postulaciones.map(post => (
                                <div key={post.id} className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all mb-3 last:mb-0 group cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <strong className="text-sm font-bold text-slate-800 group-hover:text-green-600 transition-colors">{post.cargo}</strong>
                                        <span className={getBadgeClass(post.estado)}>
                                            {post.estado}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        <span>{post.empresa}</span>
                                        <span className="flex items-center gap-1"><Calendar size={10} /> {post.fecha}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-6">
                                    <Briefcase className="w-10 h-10 text-slate-100 mx-auto mb-2" />
                                    <p className="text-sm text-slate-400 italic">No tienes postulaciones activas.</p>
                                </div>
                            )}
                        </div>

                        <div className="dashboard-card">
                            <h3 className="flex items-center gap-2 text-slate-800 font-bold mb-4">
                                <User size={18} className="text-green-600" /> Detalles de Contacto
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-green-600">
                                        <Users size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Género</p>
                                        <p className="text-xs font-bold text-slate-700 capitalize">{perfil.genero}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600">
                                        <Phone size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Teléfono</p>
                                        <p className="text-xs font-bold text-slate-700">{perfil.telefono}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-orange-600">
                                        <MapPin size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Ubicación</p>
                                        <p className="text-xs font-bold text-slate-700">{perfil.provincia}, {perfil.canton}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-purple-600">
                                        <BookOpen size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Nivel Estudios</p>
                                        <p className="text-xs font-bold text-slate-700 capitalize">{perfil.nivel_educativo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* MODAL ONBOARDING PRACTICANTE */}
            <AnimatePresence>
                {isModalOnboardingOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOnboardingOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            <div className="mb-6">
                                <h2 className="text-2xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                                    <Rocket className="text-green-600" /> Activar Pasantía
                                </h2>
                                <p className="text-slate-500 text-sm">Completa estos datos para que las empresas vean tu perfil académico.</p>
                            </div>

                            <form onSubmit={handleBecomePracticante} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Institución / Universidad</label>
                                    <input
                                        required
                                        name="nombre_programa"
                                        placeholder="Ej. Tecnológico de Costa Rica"
                                        value={formData.nombre_programa}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none bg-slate-50 focus:bg-white transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nivel</label>
                                        <input
                                            required
                                            name="nivel_academico"
                                            placeholder="Ej. Bachiller"
                                            value={formData.nivel_academico}
                                            onChange={handleFormChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none bg-slate-50 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Horas Totales</label>
                                        <input
                                            required
                                            type="number"
                                            name="horas_requeridas"
                                            placeholder="Ej. 320"
                                            value={formData.horas_requeridas}
                                            onChange={handleFormChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none bg-slate-50 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Periodo Sugerido</label>
                                    <input
                                        required
                                        name="periodo_practica"
                                        placeholder="Ej. Julio - Diciembre 2026"
                                        value={formData.periodo_practica}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none bg-slate-50 focus:bg-white transition-all"
                                    />
                                </div>

                                <button type="submit" className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all transform hover:scale-[1.02] active:scale-95 mt-4">
                                    Confirmar y Activar
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL EDITAR PERFIL */}
            <AnimatePresence>
                {mostrarForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-white rounded-3xl w-full max-w-4xl p-1 relative shadow-2xl my-auto"
                        >
                            <button
                                onClick={() => setMostrarForm(false)}
                                className="absolute top-6 right-6 z-10 p-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="max-h-[85vh] overflow-y-auto px-4 py-8">
                                <FormAspirante usuarioId={usuarioLocalStorage.id} currentData={perfil} onSuccess={() => { setMostrarForm(false); cargarDatos(); }} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL IA CV */}
            <CVIAModal
                isOpen={mostrarCVIAModal}
                onClose={() => setMostrarCVIAModal(false)}
                perfil={perfil}
            />


        </div>
    );
};

export default DashboardAspirante;