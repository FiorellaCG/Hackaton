import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Briefcase,
    Target,
    Trophy,
    TrendingUp,
    BarChart3,
    PieChart as PieChartIcon
} from "lucide-react";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import { obtenerEstadisticasGeneral } from "../../services/services";
import "./StatsPage.css";

const StatsPage = () => {
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

    if (loading) {
        return (
            <div className="stats-loading">
                <div className="loader"></div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="stats-page">
            <Navbar />

            <main className="stats-container">
                <header className="stats-header">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="stats-title"
                    >
                        Impacto <span className="highlight">GreenTalent</span>
                    </motion.h1>
                    <p className="stats-subtitle">
                        Visualiza el crecimiento de nuestro ecosistema de talento y sostenibilidad en tiempo real.
                    </p>
                </header>

                {/* Totales */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="stats-grid"
                >
                    <StatCard
                        icon={<Users className="stat-icon" />}
                        value={stats?.total_estudiantes}
                        label="Talento Registrado"
                        color="blue"
                    />
                    <StatCard
                        icon={<Building2 className="stat-icon" />}
                        value={stats?.total_empresas}
                        label="Empresas Aliadas"
                        color="green"
                    />
                    <StatCard
                        icon={<Briefcase className="stat-icon" />}
                        value={stats?.total_vacantes}
                        label="Oportunidades"
                        color="purple"
                    />
                    <StatCard
                        icon={<Trophy className="stat-icon" />}
                        value={`${stats?.tasa_colocacion}%`}
                        label="Tasa de Éxito"
                        color="gold"
                    />
                </motion.section>

                {/* Gráficos / Distribución */}
                <section className="charts-section">
                    <div className="chart-wrapper">
                        <div className="chart-header">
                            <BarChart3 className="chart-title-icon" />
                            <h3>Oportunidades por Sector</h3>
                        </div>
                        <div className="bar-chart">
                            {stats?.vacantes_por_area?.slice(0, 5).map((area, index) => (
                                <div key={index} className="bar-item">
                                    <div className="bar-label">{area.area_trabajo__nombre || "Otros"}</div>
                                    <div className="bar-container">
                                        <motion.div
                                            className="bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(area.count / stats.total_vacantes) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        ></motion.div>
                                        <span className="bar-value">{area.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-wrapper">
                        <div className="chart-header">
                            <PieChartIcon className="chart-title-icon" />
                            <h3>Talento por Especialidad</h3>
                        </div>
                        <div className="specialty-list">
                            {stats?.estudiantes_por_carrera?.slice(0, 5).map((carrera, index) => (
                                <div key={index} className="specialty-item">
                                    <div className="specialty-dot" style={{ backgroundColor: `hsl(${index * 40}, 70%, 50%)` }}></div>
                                    <span className="specialty-name">{carrera.carrera__nombre || "General"}</span>
                                    <span className="specialty-count">{carrera.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sección de Crecimiento */}
                <section className="growth-section">
                    <div className="growth-content">
                        <h2>Impulsando el Futuro</h2>
                        <p>Nuestra plataforma conecta el talento emergente con las necesidades del mercado, fomentando la innovación y la sostenibilidad en la Zona Franca La Lima.</p>
                        <div className="growth-metrics">
                            <div className="growth-metric">
                                <TrendingUp className="growth-icon" />
                                <div>
                                    <h4>+15%</h4>
                                    <p>Crecimiento mensual</p>
                                </div>
                            </div>
                            <div className="growth-metric">
                                <Target className="growth-icon" />
                                <div>
                                    <h4>98%</h4>
                                    <p>Satisfacción de empresas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="growth-image-container">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                            alt="Data visualization"
                            className="growth-image"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <motion.div
        variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        }}
        className={`stat-card ${color}`}
    >
        <div className="stat-icon-wrapper">
            {icon}
        </div>
        <div className="stat-content">
            <h2 className="stat-value">{value}</h2>
            <p className="stat-label">{label}</p>
        </div>
    </motion.div>
);

export default StatsPage;
