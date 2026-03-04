import React, { useState } from 'react';
import { Users, FileText, Download, Search } from 'lucide-react';
import './AspirantesEmpresa.css';

const mockAspirantes = [
    { id: 1, nombre: 'Ana García', puesto: 'Frontend Dev', match: 98, status: 'Nueva' },
    { id: 2, nombre: 'Luis Martínez', puesto: 'UI/UX Designer', match: 85, status: 'Entrevista' },
    { id: 3, nombre: 'Sofía Castro', puesto: 'Full Stack', match: 72, status: 'Descartado' },
];

const AspirantesEmpresa = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAspirantes = mockAspirantes.filter((asp) =>
        asp.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asp.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="aspirantes-empresa-container">
            <div className="aspirantes-header">
                <h1 className="aspirantes-empresa-title">
                    <Users size={24} color="#b1b900" /> Banco de Talentos
                </h1>
                <div className="aspirantes-search-container">
                    <Search className="aspirantes-search-icon" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar por profesión..."
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
                            <th scope="col" className="aspirantes-th">Postulación / Profesión</th>
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
                                            <div className="aspirantes-candidate-avatar">{asp.nombre.charAt(0)}</div>
                                            {asp.nombre}
                                        </div>
                                    </td>
                                    <td className="aspirantes-td font-medium">{asp.puesto}</td>
                                    <td className="aspirantes-td">
                                        <div className="aspirantes-match-container">
                                            <div className="aspirantes-match-bar-bg">
                                                <div className="aspirantes-match-bar-fill" style={{ width: `${asp.match}%` }}></div>
                                            </div>
                                            <span className="aspirantes-match-text">{asp.match}%</span>
                                        </div>
                                    </td>
                                    <td className="aspirantes-td">
                                        <span className={`aspirantes-badge ${asp.status === 'Nueva' ? 'blue' :
                                            asp.status === 'Entrevista' ? 'green' : 'red'
                                            }`}>
                                            {asp.status}
                                        </span>
                                    </td>
                                    <td className="aspirantes-td" style={{ textAlign: 'right' }}>
                                        <button className="aspirantes-btn-action">
                                            <FileText size={16} /> Perfil
                                        </button>
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
