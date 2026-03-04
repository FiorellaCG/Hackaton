import React, { useState, useEffect } from 'react';
import { Users, Search, Check, X } from 'lucide-react';
import './AspirantesEmpresa.css';

const mockAspirantes = [
    { id: 1, candidatoName: 'Ana García', jobTitle: 'Frontend Dev', match: 98, status: 'Pendiente' },
    { id: 2, candidatoName: 'Luis Martínez', jobTitle: 'UI/UX Designer', match: 85, status: 'Pendiente' },
    { id: 3, candidatoName: 'Sofía Castro', jobTitle: 'Full Stack', match: 72, status: 'Rechazado' },
];

const AspirantesEmpresa = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [aspirantes, setAspirantes] = useState(mockAspirantes);

    useEffect(() => {
        const stored = localStorage.getItem('postulaciones_empresa');
        if (stored) {
            setAspirantes([...mockAspirantes, ...JSON.parse(stored)]);
        }
    }, []);

    const updateStatus = (id, newStatus) => {
        const updated = aspirantes.map(asp =>
            asp.id === id ? { ...asp, status: newStatus } : asp
        );
        setAspirantes(updated);

        const localData = updated.filter(a => a.id > 1000); // Filter out mock inputs that use small IDs
        if (localData.length > 0) {
            localStorage.setItem('postulaciones_empresa', JSON.stringify(localData));
        }
    };

    const filteredAspirantes = aspirantes.filter((asp) =>
        (asp.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asp.candidatoName || '').toLowerCase().includes(searchTerm.toLowerCase())
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
                                            <div className="aspirantes-candidate-avatar">{(asp.candidatoName || 'U').charAt(0)}</div>
                                            {asp.candidatoName}
                                        </div>
                                    </td>
                                    <td className="aspirantes-td font-medium">{asp.jobTitle}</td>
                                    <td className="aspirantes-td">
                                        <div className="aspirantes-match-container">
                                            <div className="aspirantes-match-bar-bg">
                                                <div className="aspirantes-match-bar-fill" style={{ width: `${asp.match}%` }}></div>
                                            </div>
                                            <span className="aspirantes-match-text">{asp.match}%</span>
                                        </div>
                                    </td>
                                    <td className="aspirantes-td">
                                        <span className={`aspirantes-badge ${asp.status === 'Pendiente' ? 'blue' :
                                            asp.status === 'Aceptado' ? 'green' : 'red'
                                            }`}>
                                            {asp.status}
                                        </span>
                                    </td>
                                    <td className="aspirantes-td" style={{ textAlign: 'right' }}>
                                        {asp.status === 'Pendiente' ? (
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
