import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../../services/services";
import "./Login.css";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const { t } = useTranslation();
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
      setError(t('auth.must_accept'));
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser(form);

      alert(t('auth.register_success') || "¡Registro exitoso!");
      onSwitchToLogin();
    } catch (err) {
      setError(t('auth.error_register') || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-container">
        <div className="login-modal">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <X className="icon-md" />
            </button>

            <div className="header-logo-section">
              <div className="header-logo-icon">
                <span>📝</span>
              </div>

              <div>
                <h2 className="modal-title">{t('auth.register_title')}</h2>
                <p className="modal-subtitle">{t('auth.register_subtitle')}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="modal-form">

            {/* Tipo de usuario */}
            <div className="form-group">
              <label className="form-label">{t('auth.user_type')}</label>
              <div className="user-type-selector">
                <button
                  type="button"
                  className={`user-type-button ${form.rol === "aspirante" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("aspirante")}
                >
                  {t('auth.candidate')}
                </button>

                <button
                  type="button"
                  className={`user-type-button ${form.rol === "empresa" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("empresa")}
                >
                  {t('auth.company')}
                </button>

                <button
                  type="button"
                  className={`user-type-button ${form.rol === "institucion" ? "active" : ""}`}
                  onClick={() => handleRoleSelect("institucion")}
                >
                  Institución
                </button>
              </div>
            </div>

            {/* Correo */}
            <div className="form-group">
              <label className="form-label">{t('auth.email')}</label>
              <input
                type="email"
                name="correo"
                placeholder={t('auth.email_placeholder')}
                value={form.correo}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="form-group">
              <label className="form-label">{t('auth.phone')}</label>
              <input
                type="text"
                name="telefono"
                placeholder="8888-8888"
                value={form.telefono}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="form-group">
              <label className="form-label">{t('auth.password')}</label>
              <div className="input-wrapper">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  name="contrasena"
                  placeholder="••••••••"
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
                📄 {t('auth.see_terms')}
              </button>

              <p className={`terms-status ${aceptado ? "accepted" : "not-accepted"}`}>
                {aceptado
                  ? `✅ ${t('auth.terms_accepted')}`
                  : `❌ ${t('auth.must_accept')}`}
              </p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? t('auth.registering') : t('auth.register_button')}
            </button>
          </form>

          <div className="switch-auth">
            <p className="switch-text">
              {t('auth.already_account')}{" "}
              <button type="button" className="switch-link" onClick={onSwitchToLogin}>
                {t('auth.login_link')}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* MODAL DE TÉRMINOS */}
      {mostrarModal && (
        <div className="terms-modal-backdrop">
          <div className="terms-modal">
            <h3>{t('auth.terms')}</h3>

            <div className="terms-content">
              <p>{t('auth.terms_desc_1')}</p>
              <p>{t('auth.terms_desc_2')}</p>
              <p>{t('auth.terms_desc_3')}</p>
            </div>

            <div className="terms-actions">
              <button
                type="button"
                className="btn-reject"
                onClick={handleRechazarConsentimiento}
              >
                {t('auth.reject')}
              </button>

              <button
                type="button"
                className="btn-accept"
                onClick={handleAceptarConsentimiento}
              >
                {t('auth.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}