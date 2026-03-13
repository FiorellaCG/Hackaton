import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import Footer from '../Home/Footer';
import { useTranslation } from 'react-i18next';
import { Users, Mail, Phone, Briefcase, Award, CheckCircle2, UserPlus, Building2, User, Key, Star, FileSpreadsheet, Download, UploadCloud, Calendar, Video, Search } from 'lucide-react';
import { obtenerEmpresas, registerUser, crearPersona, crearPerfilAspirante, obtenerEstudiantesInstitucion, descargarPlantillaExcel, cargarExcelEstudiantes, obtenerEntrevistasInstitucion } from '../../../services/services';
import { useModal } from '../../../ModalContext';

const DashboardInstitucion = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showError, showSuccess: notifySuccess } = useModal();
    const [usuario, setUsuario] = useState(null);
    const [estudiantes, setEstudiantes] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [tempKey, setTempKey] = useState('');

    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        profesion: '',
        habilidadesTecnicas: '',
        habilidadesBlandas: '',
        habilidadDestacada: '',
        empresaId: ''
    });
    const [cargandoExcel, setCargandoExcel] = useState(false);
    const [entrevistas, setEntrevistas] = useState([]);
    const [loadingEntrevistas, setLoadingEntrevistas] = useState(true);
    const [searchFilter, setSearchFilter] = useState('');

    const filteredStudents = estudiantes.filter(s =>
        s.nombre.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.correo.toLowerCase().includes(searchFilter.toLowerCase())
    );

    useEffect(() => {
        const userStr = localStorage.getItem('usuario');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const initialUserData = JSON.parse(userStr);
        if (initialUserData.rol !== 'institucion') {
            navigate('/');
            return;
        }
        setUsuario(initialUserData);

        const cargarDatos = async () => {
            try {
                const emps = await obtenerEmpresas();
                setEmpresas(emps);

                // Ensure we have the institution ID
                let instId = initialUserData.id_institucion;
                if (!instId) {
                    const profile = await obtenerMiPerfil(initialUserData.id);
                    instId = profile.institucion_id;
                    // Update user in state and local storage for future reference
                    const updatedUser = { ...initialUserData, id_institucion: instId };
                    setUsuario(updatedUser);
                    localStorage.setItem('usuario', JSON.stringify(updatedUser));
                }

                if (instId) {
                    const studentsFromBackend = await obtenerEstudiantesInstitucion(instId);
                    const mappedStudents = studentsFromBackend.map(s => ({
                        id: s.id,
                        nombre: `${s.nombre} ${s.apellidos}`,
                        correo: s.correo,
                        password: s.password_plano,
                        profesion: s.nivel_educativo,
                        empresaId: s.empresa_recomendada,
                        telefono: s.telefono || 'N/A',
                        sobre_mi: s.sobre_mi
                    }));
                    setEstudiantes(mappedStudents);

                    // Cargar Entrevistas
                    const intsFromBackend = await obtenerEntrevistasInstitucion(instId);
                    setEntrevistas(intsFromBackend);
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoadingEntrevistas(false);
            }
        };
        cargarDatos();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const passwordTemp = Math.random().toString(36).slice(-8);
        setTempKey(passwordTemp);

        try {
            // 1. Crear el Usuario
            const userResponse = await registerUser({
                correo: formData.correo,
                telefono: formData.telefono,
                contrasena: passwordTemp,
                rol: 'aspirante'
            });

            const usuarioId = userResponse.id;

            // 2. Crear Persona y Perfil de Aspirante en un solo paso
            await crearPerfilAspirante({
                usuario_id: usuarioId,
                nombre: formData.nombre.split(' ')[0],
                apellidos: formData.nombre.split(' ').slice(1).join(' ') || 'No especificado',
                cedula: 'N/A',
                genero: 'Otro',
                nacionalidad: 'Honduras',
                telefono: formData.telefono,
                provincia: 'N/A',
                canton: 'N/A',
                carrera_id: null,
                nivel_educativo: 'universitario',
                estado_laboral: 'buscando',
                institucion_origen_id: usuario.id_institucion || null,
                empresa_recomendada_id: formData.empresaId || null,
                habilidades_tecnicas: formData.habilidadesTecnicas.split(',').map(s => s.trim()),
                habilidades_blandas: formData.habilidadesBlandas.split(',').map(s => s.trim()),
                sobre_mi: formData.habilidadDestacada
            });

            const nuevoEstudiante = {
                id: usuarioId,
                ...formData,
                password: passwordTemp,
                sobre_mi: formData.habilidadDestacada,
                recomendado_por: usuario.correo,
                fecha_registro: new Date().toLocaleDateString()
            };

            const nuevaLista = [...estudiantes, nuevoEstudiante];
            setEstudiantes(nuevaLista);
            localStorage.setItem(`estudiantes_${usuario.id}`, JSON.stringify(nuevaLista));

            setShowSuccess(true);
            setFormData({ nombre: '', telefono: '', correo: '', profesion: '', habilidadesTecnicas: '', habilidadesBlandas: '', habilidadDestacada: '', empresaId: '' });
            setTimeout(() => setShowSuccess(false), 20000); // 20 segundos para que el profesor anote la clave

        } catch (error) {
            console.error("Error al registrar estudiante:", error);
            showError("Error al registrar estudiante. Verifique los datos o la conexión.");
        }
    };

    const handleDescargarPlantilla = async () => {
        try {
            await descargarPlantillaExcel(usuario.id_institucion);
        } catch (error) {
            console.error("Error al descargar plantilla:", error);
            showError("No se pudo descargar la plantilla.");
        }
    };

    const handleSubirExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setCargandoExcel(true);
        try {
            const result = await cargarExcelEstudiantes(usuario.id_institucion, file);
            notifySuccess(result.message);
            // Recargar lista
            const studentsFromBackend = await obtenerEstudiantesInstitucion(usuario.id_institucion);
            const mappedStudents = studentsFromBackend.map(s => ({
                id: s.id,
                nombre: `${s.nombre} ${s.apellidos}`,
                correo: s.correo,
                password: s.password_plano,
                profesion: s.nivel_educativo,
                empresaId: s.empresa_recomendada,
                telefono: s.telefono || 'N/A',
                sobre_mi: s.sobre_mi
            }));
            setEstudiantes(mappedStudents);
        } catch (error) {
            console.error("Error al subir excel:", error);
            showError(error.error || "Error al procesar el archivo Excel.");
        } finally {
            setCargandoExcel(false);
            e.target.value = ''; // Reset input
        }
    };

    if (!usuario) return null;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Institucion */}
                    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#163a6d] to-[#1a8641] text-white rounded-[20px] flex items-center justify-center font-black text-2xl shadow-lg shadow-green-900/10">
                                    {usuario.correo.charAt(0).toUpperCase()}
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter leading-none">
                                        {usuario.nombre_institucion || "Tu Institución"}
                                    </h1>
                                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{usuario.correo} • Portal Institucional</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inscritos</span>
                                    <span className="text-xl font-black text-slate-800 dark:text-white leading-none">{estudiantes.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        {/* Sección Lateral: Registro y Excel */}
                        <div className="xl:col-span-4 space-y-8">
                            {/* Carga Masiva */}
                            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                                            <FileSpreadsheet size={24} />
                                        </div>
                                        <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Carga Masiva</h2>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Registra múltiples por Excel</p>
                                </div>
                                <div className="p-8 space-y-6">
                                    <button
                                        onClick={handleDescargarPlantilla}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border-2 border-transparent hover:border-blue-100 dark:hover:border-blue-900/50"
                                    >
                                        <Download size={16} />
                                        Descargar Plantilla
                                    </button>

                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".xlsx"
                                            onChange={handleSubirExcel}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            disabled={cargandoExcel}
                                        />
                                        <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed ${cargandoExcel ? 'bg-slate-50 border-slate-200' : 'border-blue-100 dark:border-blue-900/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/5'} rounded-[24px] transition-all`}>
                                            {cargandoExcel ? (
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-10 h-10 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Procesando...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-500 mb-4">
                                                        <UploadCloud size={28} />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-1 text-center">Subir Archivo Excel</span>
                                                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 text-center uppercase tracking-[0.1em]">Arrastra o selecciona</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registro Individual */}
                            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-[#1a8641] rounded-2xl text-white shadow-lg shadow-green-900/20">
                                            <UserPlus size={24} />
                                        </div>
                                        <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Registro Manual</h2>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Inscripción individual</p>
                                </div>
                                <div className="p-8">
                                    {showSuccess && (
                                        <div className="mb-8 p-5 bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400 rounded-2xl animate-in fade-in slide-in-from-top-4">
                                            <div className="flex items-center gap-3 font-black text-xs uppercase tracking-widest mb-3">
                                                <CheckCircle2 size={18} /> ¡Registrado!
                                            </div>
                                            <p className="text-[11px] font-bold mb-3 opacity-90">Contraseña temporal (Cópiala ahora):</p>
                                            <div className="bg-white dark:bg-slate-950 rounded-xl p-3 border border-green-200 dark:border-green-800">
                                                <p className="text-lg font-black text-slate-900 dark:text-white tracking-widest text-center select-all">{tempKey}</p>
                                            </div>
                                        </div>
                                    )}
                                    <form onSubmit={handleRegister} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Nombre Completo</label>
                                            <div className="relative group">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1a8641] transition-colors" />
                                                <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-[#1a8641] text-xs font-bold transition-all" placeholder="Nombre Estudiante" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Correo</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1a8641] transition-colors" />
                                                <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-[#1a8641] text-xs font-bold transition-all" placeholder="email@correo.com" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Habilidad Destacada</label>
                                            <div className="relative group">
                                                <Star className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1a8641] transition-colors" />
                                                <input type="text" name="habilidadDestacada" value={formData.habilidadDestacada} onChange={handleChange} className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-[#1a8641] text-xs font-bold transition-all" placeholder="Característica única" />
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full py-4 bg-slate-900 dark:bg-green-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-[#1a8641] active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none mt-4">
                                            Registrar Estudiante
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Listado de Estudiantes */}
                        <div className="xl:col-span-8 space-y-8">
                            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Entrevistas de Estudiantes</h2>
                                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Seguimiento de citas programadas</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    {loadingEntrevistas ? (
                                        <div className="flex justify-center py-20">
                                            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : entrevistas.length === 0 ? (
                                        <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest text-[10px]">No hay entrevistas programadas</div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {entrevistas.map((ent) => (
                                                <div key={ent.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 flex items-center justify-center font-black text-slate-800 dark:text-white uppercase">
                                                                {ent.empresa_nombre?.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{ent.empresa_nombre}</p>
                                                                <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tight leading-none">{ent.aspirante_nombre}</h4>
                                                            </div>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${ent.estado === 'confirmada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                            }`}>
                                                            {ent.estado}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                            <Calendar size={14} />
                                                            <span>{new Date(ent.fecha).toLocaleDateString()} • {ent.hora}</span>
                                                        </div>
                                                        {ent.meet_url && (
                                                            <a
                                                                href={ent.meet_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-black text-[10px] uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 p-2 rounded-xl border border-blue-100 dark:border-blue-900/50"
                                                            >
                                                                <Video size={14} />
                                                                Unirse con Google Meet
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[600px]">
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Base de Estudiantes</h2>
                                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Gestión de alumnos inscritos</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 pb-12">
                                    {/* Search Bar */}
                                    {estudiantes.length > 0 && (
                                        <div className="relative mb-8 group">
                                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Buscar por nombre o correo..."
                                                value={searchFilter}
                                                onChange={(e) => setSearchFilter(e.target.value)}
                                                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                            />
                                        </div>
                                    )}

                                    {filteredStudents.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-32 text-center">
                                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] flex items-center justify-center text-slate-300 mb-6">
                                                <Users size={40} />
                                            </div>
                                            <h3 className="text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-tight">No se encontraron estudiantes</h3>
                                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">{estudiantes.length === 0 ? 'Usa el panel lateral para añadir alumnos' : 'Intenta con otro término de búsqueda'}</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {filteredStudents.map((est) => (
                                                <div key={est.id} className="p-6 border border-slate-100 dark:border-slate-800 rounded-[28px] bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-green-500/30 transition-all group">
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-black text-slate-800 dark:text-white text-base leading-tight group-hover:text-green-600 transition-colors uppercase tracking-tight">{est.nombre}</h3>
                                                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">{est.profesion || 'Estudiante'}</p>
                                                            </div>
                                                            <div className="px-3 py-1 bg-green-500/10 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-green-500/20">Activo</div>
                                                        </div>

                                                        {est.sobre_mi && (
                                                            <div className="flex items-center gap-2 text-[9px] font-black text-[#b1b900] bg-yellow-500/10 dark:bg-yellow-500/5 px-3 py-2 rounded-xl border border-yellow-500/20">
                                                                <Star size={12} className="fill-[#b1b900]" />
                                                                <span className="uppercase">{est.sobre_mi}</span>
                                                            </div>
                                                        )}

                                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                                                            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                                <Mail size={14} className="opacity-50" /> {est.correo}
                                                            </div>
                                                            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                                <Phone size={14} className="opacity-50" /> {est.telefono}
                                                            </div>
                                                        </div>

                                                        <div className="pt-2">
                                                            <div className="flex items-center gap-3 px-4 py-3 bg-orange-500/10 dark:bg-orange-500/5 border border-orange-500/20 rounded-2xl group/key hover:border-orange-500/40 transition-all">
                                                                <Key size={14} className="text-orange-500" />
                                                                <div className="flex-1">
                                                                    <span className="block text-[8px] font-black text-orange-500/60 uppercase tracking-widest mb-0.5">Clave de Acceso</span>
                                                                    <span className="text-sm font-black text-orange-600 dark:text-orange-400 tracking-[0.2em] select-all cursor-copy">{est.password || '******'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardInstitucion;
