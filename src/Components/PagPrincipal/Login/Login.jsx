import { X, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/services";

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(correo, contrasena);
      localStorage.setItem("usuario", JSON.stringify(data));
      if (onLoginSuccess) onLoginSuccess(data);

      // Redirige según rol
      if (data.rol === "aspirante" || data.rol === "empresa") {
        navigate("/dashboard-aspirante");
      } else {
        navigate("/");
      }

      onClose();
    } catch (err) {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-container">
        <div className="login-modal">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <X />
            </button>
            <div className="header-logo-section">
              <div className="header-logo-icon">
                <span>🔒</span>
              </div>
              <div>
                <h2 className="modal-title">Iniciar Sesión</h2>
                <p className="modal-subtitle">Accede a tu cuenta</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="modal-form">
            <div className="form-group">
              <label className="form-label">Correo</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="switch-auth">
            <p className="switch-text">
              ¿No tienes cuenta?{" "}
              <button
                className="switch-link"
                onClick={() => alert("Redirigir a registro")}
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};