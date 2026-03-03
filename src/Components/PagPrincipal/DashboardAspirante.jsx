import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    FileText,
    Calendar,
    Award,
    Rocket,
    CheckCircle2,
    BookOpen
} from 'lucide-react';

const DashboardAspirante = () => {
    // Datos ficticios del aspirante basados en el modelo, incluyendo la nueva estructura 'practicante'
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
        sobre_mi: 'Desarrolladora de software apasionada por la tecnología web y el diseño de interfaces de usuario. Busco oportunidades para crecer profesionalmente y aportar mis conocimientos en proyectos innovadores.',
        foto_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        habilidades: ['React', 'Node.js', 'Python', 'TailwindCSS', 'Git', 'SQL'],
        experiencia: [
            {
                id: 1,
                puesto: 'Desarrolladora Frontend Junior',
                empresa: 'TechSolutions CR',
                periodo: 'Ene 2022 - Presente',
                descripcion: 'Desarrollo de interfaces de usuario reactivas utilizando React y TailwindCSS.'
            },
            {
                id: 2,
                puesto: 'Pasante de Desarrollo',
                empresa: 'Innovaciones Digitales',
                periodo: 'Jun 2021 - Dic 2021',
                descripcion: 'Apoyo en el desarrollo de aplicaciones internas y mantenimiento de bases de datos.'
            }
        ],
        postulaciones: [
            { id: 1, empresa: 'CorpGlobal', puesto: 'Frontend Developer', estado: 'En revisión', fecha: '28 Feb 2026' },
            { id: 2, empresa: 'Startup Innova', puesto: 'React Engineer', estado: 'Entrevista', fecha: '15 Feb 2026' },
            { id: 3, empresa: 'DataSystems', puesto: 'Web Developer', estado: 'Rechazado', fecha: '10 Ene 2026' }
        ],
        // Toggle this to null to see the alternative state
        practicante: {
            nombre_programa: 'Programa de Excelencia Frontend',
            nivel_academico: 'Bachillerato Universitario',
            periodo_practica: 'I Cuatrimestre 2026',
            horas_requeridas: 300,
            estado_pasantia: 'En proceso',
            fecha_inicio: '2026-01-15',
            fecha_fin: '2026-04-30'
        }
        // practicante: null
    };

    const getStatusColor = (estado) => {
        switch (estado) {
            case 'En revisión': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Entrevista': return 'bg-green-100 text-green-800 border-green-200';
            case 'Rechazado': return 'bg-red-100 text-red-800 border-red-200';
            case 'En proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

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
                                    <Rocket size={16} className="text-yellow-300" />
                                    <span className="text-sm font-semibold tracking-wide text-white uppercase">Impulsa tu carrera</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                                    ¿Listo para tu Primera Experiencia Profesional?
                                </h2>
                                <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed mb-0">
                                    Si eres estudiante y necesitas realizar tu práctica o pasantía, activa tu perfil de Practicante y accede a oportunidades diseñadas en exclusiva para tu crecimiento.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="shrink-0 bg-white text-indigo-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 group"
                            >
                                Activar Perfil de Practicante
                                <Rocket size={20} className="text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Header / Perfil Principal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-80"></div>

                    <div className="relative">
                        <img
                            src={aspirante.foto_url}
                            alt={`${aspirante.nombre} ${aspirante.apellidos}`}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg z-10"
                        />
                        <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white title='Buscando empleo'"></div>
                    </div>

                    <div className="flex-1 text-center md:text-left z-10 w-full mt-4 md:mt-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{aspirante.nombre} {aspirante.apellidos}</h1>
                            {aspirante.practicante && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm w-fit mx-auto md:mx-0">
                                    <Award size={14} /> Perfil de Practicante Activo
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl text-blue-600 font-semibold">{aspirante.carrera}</h2>

                        <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed font-medium">
                            {aspirante.sobre_mi}
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3 text-sm font-medium text-slate-600">
                            <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-2 rounded-xl">
                                <Mail size={16} className="text-slate-400" /> <span>{aspirante.correo}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-2 rounded-xl">
                                <Phone size={16} className="text-slate-400" /> <span>{aspirante.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-2 rounded-xl">
                                <MapPin size={16} className="text-slate-400" /> <span>{aspirante.canton}, {aspirante.provincia}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col justify-between min-w-[240px] z-10 border-l border-slate-100 pl-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Estado Laboral</p>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold bg-blue-50 border border-blue-100 text-blue-700">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    {aspirante.estado_laboral}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nivel Educativo</p>
                                <span className="flex items-center gap-2 font-semibold text-slate-700">
                                    <GraduationCap size={18} className="text-indigo-500" />
                                    {aspirante.nivel_educativo}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CONDICIONAL: SI ES PRACTICANTE - SECCIÓN "MI PRIMERA OPORTUNIDAD" */}
                {aspirante.practicante && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-sm border border-indigo-100 p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-indigo-50 to-transparent"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            {/* Icon & Title */}
                            <div className="shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-2xl border border-indigo-200/50">
                                <BookOpen className="w-10 h-10 text-indigo-600" />
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-1">
                                            Mi Primera Oportunidad
                                        </h3>
                                        <p className="text-slate-500 font-medium">{aspirante.practicante.nombre_programa}</p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(aspirante.practicante.estado_pasantia)} shadow-sm whitespace-nowrap`}>
                                        {aspirante.practicante.estado_pasantia}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <GraduationCap size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Nivel Académico</span>
                                        </div>
                                        <p className="font-semibold text-slate-800">{aspirante.practicante.nivel_academico}</p>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                                            <Calendar size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Período</span>
                                        </div>
                                        <p className="font-semibold text-slate-800">{aspirante.practicante.periodo_practica}</p>
                                        <p className="text-xs text-slate-500 font-medium mt-1">{aspirante.practicante.fecha_inicio} al {aspirante.practicante.fecha_fin}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Columna Izquierda (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Experiencia Laboral */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                                    <Briefcase className="text-blue-600" /> Experiencia Laboral
                                </h3>
                                <button className="text-sm bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-xl hover:bg-blue-100 hover:text-blue-700 transition-colors">
                                    + Añadir
                                </button>
                            </div>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-200 before:via-blue-100 before:to-transparent">
                                {aspirante.experiencia.map((exp, index) => (
                                    <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <Briefcase size={14} />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                                            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 mb-3">
                                                <h4 className="font-bold text-lg text-slate-900">{exp.puesto}</h4>
                                                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full whitespace-nowrap">
                                                    {exp.periodo}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 mb-3">{exp.empresa}</p>
                                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{exp.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Habilidades */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                                <Award className="text-indigo-600" /> Habilidades Técnicas
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {aspirante.habilidades.map((hab, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors shadow-sm cursor-default"
                                    >
                                        <CheckCircle2 size={14} className="text-green-500" />
                                        {hab}
                                    </div>
                                ))}
                                <button className="px-5 py-2.5 border-2 border-dashed border-slate-200 text-slate-500 rounded-xl text-sm font-bold hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                                    <span className="text-lg leading-none">+</span> Añadir Skill
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Columna Derecha (1/3) */}
                    <div className="space-y-8">

                        {/* Mis Postulaciones */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                                    <FileText className="text-blue-600" /> Postulaciones
                                </h3>
                                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Ver todas</a>
                            </div>

                            <div className="space-y-4">
                                {aspirante.postulaciones.map((post) => (
                                    <div key={post.id} className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                                        <div className="flex justify-between items-start mb-3 gap-2">
                                            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{post.puesto}</h4>
                                            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${getStatusColor(post.estado)}`}>
                                                {post.estado}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
                                            <span className="flex items-center gap-1.5 font-semibold">
                                                <Briefcase size={14} className="text-slate-400" /> {post.empresa}
                                            </span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <Calendar size={14} className="text-slate-400" /> {post.fecha}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Información Personal Adicional */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                                <User className="text-indigo-600" /> Detalles Personales
                            </h3>

                            <ul className="space-y-4">
                                <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                                    <span className="font-semibold text-slate-500">Fecha de Nac.</span>
                                    <span className="font-bold text-slate-900">15 Ago 1995</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                                    <span className="font-semibold text-slate-500">Género</span>
                                    <span className="font-bold text-slate-900">{aspirante.genero}</span>
                                </li>
                                <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                                    <span className="font-semibold text-slate-500">Nacionalidad</span>
                                    <span className="font-bold text-slate-900">{aspirante.nacionalidad}</span>
                                </li>
                                <li className="flex justify-center items-center pt-2">
                                    <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl border border-slate-200 transition-colors">
                                        Editar Perfil Completo
                                    </button>
                                </li>
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAspirante;
