import React, { useEffect, useState } from 'react';
import { Building2, Globe, Mail, MapPin, Search, Edit, Sparkles, Building, Code, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { obtenerMiPerfil } from '../../../services/services';
import FormEmpresa from '../MiPerfil/FormEmpresa';

const PerfilEmpresa = () => {
    const [empresaData, setEmpresaData] = useState({
        nombre: 'Cargando...',
        descripcion: '...',
        contacto: '',
        correo: '',
        url_externa: '',
        url_imagen: '',
        ubicacion: '',
        sector: '',
        tamaño: ''
    });
    const [originalData, setOriginalData] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);

    const cargarPerfil = async () => {
        try {
            const usuarioStr = localStorage.getItem('usuario');
            if (usuarioStr) {
                const usuario = JSON.parse(usuarioStr);
                setUsuarioId(usuario.id);
                const data = await obtenerMiPerfil(usuario.id);

                if (data && data.perfil_completo) {
                    setOriginalData(data);
                    setEmpresaData({
                        nombre: data.nombre || "Empresa",
                        descripcion: data.descripcion || "Sin descripción proporcionada.",
                        contacto: data.nombre_contacto || "No registrado",
                        correo: data.correo_contacto || usuario.correo,
                        url_externa: data.url_externa || "No especificado",
                        url_imagen: data.logo_url || "",
                        ubicacion: data.ubicacion || "No especificada",
                        sector: data.sector || "No especificado",
                        tamaño: data.tamano_empresa || "No especificado"
                    });
                }
            }
        } catch (e) {
            console.error("Error cargando perfil de empresa:", e);
        }
    };

    useEffect(() => {
        cargarPerfil();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="dashboard-card relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl"
            >
                <div className="profile-header flex flex-col md:flex-row gap-8 items-start p-8">
                    <div className="relative group self-center md:self-start">
                        {empresaData.url_imagen ? (
                            <img
                                src={empresaData.url_imagen}
                                alt="Perfil Empresa"
                                className="profile-img w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl border-4 border-white dark:border-slate-900 shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white dark:border-slate-900 shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 bg-slate-100 flex items-center justify-center">
                                <Building2 size={64} className="text-slate-300" />
                            </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-[#b1b900] text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-800">
                            <Sparkles size={16} />
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="profile-name text-3xl md:text-4xl font-black text-[#163a6d] dark:text-white tracking-tight capitalize">
                                    {empresaData.nombre}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <span className="profile-career bg-[#1988a6]/10 text-[#1988a6] px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-[#1988a6]/20">
                                        <Code className="w-4 h-4" /> {empresaData.sector}
                                    </span>
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-black rounded-lg uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                                        <Building className="w-3 h-3 inline-block mr-1" /> {empresaData.tamaño}
                                    </span>
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                                        <MapPin size={12} /> {empresaData.ubicacion}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMostrarForm(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#163a6d] text-white font-bold rounded-2xl hover:bg-slate-800 transition-all text-sm shadow-lg shadow-slate-200 dark:shadow-none"
                                >
                                    <Edit className="w-4 h-4" /> Editar Perfil
                                </button>
                            </div>
                        </div>

                        <p className="profile-description mt-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl border-l-2 border-[#b1b900] pl-4">
                            {empresaData.descripcion}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1988a6]/10 flex items-center justify-center text-[#1988a6]">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contacto</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{empresaData.contacto}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#163a6d]/10 flex items-center justify-center text-[#163a6d]">
                                    <Globe size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sitio Web</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#b1b900] cursor-pointer">{empresaData.url_externa}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Modal de edición */}
            <AnimatePresence>
                {mostrarForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl"
                        >
                            <button
                                onClick={() => setMostrarForm(false)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>
                            <FormEmpresa
                                usuarioId={usuarioId}
                                currentData={originalData}
                                onSuccess={() => {
                                    setMostrarForm(false);
                                    cargarPerfil();
                                }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PerfilEmpresa;
