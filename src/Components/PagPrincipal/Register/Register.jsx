import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/services";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    telefono: "",
    contrasena: "",
    rol: "aspirante",
    activo: true,
    consentimiento: false,
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [aceptado, setAceptado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      alert("Debes aceptar el consentimiento para registrarte.");
      return;
    }
    try {
      await registerUser(form);
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      alert("Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro</h2>

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
  );
};

export default Register;