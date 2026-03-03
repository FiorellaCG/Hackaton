import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/services";

<<<<<<< HEAD

export default function RegisterModal({ isOpen, onClose }) {
=======
const Register = () => {
  const navigate = useNavigate();
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const handleRoleSelect = (rol) => {
    setForm({ ...form, rol });
=======
  const handleAceptarConsentimiento = () => {
    setAceptado(true);
    setForm({ ...form, consentimiento: true });
    setMostrarModal(false);
  };

  const handleRechazarConsentimiento = () => {
    setAceptado(false);
    setForm({ ...form, consentimiento: false });
    setMostrarModal(false);
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
  };

  const handleRegister = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setLoading(true);
    setError("");

=======
    if (!aceptado) {
      alert("Debes aceptar el consentimiento para registrarte.");
      return;
    }
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
    try {
      await registerUser(form);
      alert("Registro exitoso");
<<<<<<< HEAD
      onClose();
    } catch (err) {
      console.log(err);
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
=======
      navigate("/login");
    } catch (error) {
      alert("Error al registrar");
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
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

<<<<<<< HEAD
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
=======
      <form onSubmit={handleRegister}>
        <div>
          <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
        </div>

        <div>
          <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
        </div>

        <div>
          <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} required />
        </div>

        <div>
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="aspirante">Soy Aspirante</option>
            <option value="empresa">Soy Empresa</option>
          </select>
        </div>

        {/* ✅ Consentimiento — cada elemento en su propio div */}
        <div>
          <div>
            <button type="button" onClick={() => setMostrarModal(true)}>
              📄 Ver política de consentimiento
            </button>
          </div>

          <div>
            {aceptado ? (
              <span style={{ color: "green" }}>✅ Consentimiento aceptado</span>
            ) : (
              <span style={{ color: "red" }}>❌ Debes leer y aceptar el consentimiento</span>
            )}
          </div>
        </div>

        <div>
          <button type="submit">Registrarse</button>
        </div>
      </form>

      {/* ── MODAL ── */}
      {mostrarModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw", height: "100vh",
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "30px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}>
            <h3>Consentimiento de Tratamiento de Datos Personales</h3>

            <div style={{
              overflowY: "auto",
              flex: 1,
              fontSize: "14px",
              lineHeight: "1.6",
            }}>
              <p>
                En cumplimiento con las leyes de protección de datos personales vigentes,
                <strong> GreenTalent – ZFL La Lima</strong> le informa que los datos
                personales que usted proporcione serán tratados de manera confidencial y segura.
              </p>

              <h4>¿Qué datos recopilamos?</h4>
              <ul>
                <li>Datos de identificación: nombre, apellidos, cédula.</li>
                <li>Datos de contacto: correo electrónico, teléfono.</li>
                <li>Datos de ubicación: provincia y cantón de residencia.</li>
                <li>Datos académicos y laborales: nivel educativo, carrera, estado laboral.</li>
                <li>Información de perfil: descripción personal ("Sobre mí").</li>
              </ul>

              <h4>¿Para qué usamos sus datos?</h4>
              <ul>
                <li>Conectar aspirantes con oportunidades laborales y de pasantía.</li>
                <li>Mostrar su perfil a empresas registradas en la plataforma.</li>
                <li>Enviar notificaciones relacionadas con su búsqueda de empleo.</li>
                <li>Mejorar los servicios mediante análisis internos.</li>
              </ul>

              <h4>¿Con quién compartimos sus datos?</h4>
              <p>
                Sus datos podrán ser compartidos únicamente con empresas e instituciones
                registradas en GreenTalent para facilitar procesos de selección. No vendemos
                ni cedemos su información a terceros con fines comerciales.
              </p>

              <h4>¿Por cuánto tiempo conservamos sus datos?</h4>
              <p>
                Sus datos serán conservados mientras su cuenta esté activa. Puede solicitar
                la eliminación de su información en cualquier momento.
              </p>

              <h4>Sus derechos</h4>
              <p>
                Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento
                de sus datos (derechos ARCO). Contáctenos directamente desde la plataforma.
              </p>

              <p>
                Al hacer clic en <strong>"Acepto"</strong>, usted autoriza expresamente el
                tratamiento de sus datos conforme a los términos descritos.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={handleRechazarConsentimiento}
                style={{
                  backgroundColor: "#c62828",
                  color: "#fff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                No acepto
              </button>

              <button
                type="button"
                onClick={handleAceptarConsentimiento}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Acepto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
  );
}