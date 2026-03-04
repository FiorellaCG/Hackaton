import React, { useState, useEffect } from 'react';
import FiltersBar from '../../Components/admin/FiltersBar';
import { useTranslation } from "react-i18next";
import { obtenerProgramas } from '../../services/services';

const ProgramasManagement = () => {
    const { t } = useTranslation();
    const [programas, setProgramas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProgramas();
    }, []);

    const fetchProgramas = async () => {
        setLoading(true);
        try {
            const data = await obtenerProgramas();
            setProgramas(data);
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleProgramaState = async (id, currentState) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/programas-formacion/${id}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activo: !currentState })
            });
            await fetchProgramas();
        } catch (error) {
            alert('Error al actualizar programa');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase mb-6">{t('admin.analytics')}</h2>
            <FiltersBar />

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '12px' }}>{t('admin.program_name')}</th>
                            <th style={{ padding: '12px' }}>{t('admin.institution')}</th>
                            <th style={{ padding: '12px' }}>{t('admin.applicants_count')}</th>
                            <th style={{ padding: '12px' }}>{t('admin.status')}</th>
                            <th style={{ padding: '12px' }}>{t('admin.toggle')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                                </td>
                            </tr>
                        ) : programas.length > 0 ? (
                            programas.map((prog) => (
                                <tr key={prog.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{prog.nombre}</td>
                                    <td style={{ padding: '12px' }}>{prog.nombre_institucion || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>0</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ color: prog.activo ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                                            {prog.activo ? t('admin.activate') : t('admin.deactivate')}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => toggleProgramaState(prog.id, prog.activo)}
                                            style={{ padding: '6px 12px', backgroundColor: prog.activo ? '#dc3545' : '#1a8641', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            {prog.activo ? t('admin.deactivate') : t('admin.activate')}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No programs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgramasManagement;
