import React, { useState, useEffect } from 'react';
import { Users, Search, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './AspirantesEmpresa.css';
import { obtenerPostulacionesEmpresa, actualizarEstadoPostulacion } from '../../../services/services';

const AspirantesEmpresa = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [aspirantes, setAspirantes] = useState([]);
    const [loading, setLoading] = useState(true);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await obtenerPostulacionesEmpresa(usuario.id);
            setAspirantes(data);
        } catch (error) {
            console.error("Error al cargar aspirantes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (usuario.id) {
            fetchData();
        }
    }, [usuario.id]);

    const updateStatus = async (id, newStatus) => {
        try {
            await actualizarEstadoPostulacion(id, newStatus);
            fetchData();
        } catch (error) {
            alert("Error al actualizar el estado");
        }
    };

    const filteredAspirantes = aspirantes.filter((asp) =>
        (asp.vacante_obj?.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asp.aspirante_obj?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asp.aspirante_obj?.apellidos || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="aspirantes-empresa-container">
            <div className="aspirantes-header">
                <h1 className="aspirantes-empresa-title">
                    <Users size={24} color="#b1b900" /> Personas Aspirantes
                </h1>
                <div className="aspirantes-search-container">
                    <Search className="aspirantes-search-icon" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar aspirante o puesto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="aspirantes-search-input"
                    />
                </div>
            </div>

            <div className="aspirantes-table-wrapper">
                <table className="aspirantes-table">
                    <thead className="aspirantes-thead">
                        <tr>
                            <th scope="col" className="aspirantes-th">Candidato</th>
                            <th scope="col" className="aspirantes-th">Vacante Ofertada</th>
                            <th scope="col" className="aspirantes-th">Afinidad IA</th>
                            <th scope="col" className="aspirantes-th">Estado</th>
                            <th scope="col" className="aspirantes-th text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAspirantes.length > 0 ? (
                            filteredAspirantes.map((asp) => (
                                <tr key={asp.id} className="aspirantes-tr">
                                    <td className="aspirantes-td">
                                        <div className="aspirantes-candidate-info">
                                            <div className="aspirantes-candidate-avatar">{(asp.aspirante_obj?.nombre || 'U').charAt(0)}</div>
                                            {asp.aspirante_obj?.nombre} {asp.aspirante_obj?.apellidos}
                                        </div>
                                    </td>
                                    <td className="aspirantes-td font-medium">{asp.vacante_obj?.titulo}</td>
                                    <td className="aspirantes-td">
                                        <div className="aspirantes-match-container">
                                            <div className="aspirantes-match-bar-bg">
                                                <div className="aspirantes-match-bar-fill" style={{ width: `85%` }}></div>
                                            </div>
                                            <span className="aspirantes-match-text">85%</span>
                                        </div>
                                    </td>
                                    <td className="aspirantes-td">
                                        <span className={`aspirantes-badge ${asp.estado === 'pendiente' ? 'blue' :
                                            asp.estado === 'Aceptado' ? 'green' : 'red'
                                            }`}>
                                            {asp.estado}
                                        </span>
                                    </td>
                                    <td className="aspirantes-td" style={{ textAlign: 'right' }}>
                                        {asp.estado === 'pendiente' ? (
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button onClick={() => updateStatus(asp.id, 'Rechazado')} style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#ffebee', color: '#d32f2f', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                                    <X size={14} /> Rechazar
                                                </button>
                                                <button onClick={() => updateStatus(asp.id, 'Aceptado')} style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#e8f5e9', color: '#2e7d32', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                                    <Check size={14} /> Aceptar
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>Revisado</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#1988a6' }}>
                                    No se encontraron aspirantes que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AspirantesEmpresa;
