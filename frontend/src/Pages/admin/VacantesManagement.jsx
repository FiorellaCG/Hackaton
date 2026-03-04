import React, { useState, useEffect } from 'react';
import FiltersBar from '../../Components/admin/FiltersBar';
import { useTranslation } from "react-i18next";
import { obtenerVacantesAdmin } from '../../services/services';

const VacantesManagement = () => {
    const { t } = useTranslation();
    const [vacantes, setVacantes] = useState([]);
    const [loading, setLoading] = useState(true);

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
                isActive: v.activa
            }));
            setVacantes(normalizedVacantes);
        } catch (error) {
            console.error('Error fetching vacantes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/vacantes/${id}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activa: !currentStatus })
            });
            await fetchVacantes();
        } catch (error) {
            alert('Error al actualizar vacante');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase">{t('admin.vacancies')}</h2>
                <button
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-95"
                >
                    + {t('admin.manage')}
                </button>
            </div>

            <FiltersBar onFilterChange={(filters) => console.log('Filters applied:', filters)} />

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '10px' }}>Title</th>
                            <th style={{ padding: '10px' }}>Company</th>
                            <th style={{ padding: '10px' }}>Date Posted</th>
                            <th style={{ padding: '10px' }}>Status</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacantes.length > 0 ? (
                            vacantes.map((vacante) => (
                                <tr key={vacante.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>{vacante.title}</td>
                                    <td style={{ padding: '10px' }}>{vacante.company}</td>
                                    <td style={{ padding: '10px' }}>{vacante.date}</td>
                                    <td style={{ padding: '10px' }}>
                                        <span style={{ color: vacante.isActive ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                                            {vacante.isActive ? t('admin.activate') : t('admin.deactivate')}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <button
                                            onClick={() => handleToggleStatus(vacante.id, vacante.isActive)}
                                            style={{ padding: '5px 10px', backgroundColor: vacante.isActive ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            {vacante.isActive ? t('admin.deactivate') : t('admin.activate')}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '15px', textAlign: 'center', color: '#888' }}>
                                    No vacancies found. Ready for backend data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VacantesManagement;
