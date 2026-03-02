// RegistroModal.jsx
import { useState } from "react";
import { registrarUsuario } from "../../../services/Usuario";
import { X, User, Building2, Mail, Lock } from "lucide-react";
import "./Login.css";

export default function RegistroModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ correo: "", contrasena: "" });
  const [userType, setUserType] = useState("aspirante");
  const [backendError, setBackendError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");

    try {
      const res = await registrarUsuario({ ...formData, rol: userType });
      if (res.success) {
        alert("Usuario registrado, ahora inicia sesión");
        onClose();
      }
    } catch (err) {
      setBackendError(err.error || "Error del servidor");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal">
          <div className="modal-header">
            <button onClick={onClose} className="close-button">
              <X className="icon-sm" />
            </button>
            <h2>Crear Cuenta</h2>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            {backendError && <p className="error-message">{backendError}</p>}

            <div className="form-group">
              <label>Tipo de Usuario</label>
              <div className="user-type-selector">
                <button
                  type="button"
                  className={`user-type-button ${userType === "aspirante" ? "active" : ""}`}
                  onClick={() => setUserType("aspirante")}
                >
                  <User /> Candidato
                </button>
                <button
                  type="button"
                  className={`user-type-button ${userType === "empresa" ? "active" : ""}`}
                  onClick={() => setUserType("empresa")}
                >
                  <Building2 /> Empresa
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <Mail />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <Lock />
                <input
                  type="password"
                  placeholder="••••••"
                  value={formData.contrasena}
                  onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}