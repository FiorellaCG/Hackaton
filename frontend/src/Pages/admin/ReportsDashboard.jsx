import React, { useState, useEffect } from 'react';
import MetricsCards from '../../Components/admin/MetricsCards';
import ChartsSection from '../../Components/admin/ChartsSection';
import FiltersBar from '../../Components/admin/FiltersBar';
import ReportsExport from '../../Components/admin/ReportsExport';
import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { obtenerEstadisticasGeneral } from '../../services/services';

const ReportsDashboard = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await obtenerEstadisticasGeneral();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    return (
        <div className="p-6 lg:p-8 flex flex-col gap-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-lg">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Analytics & Reports</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Monitoring GreenTalent System performance</p>
                    </div>
                </div>
                <ReportsExport />
            </header>

            <section className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
                <FiltersBar />
            </section>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            ) : (
                <MetricsCards stats={stats} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <ChartsSection title="User Registration Trends" type="line" />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <ChartsSection title="Roles Distribution" type="pie" />
                    </div>
                </div>
            </div>

            <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <ChartsSection title="Monthly Active Participants (Companies vs Students)" type="bar" />
            </section>
        </div>
    );
};

export default ReportsDashboard;
