import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Mail, User, ShieldCheck, Plus, Check, AlertCircle, Phone, Lock, FileText, Landmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { registerUser, crearPerfilEmpresa, crearPerfilInstitucion } from '../../services/services';

const CreateCompanyInstitutionForm = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        rol: 'empresa',
        nombre_completo: '',
        correo: '',
        telefono: '',
        contrasena: '',
        nombre_contacto: '',
        correo_contacto: '',
        descripcion: '', // For Empresa
        tipo: 'educativa', // For Institucion
        titulo: 'Centro Educativo', // For Institucion
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Register User Base
            const userResponse = await registerUser({
                nombre_completo: formData.nombre_completo,
                correo: formData.correo,
                telefono: formData.telefono,
                contrasena: formData.contrasena,
                rol: formData.rol,
                consentimiento: true
            });

            // 2. Create Profile
            if (formData.rol === 'empresa') {
                await crearPerfilEmpresa({
                    usuario_id: userResponse.id,
                    nombre: formData.nombre_completo,
                    nombre_contacto: formData.nombre_contacto || formData.nombre_completo,
                    correo_contacto: formData.correo_contacto || formData.correo,
                    descripcion: formData.descripcion,
                });
            } else {
                await crearPerfilInstitucion({
                    usuario_id: userResponse.id,
                    nombre: formData.nombre_completo,
                    nombre_contacto: formData.nombre_contacto || formData.nombre_completo,
                    correo_contacto: formData.correo_contacto || formData.correo,
                    tipo: formData.tipo,
                    titulo: formData.titulo
                });
            }

            setSuccess(true);
            setFormData({
                rol: 'empresa',
                nombre_completo: '',
                correo: '',
                telefono: '',
                contrasena: '',
                nombre_contacto: '',
                correo_contacto: '',
                descripcion: '',
                tipo: 'educativa',
                titulo: 'Centro Educativo',
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Error al crear la cuenta. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12 text-center">
                <div className="inline-flex p-4 bg-green-500/10 rounded-3xl mb-6">
                    <ShieldCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">
                    Registro de Entidades
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
                    Crea cuentas oficiales para empresas aliadas e instituciones educativas que deseen formar parte de la plataforma.
                </p>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-500">
                <form onSubmit={handleSubmit} className="p-10 lg:p-14">
                    {/* Role Selection Tabs */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-12 max-w-md mx-auto">
                        <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, rol: 'empresa' }))}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.rol === 'empresa' ? 'bg-white dark:bg-slate-700 text-green-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            <Building2 size={16} />
                            Empresa
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, rol: 'institucion' }))}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.rol === 'institucion' ? 'bg-white dark:bg-slate-700 text-green-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            <Landmark size={16} />
                            Institución
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Section 1: User Credentials */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black">01</span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Credenciales de Acceso</h3>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Correo Institucional</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                    <input
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                        placeholder="admin@organizacion.com"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Contraseña Inicial</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                    <input
                                        type="password"
                                        name="contrasena"
                                        value={formData.contrasena}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Profile Details */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black">02</span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Información de Perfil</h3>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nombre de la Organización</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="nombre_completo"
                                        value={formData.nombre_completo}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                        placeholder="Ej. Green Global Corp"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Teléfono</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                        placeholder="+504 9999-9999"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Extra Info based on role */}
                    <div className="mt-12 space-y-8 border-t border-slate-100 dark:border-slate-800 pt-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black">03</span>
                            <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Detalles Adicionales</h3>
                        </div>

                        {formData.rol === 'empresa' ? (
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Descripción de la Empresa</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white resize-none"
                                        placeholder="Breve reseña sobre la empresa y su giro..."
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Tipo de Institución</label>
                                    <select
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                    >
                                        <option value="universidad">Universidad</option>
                                        <option value="tecnico">Instituto Técnico</option>
                                        <option value="gobierno">Gubernamental</option>
                                        <option value="ong">ONG / Social</option>
                                    </select>
                                </div>
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Título / Rango</label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-bold text-slate-700 dark:text-white"
                                        placeholder="Ej. Centro de Formación Superior"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-xl flex items-center gap-3"
                            >
                                <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-bold text-red-700 dark:text-red-400">{error}</p>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-3xl flex flex-col items-center gap-4 text-center"
                            >
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <Check className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-green-800 dark:text-green-400 uppercase tracking-tight">Cuenta Registrada</h4>
                                    <p className="text-sm font-bold text-green-700/70 dark:text-green-500/70">La entidad ha sido creada exitosamente y puede iniciar sesión.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <div className="mt-14">
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm uppercase tracking-[0.2em] shadow-2xl ${loading || success
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                : 'bg-[#1a8641] text-white hover:bg-green-600 shadow-green-900/40 hover:-translate-y-1'
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : success ? (
                                <>
                                    <Check size={18} />
                                    ¡Registrado!
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Crear Cuenta Oficial
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyInstitutionForm;
