<<<<<<< HEAD
import React from 'react';
import { motion } from 'framer-motion';
import "./DA.css";
=======
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
>>>>>>> c975a9f713806c5e1941e97a1031da003a413098
import {
    User,
    Briefcase,
    FileText,
    Calendar,
    Award,
<<<<<<< HEAD
    CheckCircle2
} from 'lucide-react';

const DashboardAspirante = () => {

    const aspirante = {
=======
    Rocket,
    CheckCircle2,
    BookOpen,
    X
} from 'lucide-react';

const DashboardAspirante = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        centro: '',
        nombre_programa: '',
        nivel_academico: '',
        periodo_practica: '',
        horas_requeridas: ''
    });

    const [aspirante, setAspirante] = useState({
>>>>>>> c975a9f713806c5e1941e97a1031da003a413098
        nombre: 'Ana',
        apellidos: 'García Pérez',
        correo: 'ana.garcia@email.com',
        telefono: '+506 8888-8888',
        provincia: 'San José',
        canton: 'Escazú',
        nacionalidad: 'Costarricense',
        fecha_nacimiento: '1995-08-15',
        genero: 'Femenino',
        nivel_educativo: 'Universitario',
        estado_laboral: 'Buscando empleo',
        carrera: 'Ingeniería en Sistemas',
        sobre_mi: 'Desarrolladora apasionada por la tecnología web.',
        foto_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        habilidades: ['React', 'Node.js', 'Python', 'SQL'],
        experiencia: [
            {
                id: 1,
                puesto: 'Desarrolladora Frontend Junior',
                empresa: 'TechSolutions CR',
                periodo: 'Ene 2022 - Presente',
                descripcion: 'Desarrollo de interfaces en React.'
            }
        ],
        postulaciones: [
            { id: 1, empresa: 'CorpGlobal', puesto: 'Frontend Developer', estado: 'En revisión', fecha: '28 Feb 2026' },
            { id: 2, empresa: 'Startup Innova', puesto: 'React Engineer', estado: 'Entrevista', fecha: '15 Feb 2026' }
        ],
        practicante: null
<<<<<<< HEAD
=======
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
>>>>>>> c975a9f713806c5e1941e97a1031da003a413098
    };

    const getBadgeClass = (estado) => {
        switch (estado) {
            case 'En revisión': return 'badge badge-yellow';
            case 'Entrevista': return 'badge badge-green';
            case 'Rechazado': return 'badge badge-red';
            default: return 'badge badge-blue';
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">

<<<<<<< HEAD
                {/* PERFIL */}
=======
                {/* CONDICIONAL: NO ES PRACTICANTE - TARJETA DESTACADA ONBOARDING */}
                {!aspirante.practicante && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-900 rounded-3xl shadow-xl overflow-hidden relative"
                    >
                        {/* Abstract background shapes */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

                        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-white max-w-2xl text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm shadow-sm mb-6">
                                    <GraduationCap size={16} className="text-yellow-300" />
                                    <span className="text-sm font-semibold tracking-wide text-white uppercase">Impulsa tu carrera</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                                    ¿Buscas tu primera experiencia profesional?
                                </h2>
                                <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed mb-0">
                                    Si eres estudiante y necesitas realizar tu práctica o pasantía, puedes activar el perfil de Practicante y acceder a funciones adicionales.
                                </p>
                            </div>

                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="shrink-0 bg-white text-indigo-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 group"
                            >
                                Convertirme en Practicante
                                <Rocket size={20} className="text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Header / Perfil Principal */}
>>>>>>> c975a9f713806c5e1941e97a1031da003a413098
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-card"
                >
                    <div className="profile-header">
                        <img
                            src={aspirante.foto_url}
                            alt="Perfil"
                            className="profile-img"
                        />

                        <div>
                            <h1 className="profile-name">
                                {aspirante.nombre} {aspirante.apellidos}
                            </h1>

                            <div className="profile-career">
                                {aspirante.carrera}
                            </div>

                            <p className="profile-description">
                                {aspirante.sobre_mi}
                            </p>

                            <span className="badge badge-blue">
                                {aspirante.estado_laboral}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* GRID PRINCIPAL */}
                <div className="dashboard-grid">

                    {/* IZQUIERDA */}
                    <div>

                        <div className="dashboard-card">
                            <h3>
                                <Briefcase size={18} /> Experiencia Laboral
                            </h3>

                            {aspirante.experiencia.map(exp => (
                                <div key={exp.id} className="timeline-item">
                                    <div className="timeline-title">
                                        {exp.puesto} ({exp.periodo})
                                    </div>
                                    <div className="timeline-company">
                                        {exp.empresa}
                                    </div>
                                    <div className="timeline-description">
                                        {exp.descripcion}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="dashboard-card">
                            <h3>
                                <Award size={18} /> Habilidades
                            </h3>

                            <div className="skills-container">
                                {aspirante.habilidades.map((hab, index) => (
                                    <div key={index} className="skill-item">
                                        <CheckCircle2 size={14} /> {hab}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* DERECHA */}
                    <div>

                        <div className="dashboard-card">
                            <h3>
                                <FileText size={18} /> Postulaciones
                            </h3>

                            {aspirante.postulaciones.map(post => (
                                <div key={post.id} className="postulacion-card">
                                    <strong>{post.puesto}</strong>
                                    <span className={getBadgeClass(post.estado)}>
                                        {post.estado}
                                    </span>
                                    <div>{post.empresa}</div>
                                    <div>
                                        <Calendar size={14} /> {post.fecha}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="dashboard-card">
                            <h3>
                                <User size={18} /> Detalles Personales
                            </h3>

                            <p>Género: {aspirante.genero}</p>
                            <p>Nacionalidad: {aspirante.nacionalidad}</p>
                            <p>Correo: {aspirante.correo}</p>
                            <p>Teléfono: {aspirante.telefono}</p>

                            <button className="dashboard-btn">
                                Editar Perfil
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* Modal para Convertirse en Practicante */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900">Perfil de Practicante</h3>
                                    <p className="text-sm text-slate-500 font-medium">Completa tu información académica</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleBecomePracticante} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Centro de formación</label>
                                    <input required type="text" name="centro" value={formData.centro} onChange={handleFormChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 bg-white" placeholder="Ej: Universidad Nacional" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Programa / Carrera</label>
                                    <input required type="text" name="nombre_programa" value={formData.nombre_programa} onChange={handleFormChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 bg-white" placeholder="Ej: Ingeniería en Sistemas" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Nivel Académico</label>
                                    <select required name="nivel_academico" value={formData.nivel_academico} onChange={handleFormChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 bg-white">
                                        <option value="">Selecciona tu nivel</option>
                                        <option value="Bachillerato Universitario">Bachillerato Universitario</option>
                                        <option value="Licenciatura">Licenciatura</option>
                                        <option value="Técnico Superior">Técnico Superior</option>
                                        <option value="Diplomado">Diplomado</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Periodo de práctica</label>
                                        <input required type="text" name="periodo_practica" value={formData.periodo_practica} onChange={handleFormChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 bg-white" placeholder="Ej: I Cuatrimestre 2026" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Horas requeridas</label>
                                        <input required type="number" name="horas_requeridas" value={formData.horas_requeridas} onChange={handleFormChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 bg-white" placeholder="Ej: 300" min="1" />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
                                    >
                                        Activar Modo
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardAspirante;