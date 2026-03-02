// LoginModal.jsx
import { useState } from "react";
import { loginUsuario } from "../../../services/Usuario";
import { X, Eye, EyeOff, Mail, Lock } from "lucide-react";
import "./Login.css";

export default function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ correo: "", contrasena: "" });
  const [backendError, setBackendError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");

    try {
      const res = await loginUsuario(formData);
      if (res.success) {
        localStorage.setItem("usuario_id", res.usuario_id);
        localStorage.setItem("rol", res.rol);
        onClose(); // cierra el modal
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
            <h2>Iniciar Sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            {backendError && <p className="error-message">{backendError}</p>}

            <div className="form-group">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.correo}
                  onChange={(e) =>
                    setFormData({ ...formData, correo: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={formData.contrasena}
                  onChange={(e) =>
                    setFormData({ ...formData, contrasena: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}