import React from 'react';
import { motion } from 'framer-motion';
import "./DA.css";
import {
    User,
    Briefcase,
    FileText,
    Calendar,
    Award,
    CheckCircle2
} from 'lucide-react';

const DashboardAspirante = () => {

    const aspirante = {
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
        </div>
    );
};

export default DashboardAspirante;