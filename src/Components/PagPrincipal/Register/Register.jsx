import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../../services/services";


export default function RegisterModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    correo: "",
    telefono: "",
    contrasena: "",
    rol: "aspirante",
    activo: true,
    consentimiento: true
  });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (rol) => {
    setForm({ ...form, rol });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(form);
      console.log("Usuario creado:", data);
      alert("Registro exitoso");
      onClose();
    } catch (err) {
      console.log(err);
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-container">
        <div className="login-modal" style={{ maxWidth: "32rem" }}> {/* más grande */}
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <X className="icon-md" />
            </button>
            <div className="header-logo-section">
              <div className="header-logo-icon">
                <span>📝</span>
              </div>
              <div>
                <h2 className="modal-title">Registro</h2>
                <p className="modal-subtitle">Crea tu cuenta</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="modal-form">
            {/* Selección de rol */}
            <div className="form-group">
              <label className="form-label">Tipo de usuario</label>
              <div className="user-type-selector">
                <button
                  type="button"
                  className={`user-type-button ${form.rol === "aspirante" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("aspirante")}
                >
                  <span>Aspirante</span>
                </button>
                <button
                  type="button"
                  className={`user-type-button ${form.rol === "empresa" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("empresa")}
                >
                  <span>Empresa</span>
                </button>
              </div>
            </div>

            {/* Correo */}
            <div className="form-group">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={form.correo}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  name="contrasena"
                  placeholder="Contraseña"
                  value={form.contrasena}
                  onChange={handleChange}
                  className="form-input"
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

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <div className="switch-auth">
            <p className="switch-text">
              ¿Ya tienes cuenta?{" "}
              <button
                className="switch-link"
                onClick={() => alert("Redirigir a login")}
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}