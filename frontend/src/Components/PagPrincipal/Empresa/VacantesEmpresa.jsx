import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, CircleSlash, Rocket } from 'lucide-react';
import './VacantesEmpresa.css';

const VacantesEmpresa = () => {
    const [vacantes, setVacantes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [nueva, setNueva] = useState({ titulo: '', descripcion: '', ubicacion: '', modalidad: 'Presencial', tipo: 'Empleo', horario: '', requisitos: '' });

    useEffect(() => {
        const stored = localStorage.getItem('vacantes_empresa');
        if (stored) {
            setVacantes(JSON.parse(stored));
        }
    }, []);

    const handleChange = (e) => setNueva({ ...nueva, [e.target.name]: e.target.value });

    const handleCreate = (e) => {
        e.preventDefault();
        const nuevaVacante = { ...nueva, id: Date.now(), estado: 'Activa', postulantes: 0 };
        const updated = [...vacantes, nuevaVacante];
        setVacantes(updated);
        localStorage.setItem('vacantes_empresa', JSON.stringify(updated));
        setShowForm(false);
        setNueva({ titulo: '', descripcion: '', ubicacion: '', modalidad: 'Presencial', tipo: 'Empleo', horario: '', requisitos: '' });
    };

    const handleDelete = (id) => {
        const updated = vacantes.filter(v => v.id !== id);
        setVacantes(updated);
        localStorage.setItem('vacantes_empresa', JSON.stringify(updated));
    };

    return (
        <div className="vacantes-empresa-container">
            <div className="vacantes-header">
                <h1 className="vacantes-title">
                    <Briefcase size={24} color="#b1b900" /> Mis Vacantes
                </h1>
                <button onClick={() => setShowForm(!showForm)} className="vacantes-btn-primary">
                    {showForm ? 'Cerrar Formulario' : <><Plus size={16} /> Publicar</>}
                </button>
            </div>

            {showForm && (
                <div className="vacantes-form-container">
                    <h3 className="vacantes-form-title">
                        <Rocket size={16} color="#b1b900" /> Nueva Vacante
                    </h3>
                    <form onSubmit={handleCreate}>
                        <div className="vacantes-form-grid">
                            <div className="vacantes-form-group">
                                <label className="vacantes-label">Título</label>
                                <input required name="titulo" value={nueva.titulo} onChange={handleChange} placeholder="Ej. Desarrollador React" className="vacantes-input" />
                            </div>
                            <div className="vacantes-form-group">
                                <label className="vacantes-label">Ubicación</label>
                                <input required name="ubicacion" value={nueva.ubicacion} onChange={handleChange} placeholder="Ej. Cartago, ZFL" className="vacantes-input" />
                            </div>
                            <div className="vacantes-form-group">
                                <label className="vacantes-label">Tipo</label>
                                <select name="tipo" value={nueva.tipo} onChange={handleChange} className="vacantes-select">
                                    <option>Empleo</option>
                                    <option>Pasantía</option>
                                </select>
                            </div>
                            <div className="vacantes-form-group">
                                <label className="vacantes-label">Modalidad</label>
                                <select name="modalidad" value={nueva.modalidad} onChange={handleChange} className="vacantes-select">
                                    <option>Presencial</option>
                                    <option>Híbrido</option>
                                    <option>Remoto</option>
                                </select>
                            </div>
                            <div className="vacantes-form-group">
                                <label className="vacantes-label">Descripción breve</label>
                                <input required name="descripcion" value={nueva.descripcion} onChange={handleChange} placeholder="Buscamos experto..." className="vacantes-input" />
                            </div>
                            <div className="vacantes-form-group">
                                <label className="vacantes-label">Horario</label>
                                <input required name="horario" value={nueva.horario} onChange={handleChange} placeholder="Ej. L-V 8am-5pm" className="vacantes-input" />
                            </div>
                            <div className="vacantes-form-group" style={{ gridColumn: '1 / -1' }}>
                                <label className="vacantes-label">Requisitos (separados por coma)</label>
                                <input required name="requisitos" value={nueva.requisitos} onChange={handleChange} placeholder="Ej. React, Node, 3 años de experiencia" className="vacantes-input" />
                            </div>
                        </div>
                        <button type="submit" className="vacantes-btn-submit">Crear Vacante</button>
                    </form>
                </div>
            )}

            <div className="vacantes-grid">
                {vacantes.length === 0 ? (
                    <div className="vacantes-empty">
                        <CircleSlash size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
                        <p className="vacantes-empty-text">No hay vacantes publicadas, crea una.</p>
                    </div>
                ) : (
                    vacantes.map(v => (
                        <div key={v.id} className="vacantes-card">
                            <div className="vacantes-card-header">
                                <h3 className="vacantes-card-title">{v.titulo}</h3>
                                <span className="vacantes-card-badge">{v.estado}</span>
                            </div>
                            <p className="vacantes-card-meta">{v.ubicacion} • {v.modalidad}</p>
                            <p className="vacantes-card-desc">{v.descripcion}</p>

                            <div className="vacantes-card-footer">
                                <span className="vacantes-card-stats">{v.postulantes} Postulantes</span>
                                <button onClick={() => handleDelete(v.id)} className="vacantes-btn-delete">Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VacantesEmpresa;
