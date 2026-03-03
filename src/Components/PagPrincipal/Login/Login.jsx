import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/services";
import "./Login.css";

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const data = await loginUser(form.correo, form.contrasena);

      localStorage.setItem("usuario", JSON.stringify(data));

      // Redirige según el rol
      navigate("/mi-perfil");

      onClose();
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-container">
        <div className="login-modal modal-large">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <X className="icon-md" />
            </button>
            <div className="header-logo-section">
              <div className="header-logo-icon">
                <span>📝</span>
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
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="form-input"
                placeholder="Correo"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  name="contrasena"
                  value={form.contrasena}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? <EyeOff className="icon-md" /> : <Eye className="icon-md" />}
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="switch-auth">
            <p className="switch-text">
              ¿No tienes cuenta?{" "}
              <button
                className="switch-link"
                onClick={() => {
                  onClose();
                  navigate("/register");
                }}
              >
                Registrarse
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}