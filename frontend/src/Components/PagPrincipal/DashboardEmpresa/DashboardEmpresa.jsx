import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Briefcase, Users, BarChart3, Clock, Settings, Building2 } from "lucide-react";
import { obtenerMiPerfil } from "../../../services/services";

const DashboardEmpresa = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);
    const [perfil, setPerfil] = useState(null);
    const [stats, setStats] = useState({
        vacantesActivas: 3,
        candidatosPendientes: 12,
        entrevistasHoy: 2
    });

    const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario') || '{}');

    useEffect(() => {
        const cargarDatos = async () => {
            if (!usuarioLocalStorage.id) {
                navigate("/login");
                return;
            }

            try {
                const data = await obtenerMiPerfil(usuarioLocalStorage.id);
                // Si el perfil está incompleto (perfil_completo es false) la mandamos a completarlo
                if (data && data.perfil_completo === false) {
                    navigate("/mi-perfil");
                } else {
                    setPerfil(data);
                }
            } catch (error) {
                navigate("/mi-perfil");
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [navigate]);

    if (cargando) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Quick Actions / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors col-span-1 md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                            <Briefcase className="w-8 h-8" />
                            <div>
                                <p className="text-2xl font-black">{stats.vacantesActivas}</p>
                                <p className="text-xs font-bold uppercase tracking-wider">{t('dashboard.active_vacancies')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                            <Users className="w-8 h-8" />
                            <div>
                                <p className="text-2xl font-black">{stats.candidatosPendientes}</p>
                                <p className="text-xs font-bold uppercase tracking-wider">{t('dashboard.candidates')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                            <Clock className="w-8 h-8" />
                            <div>
                                <p className="text-2xl font-black">{stats.entrevistasHoy}</p>
                                <p className="text-xs font-bold uppercase tracking-wider">{t('dashboard.interviews_today')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a8641] dark:bg-green-600 p-6 rounded-3xl shadow-md text-white flex flex-col justify-center items-center text-center cursor-pointer hover:bg-green-700 transition-colors" onClick={() => navigate("/admin/content/vacantes")}>
                    <PlusCircle className="w-12 h-12 mb-3 opacity-90" />
                    <h3 className="font-bold text-lg leading-tight" dangerouslySetInnerHTML={{ __html: t('dashboard.publish_vacancy').replace(' ', '<br />') }}></h3>
                </div>
            </div>

            {/* Recientes */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                        <Briefcase className="text-green-600" /> {t('dashboard.recent_vacancies')}
                    </h3>
                    <Link to="/admin/content/vacantes" className="text-sm font-bold tracking-wide text-green-600 hover:text-green-700 transition-colors uppercase">
                        {t('dashboard.see_all')}
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs font-black">
                                <th className="pb-4">{t('dashboard.position')}</th>
                                <th className="pb-4">{t('dashboard.modality')}</th>
                                <th className="pb-4">{t('dashboard.candidates')}</th>
                                <th className="pb-4 text-right">{t('dashboard.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-700 dark:text-slate-300">
                            <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="py-4 font-bold text-slate-900 dark:text-white">Desarrollador Frontend React</td>
                                <td className="py-4"><span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">Híbrido</span></td>
                                <td className="py-4 font-black">8</td>
                                <td className="py-4 text-right">
                                    <button className="text-green-600 hover:underline font-semibold text-xs uppercase tracking-wide">{t('dashboard.manage')}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardEmpresa;
