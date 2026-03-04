import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import Footer from '../Home/Footer';
import { useTranslation } from 'react-i18next';
import { Users, Mail, Phone, Briefcase, Award, CheckCircle2, UserPlus, Building2, User } from 'lucide-react';
import { obtenerEmpresas, registerUser, crearPersona, crearPerfilAspirante, enviarCredenciales } from '../../../services/services';

const DashboardInstitucion = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
        empresaId: ''
    });

    useEffect(() => {
        const userStr = localStorage.getItem('usuario');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userStr);
        if (user.rol !== 'institucion') {
            navigate('/');
            return;
        }
        setUsuario(user);

        const cargarDatos = async () => {
            try {
                const emps = await obtenerEmpresas();
                setEmpresas(emps);

                const stored = localStorage.getItem(`estudiantes_${user.id}`);
                if (stored) {
                    setEstudiantes(JSON.parse(stored));
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
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
                habilidades_blandas: formData.habilidadesBlandas.split(',').map(s => s.trim())
            });

            const nuevoEstudiante = {
                id: usuarioId,
                ...formData,
                recomendado_por: usuario.correo,
                fecha_registro: new Date().toLocaleDateString()
            };

            const nuevaLista = [...estudiantes, nuevoEstudiante];
            setEstudiantes(nuevaLista);
            localStorage.setItem(`estudiantes_${usuario.id}`, JSON.stringify(nuevaLista));

            // 4. Enviar correo virtual al estudiante con sus credenciales
            try {
                await enviarCredenciales({
                    correo: formData.correo,
                    contrasena: passwordTemp,
                    nombre: formData.nombre.split(' ')[0],
                    institucion: usuario.nombre || usuario.correo
                });
            } catch (err) {
                console.warn('No se pudo enviar el correo:', err);
            }

            setShowSuccess(true);
            setFormData({ nombre: '', telefono: '', correo: '', profesion: '', habilidadesTecnicas: '', habilidadesBlandas: '', empresaId: '' });
            setTimeout(() => setShowSuccess(false), 8000);

        } catch (error) {
            console.error("Error al registrar estudiante:", error);
            alert("Error al registrar estudiante. Verifique los datos o la conexión.");
        }
    };

    if (!usuario) return null;

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-main)]">
            <Navbar />

            <main className="flex-grow pt-28 pb-16 px-4">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header Institucion */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-[#163a6d] text-white rounded-xl flex items-center justify-center font-bold text-xl">
                                {usuario.correo.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                                    {t('dashboard_inst.portal_title')}
                                </h1>
                                <p className="text-slate-500 font-medium">{usuario.correo}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Formulalio Reg. Estudiante */}
                        <div className="lg:col-span-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl h-fit">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                                <UserPlus className="text-[#b1b900] w-6 h-6" /> {t('dashboard_inst.add_student')}
                            </h2>
                            {showSuccess && (
                                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 text-green-700 dark:text-green-400 rounded-xl">
                                    <div className="flex items-center gap-2 font-bold mb-1"><CheckCircle2 size={18} /> ¡Estudiante Registrado!</div>
                                    <p className="text-sm">Se le envió un correo con su contraseña temporal: <strong className="text-slate-900 dark:text-white bg-green-200 dark:bg-green-600 px-1 rounded">{tempKey}</strong></p>
                                </div>
                            )}
                            <form onSubmit={handleRegister} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Nombre Completo</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                        <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all" placeholder="Ej. Juan Pérez" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Teléfono</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                        <input required type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all" placeholder="+504 9999-9999" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Correo Electrónico</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                        <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all" placeholder="juan@correo.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Profesión / Carrera</label>
                                    <div className="relative group">
                                        <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                        <input required type="text" name="profesion" value={formData.profesion} onChange={handleChange} className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all" placeholder="Ej. Ingeniero Industrial" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Habilidades Técnicas</label>
                                    <div className="relative group">
                                        <Award className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                        <input required type="text" name="habilidadesTecnicas" value={formData.habilidadesTecnicas} onChange={handleChange} className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all" placeholder="Ej. AutoCAD, Excel, Python" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Habilidades Blandas</label>
                                    <div className="relative group">
                                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                                        <input required type="text" name="habilidadesBlandas" value={formData.habilidadesBlandas} onChange={handleChange} className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all" placeholder="Ej. Liderazgo, Comunicación" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Seleccionar Empresa Recomendada</label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors pointer-events-none" />
                                        <select
                                            name="empresaId"
                                            value={formData.empresaId}
                                            onChange={handleChange}
                                            className="w-full pl-14 pr-12 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">-- {t('dashboard_inst.select_company') || 'Ninguna (Opcional)'} --</option>
                                            {empresas.map(emp => (
                                                <option key={emp.id} value={emp.id}>{emp.nombre}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-green-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl text-xs uppercase tracking-[0.2em] transform transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 mt-4">
                                    {t('dashboard_inst.register_btn') || 'Inscribir Estudiante'}
                                </button>
                            </form>
                        </div>

                        {/* Listado de Estudiantes */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                                    <Users className="text-[#163a6d] dark:text-blue-400 w-6 h-6" /> {t('dashboard_inst.student_list')}
                                </h2>
                                Gabri

                                {estudiantes.length === 0 ? (
                                    <div className="text-center py-20 text-slate-500">
                                        No has registrado estudiantes aún.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {estudiantes.map((est) => (
                                            <div key={est.id} className="p-5 border border-slate-100 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:border-[#1a8641] transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                                <div>
                                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{est.nombre}</h3>
                                                    <p className="text-xs font-bold text-[#b1b900] uppercase tracking-widest mb-2">
                                                        {est.profesion}
                                                        {est.empresaId && (
                                                            <span className="text-slate-400 font-normal"> • Recomendado a: {empresas.find(e => e.id == est.empresaId)?.nombre || 'Empresa'}</span>
                                                        )}
                                                    </p>
                                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-slate-500 font-medium">
                                                        <span className="flex items-center gap-1.5"><Mail size={14} /> {est.correo}</span>
                                                        <span className="flex items-center gap-1.5"><Phone size={14} /> {est.telefono}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] uppercase font-bold tracking-widest rounded-lg border border-blue-100 dark:border-blue-900">
                                                        Enviado
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
