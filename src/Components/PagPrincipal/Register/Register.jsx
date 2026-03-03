import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/services";

export default function RegisterModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    telefono: "",
    contrasena: "",
    rol: "aspirante",
    activo: true,
    consentimiento: false,
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [aceptado, setAceptado] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (rol) => {
    setForm({ ...form, rol });
  };

  const handleAceptarConsentimiento = () => {
    setAceptado(true);
    setForm({ ...form, consentimiento: true });
    setMostrarModal(false);
  };

  const handleRechazarConsentimiento = () => {
    setAceptado(false);
    setForm({ ...form, consentimiento: false });
    setMostrarModal(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!aceptado) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser(form);

      alert("Registro exitoso");
      onClose();
      navigate("/login");
    } catch (err) {
      setError("Error al registrar usuario");
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
                <h2 className="modal-title">Registro</h2>
                <p className="modal-subtitle">Crea tu cuenta</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="modal-form">

            {/* Tipo de usuario */}
            <div className="form-group">
              <label className="form-label">Tipo de usuario</label>
              <div className="user-type-selector">
                <button
                  type="button"
                  className={`user-type-button ${form.rol === "aspirante" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("aspirante")}
                >
                  Aspirante
                </button>

                <button
                  type="button"
                  className={`user-type-button ${form.rol === "empresa" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("empresa")}
                >
                  Empresa
                </button>
              </div>
            </div>

            {/* Correo */}
            <div className="form-group">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
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

            {/* Términos */}
            <div className="terms-section">
              <button
                type="button"
                className="terms-link"
                onClick={() => setMostrarModal(true)}
              >
                📄 Ver Términos y Condiciones
              </button>

              <p className={`terms-status ${aceptado ? "accepted" : "not-accepted"}`}>
                {aceptado
                  ? "✅ Términos aceptados"
                  : "❌ Debes aceptar los términos"}
              </p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL DE TÉRMINOS */}
      {mostrarModal && (
        <div className="terms-modal-backdrop">
          <div className="terms-modal">
            <h3>Términos y Condiciones</h3>

            <div className="terms-content">
              <p>
                En cumplimiento con las leyes de protección de datos,
                GreenTalent – ZFL La Lima tratará su información
                de manera confidencial y segura.
              </p>

              <p>
                Sus datos serán utilizados únicamente para conectar
                aspirantes con empresas registradas.
              </p>

              <p>
                Puede solicitar la eliminación de sus datos en cualquier momento.
              </p>
            </div>

            <div className="terms-actions">
              <button
                type="button"
                className="btn-reject"
                onClick={handleRechazarConsentimiento}
              >
                No acepto
              </button>

              <button
                type="button"
                className="btn-accept"
                onClick={handleAceptarConsentimiento}
              >
                Acepto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}