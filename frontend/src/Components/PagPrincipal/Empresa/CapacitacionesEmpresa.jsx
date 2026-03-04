import React, { useState, useEffect } from 'react';
import { obtenerCapacitaciones, crearCapacitacion, obtenerMiPerfil } from '../../../services/services';
import { BookOpen, Plus, Trash2, Edit, Save, X, Calendar, Clock, Globe, MapPin, CheckCircle2 } from 'lucide-react';

const CapacitacionesEmpresa = () => {
    const [capacitaciones, setCapacitaciones] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const [empresaId, setEmpresaId] = useState(null);

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        modalidad: 'Virtual',
        duracion: '',
        fecha_inicio: '',
        url_inscripcion: '',
    });

    useEffect(() => {
        const fetchEmpresa = async () => {
            if (usuario.id) {
                try {
                    const perfil = await obtenerMiPerfil(usuario.id);
                    if (perfil.empresa_id) {
                        setEmpresaId(perfil.empresa_id);
                    }
                } catch (err) {
                    console.error("Error fetching profile for trainings:", err);
                }
            }
        };
        fetchEmpresa();
    }, [usuario.id]);

    useEffect(() => {
        if (empresaId) {
            loadCapacitaciones();
        }
    }, [empresaId]);

    const loadCapacitaciones = async () => {
        try {
            const data = await obtenerCapacitaciones();
            const misCaps = data.filter(c => c.empresa === empresaId);
            setCapacitaciones(misCaps);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, empresa: empresaId };
            await crearCapacitacion(payload);
            setIsAdding(false);
            setFormData({ titulo: '', descripcion: '', modalidad: 'Virtual', duracion: '', fecha_inicio: '', url_inscripcion: '' });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            loadCapacitaciones();
        } catch (error) {
            console.error(error);
            alert("Error al crear capacitación");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3 uppercase tracking-tight">
                        <BookOpen className="text-blue-500 w-8 h-8" /> Capacitaciones de Empresa
                    </h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Sube cursos y programas para captar y formar talento.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-6 py-4 bg-[#1a8641] hover:bg-green-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-95"
                >
                    {isAdding ? <><X size={18} /> Cancelar</> : <><Plus size={18} /> Publicar Capacitación</>}
                </button>
            </div>

            {showSuccess && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 text-green-700 dark:text-green-400 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 size={20} />
                    <span className="font-bold">¡Capacitación publicada con éxito!</span>
                </div>
            )}

            {isAdding && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl animate-in fade-in zoom-in-95">
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Título de la capacitación</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none text-slate-800 dark:text-white font-bold transition-all"
                                    placeholder="Ej. Introducción a AWS Cloud"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Modalidad</label>
                                <select
                                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none text-slate-800 dark:text-white font-bold transition-all appearance-none cursor-pointer"
                                    value={formData.modalidad}
                                    onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                                >
                                    <option value="Virtual">Virtual</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Híbrida">Híbrida</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Descripción del programa</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none text-slate-800 dark:text-white font-bold transition-all resize-none"
                                placeholder="Indica los temas a tratar, requisitos y beneficios..."
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Duración estimada</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        type="text"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none text-slate-800 dark:text-white font-bold transition-all"
                                        placeholder="Ej. 15 horas"
                                        value={formData.duracion}
                                        onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Fecha de inicio</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="date"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none text-slate-800 dark:text-white font-bold transition-all"
                                        value={formData.fecha_inicio}
                                        onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Link de inscripción / externa</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        type="url"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none text-slate-800 dark:text-white font-bold transition-all"
                                        placeholder="https://pagina-del-curso.com"
                                        value={formData.url_inscripcion}
                                        onChange={(e) => setFormData({ ...formData, url_inscripcion: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-[0.98] mt-4"
                        >
                            Publicar Ahora
                        </button>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {capacitaciones.map((cap) => (
                        <div key={cap.id} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border ${cap.modalidad.toLowerCase().includes('virtual')
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900'
                                            : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900'
                                        }`}>
                                        {cap.modalidad}
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 rounded-xl transition-colors"><Edit size={18} /></button>
                                        <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 uppercase tracking-tight leading-tight">{cap.titulo}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 font-medium leading-relaxed">{cap.descripcion}</p>

                                <div className="flex flex-wrap gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Clock size={14} className="text-slate-300" /> {cap.duracion}</span>
                                    <span className="flex items-center gap-2"><Calendar size={14} className="text-slate-300" /> {cap.fecha_inicio ? new Date(cap.fecha_inicio).toLocaleDateString() : 'Proximamente'}</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800">
                                <a href={cap.url_inscripcion} target="_blank" rel="noreferrer" className="text-xs font-black text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                                    Página de Inscripción <Globe size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && capacitaciones.length === 0 && !isAdding && (
                <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <BookOpen size={40} className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Aún no has publicado capacitaciones</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Comparte tus conocimientos y atrae a los mejores talentos de la zona.</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-8 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-green-600 font-black text-xs uppercase tracking-widest hover:bg-green-50 transition-all shadow-sm"
                    >
                        Crear mi primera capacitación
                    </button>
                </div>
            )}
        </div>
    );
};

export default CapacitacionesEmpresa;
