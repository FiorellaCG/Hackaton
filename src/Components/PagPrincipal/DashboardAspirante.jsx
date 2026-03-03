import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./DA.css";
import {
    User,
    Briefcase,
    FileText,
    Calendar,
    Award,
    Rocket,
    CheckCircle2,
    BookOpen,
    X,
    GraduationCap
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

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">

                {/* TARJETA SI NO ES PRACTICANTE */}
                {!aspirante.practicante && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dashboard-card"
                    >
                        <h3>
                            <Rocket size={18} /> ¿Buscas tu primera experiencia?
                        </h3>

                        <p className="profile-description">
                            Activa tu perfil de Practicante para acceder a oportunidades académicas.
                        </p>

                        <button
                            className="dashboard-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Convertirme en Practicante
                        </button>
                    </motion.div>
                )}

                {/* PERFIL */}
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

                {/* GRID */}
                <div className="dashboard-grid">

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

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-backdrop"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="modal-container"
                        >
                            <button onClick={() => setIsModalOpen(false)}>
                                <X />
                            </button>

                            <form onSubmit={handleBecomePracticante}>
                                <input
                                    required
                                    name="nombre_programa"
                                    placeholder="Programa"
                                    value={formData.nombre_programa}
                                    onChange={handleFormChange}
                                />

                                <input
                                    required
                                    name="nivel_academico"
                                    placeholder="Nivel Académico"
                                    value={formData.nivel_academico}
                                    onChange={handleFormChange}
                                />

                                <input
                                    required
                                    name="periodo_practica"
                                    placeholder="Periodo"
                                    value={formData.periodo_practica}
                                    onChange={handleFormChange}
                                />

                                <input
                                    required
                                    type="number"
                                    name="horas_requeridas"
                                    placeholder="Horas"
                                    value={formData.horas_requeridas}
                                    onChange={handleFormChange}
                                />

                                <button type="submit" className="dashboard-btn">
                                    Activar Perfil
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default DashboardAspirante;