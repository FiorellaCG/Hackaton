import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import './AjustesEmpresa.css';

const AjustesEmpresa = () => {
    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
            alert("Ajustes guardados (mock)");
        }, 1000);
    };

    return (
        <div className="ajustes-empresa-container">
            <h1 className="ajustes-empresa-title">Ajustes de Cuenta</h1>

            <div className="ajustes-max-w">
                <form onSubmit={handleSave}>
                    <div className="ajustes-form-group">
                        <label className="ajustes-label">Correo Electrónico Actual</label>
                        <input type="email" disabled placeholder="tuempresa@empresa.com" className="ajustes-input" />
                    </div>

                    <div className="ajustes-form-group">
                        <label className="ajustes-label">Nueva Contraseña</label>
                        <input type="password" placeholder="••••••••" className="ajustes-input" />
                    </div>

                    <div className="ajustes-form-group">
                        <label className="ajustes-label">Confirmar Nueva Contraseña</label>
                        <input type="password" placeholder="••••••••" className="ajustes-input" />
                    </div>

                    <div className="ajustes-alert">
                        <AlertCircle size={20} style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                        <div className="ajustes-alert-content">
                            <p className="ajustes-alert-title">Aviso de Seguridad</p>
                            <p className="ajustes-alert-desc">Nunca compartas tus credenciales corporativas.</p>
                        </div>
                    </div>

                    <div className="ajustes-footer">
                        <button disabled={cargando} type="submit" className="ajustes-btn-submit">
                            <Save size={16} /> {cargando ? 'Guardando...' : 'Actualizar Credenciales'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AjustesEmpresa;
