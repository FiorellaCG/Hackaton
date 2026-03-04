import React from 'react';
import { Mail, Search, MessageSquareX } from 'lucide-react';
import './MensajesEmpresa.css';

const mockMensajes = [
    { id: 1, remitente: 'Ana García', asunto: 'Consulta sobre vacante: Frontend Dev', fecha: '2 Mar', leido: false, match: true },
    { id: 2, remitente: 'Soporte GreenTalent', asunto: 'Nuevas características en tu panel', fecha: '28 Feb', leido: true, match: false },
    { id: 3, remitente: 'Luis Martínez', asunto: 'Disponibilidad para entrevista técnica', fecha: '25 Feb', leido: true, match: true },
];

const MensajesEmpresa = () => {
    return (
        <div className="mensajes-empresa-container">
            <div className="mensajes-header">
                <h1 className="mensajes-title">
                    <Mail size={24} color="#b1b900" /> Bandeja de Entrada
                </h1>
                <div className="mensajes-search-container">
                    <Search className="mensajes-search-icon" size={16} />
                    <input type="text" placeholder="Buscar mensajes..." className="mensajes-search-input" />
                </div>
            </div>

            <div className="space-y-4">
                {mockMensajes.length === 0 ? (
                    <div className="mensajes-empty">
                        <MessageSquareX size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
                        <p className="mensajes-empty-text">No hay mensajes nuevos.</p>
                    </div>
                ) : (
                    <div className="mensajes-list">
                        {mockMensajes.map(msg => (
                            <div key={msg.id} className={`mensajes-item ${!msg.leido ? 'unread' : 'read'}`}>
                                <div className="mensajes-item-content">
                                    <div className="mensajes-item-avatar-wrapper">
                                        {msg.remitente.charAt(0)}
                                        {!msg.leido && <div className="mensajes-unread-indicator"></div>}
                                    </div>
                                    <div className="mensajes-item-details">
                                        <div className="mensajes-item-header">
                                            <p className="mensajes-item-sender">
                                                {msg.remitente}
                                            </p>
                                            <p className="mensajes-item-date">{msg.fecha}</p>
                                        </div>
                                        <p className="mensajes-item-subject">
                                            {msg.asunto}
                                        </p>
                                    </div>
                                    {msg.match && (
                                        <span className="mensajes-item-badge">Candidato</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MensajesEmpresa;
