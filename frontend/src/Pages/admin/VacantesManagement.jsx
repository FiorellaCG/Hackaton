import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Filter, Edit2, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { obtenerVacantesAdmin, actualizarEstadoVacante } from '../../services/services';
import VacanteActionsModal from '../../Components/admin/VacanteActionsModal';

const VacantesManagement = () => {
    const { t } = useTranslation();
    const [allVacantes, setAllVacantes] = useState([]);
    const [filteredVacantes, setFilteredVacantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVacante, setSelectedVacante] = useState(null);

    useEffect(() => {
        fetchVacantes();
    }, []);

    const fetchVacantes = async () => {
        setLoading(true);
        try {
            const data = await obtenerVacantesAdmin();
            const normalizedVacantes = data.map(v => ({
                id: v.id,
                title: v.titulo,
                company: v.nombre_empresa || 'Empresa Directa',
                date: new Date(v.creado_en).toLocaleDateString(),
                isActive: v.activa,
                applications: v.total_postulaciones || 0
            }));
            setAllVacantes(normalizedVacantes);
            setFilteredVacantes(normalizedVacantes);
        } catch (error) {
            console.error('Error fetching vacantes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const results = allVacantes.filter(v => 
            v.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            v.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVacantes(results);
    }, [searchTerm, allVacantes]);

    const handleQuickToggle = async (vacante) => {
        try {
            const updated = await actualizarEstadoVacante(vacante.id, {
                activa: !vacante.isActive
            });
            const updatedList = allVacantes.map(v => 
                v.id === vacante.id ? { ...v, isActive: updated.activa } : v
            );
            setAllVacantes(updatedList);
        } catch (error) {
            console.error('Error toggling vacancy:', error);
        }
    };

    const handleActionClick = (vacante) => {
        setSelectedVacante(vacante);
        setIsModalOpen(true);
    };

    const handleSaveVacante = (updatedVacante) => {
        setAllVacantes(prev => prev.map(v => v.id === updatedVacante.id ? updatedVacante : v));
        setIsModalOpen(false);
    };

    const handleDeleteVacante = (id) => {
        setAllVacantes(prev => prev.filter(v => v.id !== id));
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-900/20">
                        <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
                            {t('admin.vacancies')}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
                            Monitoriza y gestiona todas las ofertas laborales del ecosistema.
                        </p>
                    </div>
                </div>
            </header>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center transition-colors">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Buscar por cargo o empresa..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <Filter className="w-4 h-4" />
                    Filtros
                </button>
            </div>

            {/* Vacancies Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Título de la vacante</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Empresa</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Estatus</th>
                                <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="px-6 py-8">
                                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredVacantes.length > 0 ? (
                                filteredVacantes.map((vacante) => (
                                    <tr key={vacante.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">{vacante.title}</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase mt-1">ID: #{vacante.id.split('-')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{vacante.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-slate-500">{vacante.date}</td>
                                        <td className="px-6 py-5">
                                            <button 
                                                onClick={() => handleQuickToggle(vacante)}
                                                className="flex items-center gap-2 group/toggle"
                                            >
                                                <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${vacante.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${vacante.isActive ? 'left-6' : 'left-1'}`}></div>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${vacante.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    {vacante.isActive ? 'Activada' : 'Desactivada'}
                                                </span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button 
                                                onClick={() => handleActionClick(vacante)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                                            >
                                                <Edit2 className="w-3 h-3" />
                                                Gestionar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-400 font-bold">No se encontraron vacantes con los criterios de búsqueda.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <VacanteActionsModal 
                isOpen={isModalOpen}
                vacante={selectedVacante}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveVacante}
                onDelete={handleDeleteVacante}
            />
        </div>
    );
};

export default VacantesManagement;
