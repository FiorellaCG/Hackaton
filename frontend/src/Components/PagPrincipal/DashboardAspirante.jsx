import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const usuarioLocalStorage = JSON.parse(localStorage.getItem("usuario") || "{}");

    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [mostrarCVIAModal, setMostrarCVIAModal] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
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
        if (window.confirm(t('dashboard.confirm_practicante_alert'))) {
            // Lógica para actualizar perfil
            setIsModalOnboardingOpen(false);
            window.alert(t('dashboard.success_practicante'));
        }
    };

    const getBadgeClass = (estado) => {
        switch (estado) {
            case 'En revisión':
            case 'In review': return 'badge badge-yellow';
            case 'Entrevista':
            case 'Interview': return 'badge badge-green';
            case 'Rechazado':
            case 'Rejected': return 'badge badge-red';
            default: return 'badge badge-blue';
        }
    };

    const translateStatus = (estado) => {
        switch (estado) {
            case 'En revisión': return t('dashboard.status.review');
            case 'Entrevista': return t('dashboard.status.interview');
            case 'Rechazado': return t('dashboard.status.rejected');
            default: return estado || t('dashboard.status.default');
        }
    };

    if (cargando) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 text-green-600"></div>
        </div>
    );

    if (!perfil || perfil.error) return (
        <div className="dashboard-container flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-[var(--bg-main)] transition-colors">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                <User size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('dashboard.welcome', { brand: t('brand.name') })}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">{t('dashboard.incomplete_profile')}</p>
            <button
                onClick={() => setMostrarForm(true)}
                className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-xl shadow-green-100 dark:shadow-none transition-all transform hover:scale-105"
            >
                {t('dashboard.complete_profile')}
            </button>

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
                            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl p-1 relative shadow-2xl my-auto transition-colors"
                        >
                            <button
                                onClick={() => setMostrarForm(false)}
                                className="absolute top-6 right-6 z-10 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="max-h-[85vh] overflow-y-auto px-4 py-8">
                                <FormAspirante
                                    usuarioId={usuarioLocalStorage.id}
                                    onSuccess={() => { setMostrarForm(false); cargarDatos(); }}
                                    currentData={perfil}
                                    initialStep={formStep}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="dashboard-container bg-[var(--bg-main)] transition-colors duration-300">
            <div className="dashboard-wrapper">

                {!perfil.practicante && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dashboard-card bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-[var(--bg-card)] border-l-4 border-l-green-500 shadow-sm"
                    >
                        <h3 className="text-green-800 dark:text-green-400 font-bold mb-2 flex items-center gap-2">
                            <Rocket size={18} className="text-green-600 dark:text-green-400" /> {t('dashboard.practicante_promo_title')}
                        </h3>
                        <p className="profile-description text-green-700/70 dark:text-green-400/60 mb-4">
                            {t('dashboard.practicante_promo_desc')}
                        </p>
                        <button
                            className="dashboard-btn !bg-green-600 !text-white hover:!bg-green-700 dark:hover:!bg-green-500 shadow-md font-bold"
                            onClick={() => setIsModalOnboardingOpen(true)}
                        >
                            {t('dashboard.become_practicante')}
                        </button>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-card relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm"
                >
                    <div className="profile-header flex flex-col md:flex-row gap-8 items-start p-6">
                        <div className="relative group self-center md:self-start">
                            <img
                                className="profile-img w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl border-4 border-white dark:border-[var(--bg-card)] shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-800">
                                <Sparkles size={16} />
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="profile-name text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                        {perfil.nombre} {perfil.apellidos}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <span className="profile-career bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-green-200 dark:border-green-800/50">
                                            <GraduationCap className="w-4 h-4" /> {perfil.carrera || t('dashboard.student')}
                                        </span>
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-black rounded-lg uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                                            {perfil.estado_laboral}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                                            <MapPin size={12} /> {perfil.provincia}, {perfil.canton}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setFormStep(1); setMostrarForm(true); }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all text-sm shadow-lg shadow-slate-200 dark:shadow-none"
                                    >
                                        <Edit className="w-4 h-4" /> {t('dashboard.edit_profile')}
                                    </button>
                                </div>
                            </div>

                            <p className="profile-description mt-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl border-l-2 border-slate-100 dark:border-slate-800 pl-4">
                                {perfil.sobre_mi || t('dashboard.no_description')}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {[...perfil.habilidades_tecnicas, ...perfil.habilidades_blandas].slice(0, 8).map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -2 }}
                                        onMouseEnter={() => setSkillInfo(skill)}
                                        onMouseLeave={() => setSkillInfo(null)}
                                        className="relative flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all cursor-help"
                                    >
                                        {renderSkillIcon(skill.icon, "w-3 h-3 text-green-600 dark:text-green-400")}
                                        {skill.name}

                                        <AnimatePresence>
                                            {skillInfo === skill && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute bottom-full left-0 mb-2 p-3 w-56 bg-slate-900 dark:bg-slate-950 text-white text-[10px] rounded-xl shadow-2xl z-50 pointer-events-none border border-slate-800"
                                                >
                                                    {skill.desc}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="dashboard-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                            <div className="flex items-center justify-between mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">
                                <h3 className="flex items-center gap-2 text-slate-800 dark:text-white font-black uppercase tracking-wider text-sm !mb-0">
                                    <Briefcase size={18} className="text-green-600" /> {t('dashboard.experience')}
                                </h3>
                                <button
                                    onClick={() => { setFormStep(2); setMostrarForm(true); }}
                                    className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest bg-green-50 dark:bg-green-900/20 px-4 py-1.5 rounded-full border border-green-100 dark:border-green-800/50 hover:bg-green-100 transition-colors"
                                >
                                    {t('dashboard.add')}
                                </button>
                            </div>

                            {perfil.experiencia && perfil.experiencia.length > 0 ? (
                                <div className="space-y-8">
                                    {perfil.experiencia.map(exp => (
                                        <div key={exp.id} className="timeline-item border-l-2 border-slate-100 dark:border-slate-800 pl-6 pb-2 last:pb-0 relative">
                                            <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-green-500"></div>
                                            <div className="timeline-title font-black text-slate-800 dark:text-slate-200 flex justify-between items-start mb-1 text-base">
                                                {exp.puesto}
                                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-500 dark:text-slate-400 font-black uppercase tracking-tight">{exp.periodo}</span>
                                            </div>
                                            <div className="timeline-company text-green-600 dark:text-green-400 text-xs font-black uppercase tracking-widest mb-3">
                                                {exp.empresa}
                                            </div>
                                            <div className="timeline-description text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                                {exp.descripcion}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-800">
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">{t('dashboard.no_experience')}</p>
                                </div>
                            )}
                        </div>

                        <div className="dashboard-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                            <div className="flex items-center justify-between mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">
                                <h3 className="flex items-center gap-2 text-slate-800 dark:text-white font-black uppercase tracking-wider text-sm !mb-0">
                                    <FileText size={18} className="text-green-600" /> {t('dashboard.postulations')}
                                </h3>
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                    {perfil.postulaciones?.length || 0} Aplicaciones
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {perfil.postulaciones && perfil.postulaciones.length > 0 ? perfil.postulaciones.map(post => (
                                    <motion.div
                                        key={post.id}
                                        whileHover={{ y: -3 }}
                                        className="p-5 rounded-2xl border border-[var(--border-color)] hover:border-green-200 dark:hover:border-green-800 hover:bg-green-50/20 dark:hover:bg-green-900/10 transition-all group cursor-pointer shadow-sm hover:shadow-md bg-[var(--bg-card)]"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <strong className="text-base font-black text-slate-800 dark:text-slate-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-tight uppercase tracking-tight">{post.cargo}</strong>
                                            <span className={getBadgeClass(post.estado)}>
                                                {translateStatus(post.estado)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase border-t border-slate-50 dark:border-slate-800 pt-3 tracking-widest">
                                            <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-slate-300 dark:text-slate-600" /> {post.empresa}</span>
                                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-300 dark:text-slate-600" /> {post.fecha}</span>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="text-center py-12 col-span-full bg-slate-50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-50 dark:border-slate-700">
                                            <Briefcase className="w-8 h-8 text-slate-200 dark:text-slate-600" />
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">{t('dashboard.no_postulations')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="dashboard-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                            <h3 className="flex items-center gap-2 text-slate-800 dark:text-white font-black uppercase tracking-wider text-sm mb-6">
                                <User size={18} className="text-green-600" /> {t('dashboard.contact_details')}
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { icon: Users, label: t('dashboard.gender'), value: perfil.genero, color: 'green' },
                                    { icon: Phone, label: t('dashboard.phone'), value: perfil.telefono, color: 'blue' },
                                    { icon: MapPin, label: t('dashboard.location'), value: perfil.provincia, color: 'orange' },
                                    { icon: BookOpen, label: t('dashboard.education'), value: perfil.nivel_educativo, color: 'purple' }
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    const colors = {
                                        green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                                        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                                        orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
                                        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                    };
                                    return (
                                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${colors[item.color]}`}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.label}</p>
                                                <p className="text-sm font-black text-slate-800 dark:text-slate-200 capitalize">{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="dashboard-card bg-slate-900 dark:bg-slate-800 text-white p-6 rounded-3xl border-none shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Sparkles size={120} />
                            </div>
                            <h3 className="flex items-center gap-2 font-black uppercase tracking-wider text-sm mb-4 text-green-400 relative z-10">
                                <Bot size={18} /> {t('dashboard.ia_cv')}
                            </h3>
                            <p className="text-slate-400 text-xs mb-8 leading-relaxed font-medium relative z-10">{t('dashboard.ia_cv_desc')}</p>

                            <div className="space-y-3 relative z-10">
                                <button
                                    onClick={() => setMostrarCVIAModal(true)}
                                    className="w-full py-4 bg-green-600 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-green-500 transition-all shadow-lg shadow-green-950/40 uppercase tracking-widest"
                                >
                                    <Bot className="w-5 h-5" /> Generar con IA
                                </button>
                                <label className="w-full py-4 bg-white/10 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10 cursor-pointer uppercase tracking-widest">
                                    <UploadCloud className="w-5 h-5" /> Subir PDF
                                    <input type="file" className="hidden" accept=".pdf" onChange={(e) => alert("Simulación: " + e.target.files[0]?.name)} />
                                </label>
                            </div>
                        </div>

                        <div className="dashboard-card bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-sm relative overflow-hidden">
                            <div className="absolute top-[-20px] right-[-20px] p-3 opacity-[0.03] dark:opacity-[0.05]">
                                <Rocket size={100} className="text-green-600" />
                            </div>

                            <div className="flex items-center justify-between mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">
                                <h3 className="flex items-center gap-2 text-slate-800 dark:text-white font-black uppercase tracking-wider text-sm !mb-0">
                                    <Sparkles size={18} className="text-green-600" /> {t('dashboard.ia_matches')}
                                </h3>
                                {!analizandoIA && (
                                    <button onClick={cargarDondeRecomendar} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                        <Clock size={16} className="text-slate-400" />
                                    </button>
                                )}
                            </div>

                            {analizandoIA ? (
                                <div className="space-y-6 py-10">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-12 h-12 border-4 border-green-50 dark:border-green-900 border-t-green-500 rounded-full animate-spin"></div>
                                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 animate-pulse tracking-widest uppercase">Analizando mercado...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recomendaciones.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-700 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors uppercase tracking-tight">{job.cargo}</h4>
                                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1 uppercase tracking-widest">{job.empresa}</p>
                                                </div>
                                                <div className="bg-green-600 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-sm">
                                                    {job.match}%
                                                </div>
                                            </div>
                                            <button className="w-full py-3 bg-[var(--bg-card)] text-slate-700 dark:text-slate-300 border border-[var(--border-color)] hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white hover:border-green-600 font-black rounded-xl text-[10px] transition-all tracking-widest uppercase shadow-sm">
                                                {t('dashboard.apply_now')}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <AnimatePresence>
                {isModalOnboardingOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[var(--bg-card)] rounded-3xl w-full max-w-lg p-8 relative shadow-2xl transition-colors"
                        >
                            <button
                                onClick={() => setIsModalOnboardingOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 flex items-center gap-3 uppercase tracking-tight">
                                    <Rocket className="text-green-600" /> {t('dashboard.activate_internship')}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('dashboard.internship_desc')}</p>
                            </div>

                            <form onSubmit={handleBecomePracticante} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">{t('dashboard.institution')}</label>
                                    <input
                                        required
                                        name="nombre_programa"
                                        placeholder="Ej. Tecnológico de Costa Rica"
                                        value={formData.nombre_programa}
                                        onChange={handleFormChange}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white font-bold"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">{t('dashboard.level')}</label>
                                        <input
                                            required
                                            name="nivel_academico"
                                            placeholder="Ej. Bachiller"
                                            value={formData.nivel_academico}
                                            onChange={handleFormChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">{t('dashboard.total_hours')}</label>
                                        <input
                                            required
                                            type="number"
                                            name="horas_requeridas"
                                            placeholder="Ej. 320"
                                            value={formData.horas_requeridas}
                                            onChange={handleFormChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest">{t('dashboard.suggested_period')}</label>
                                    <input
                                        required
                                        name="periodo_practica"
                                        placeholder="Ej. Julio - Diciembre 2026"
                                        value={formData.periodo_practica}
                                        onChange={handleFormChange}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-green-500 outline-none bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-white font-bold"
                                    />
                                </div>

                                <button type="submit" className="w-full py-5 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 shadow-xl shadow-green-900/20 transition-all transform hover:scale-[1.02] active:scale-95 mt-6 uppercase tracking-widest text-sm">
                                    {t('dashboard.confirm_activate')}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mostrarForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl p-1 relative shadow-2xl my-auto transition-colors"
                        >
                            <button
                                onClick={() => setMostrarForm(false)}
                                className="absolute top-6 right-6 z-10 p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="max-h-[85vh] overflow-y-auto px-4 py-8">
                                <FormAspirante
                                    usuarioId={usuarioLocalStorage.id}
                                    currentData={perfil}
                                    initialStep={formStep}
                                    onSuccess={() => { setMostrarForm(false); cargarDatos(); }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CVIAModal
                isOpen={mostrarCVIAModal}
                onClose={() => setMostrarCVIAModal(false)}
                perfil={perfil}
            />
        </div>
    );
};

export default DashboardAspirante;