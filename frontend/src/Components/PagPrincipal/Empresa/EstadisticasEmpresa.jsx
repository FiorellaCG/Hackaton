import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';
import './EstadisticasEmpresa.css';

const EstadisticasEmpresa = () => {
    const [stats, setStats] = useState({
        totalVacantes: 0,
        activas: 0,
        postulaciones: 45 // mock data inicial
    });

    useEffect(() => {
        const vacantesList = JSON.parse(localStorage.getItem('vacantes_empresa') || '[]');
        setStats({
            totalVacantes: vacantesList.length,
            activas: vacantesList.filter(v => v.estado === 'Activa').length,
            postulaciones: vacantesList.length * 7 // Mock random
        });
    }, []);

    return (
        <div className="estadisticas-empresa-container">
            <h1 className="estadisticas-empresa-title">
                <BarChart3 size={24} color="#b1b900" /> Analíticas de Reclutamiento
            </h1>

            <div className="estadisticas-empresa-grid">
                <div className="estadisticas-card green">
                    <div className="estadisticas-icon-bg">
                        <Activity size={96} color="#b1b900" />
                    </div>
                    <p className="estadisticas-card-label">Total Vacantes Creadas</p>
                    <p className="estadisticas-card-value">{stats.totalVacantes}</p>
                </div>

                <div className="estadisticas-card gray">
                    <div className="estadisticas-icon-bg">
                        <TrendingUp size={96} color="#1988a6" />
                    </div>
                    <p className="estadisticas-card-label">Vacantes Activas</p>
                    <p className="estadisticas-card-value">{stats.activas}</p>
                </div>

                <div className="estadisticas-card light">
                    <div className="estadisticas-icon-bg">
                        <Users size={96} color="#1988a6" />
                    </div>
                    <p className="estadisticas-card-label">Total Postulaciones</p>
                    <p className="estadisticas-card-value">{stats.postulaciones}</p>
                </div>
            </div>

            <div className="estadisticas-chart-placeholder">
                (Gráfico de Tendencias Simulado)
            </div>
        </div>
    );
};

export default EstadisticasEmpresa;
