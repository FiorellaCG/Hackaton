import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearPerfilAspirante } from "../../../services/services";

const FormAspirante = ({ usuarioId }) => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);

  const [form, setForm] = useState({
    // Persona
    nombre: "",
    apellidos: "",
    cedula: "",
    fecha_nacimiento: "",
    genero: "",
    nacionalidad: "",
    telefono: "",
    telefono_alterno: "",
    provincia: "",
    canton: "",
    // Aspirante
    carrera_id: "",
    nivel_educativo: "secundaria",
    estado_laboral: "buscando",
    sobre_mi: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    try {
      await crearPerfilAspirante({
        ...form,
        usuario_id: usuarioId,  // ✅ el serializer espera usuario_id
      });
      alert("Perfil creado con éxito");
      navigate("/mi-perfil");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el perfil");
    }
  };

  return (
    <div>
      <p>Paso {paso} de 2</p>

      {/* ── PASO 1: Datos personales ── */}
      {paso === 1 && (
        <div>
          <h3>Datos Personales</h3>

          <div>
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div>
            <label>Apellidos</label>
            <input name="apellidos" value={form.apellidos} onChange={handleChange} required />
          </div>

          <div>
            <label>Cédula</label>
            <input name="cedula" value={form.cedula} onChange={handleChange} required />
          </div>

          <div>
            <label>Fecha de Nacimiento</label>
            <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} />
          </div>

          <div>
            <label>Género</label>
            <input name="genero" value={form.genero} onChange={handleChange} />
          </div>

          <div>
            <label>Nacionalidad</label>
            <input name="nacionalidad" value={form.nacionalidad} onChange={handleChange} />
          </div>

          <div>
            <label>Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} />
          </div>

          <div>
            <label>Teléfono Alterno</label>
            <input name="telefono_alterno" value={form.telefono_alterno} onChange={handleChange} />
          </div>

          <div>
            <label>Provincia</label>
            <input name="provincia" value={form.provincia} onChange={handleChange} />
          </div>

          <div>
            <label>Cantón</label>
            <input name="canton" value={form.canton} onChange={handleChange} />
          </div>

          <button type="button" onClick={() => setPaso(2)}>Siguiente →</button>
        </div>
      )}

      {/* ── PASO 2: Perfil profesional ── */}
      {paso === 2 && (
        <form onSubmit={handleSubmitFinal}>
          <h3>Perfil Profesional</h3>

          <div>
            <label>Carrera ID</label>
            <input
              name="carrera_id"
              placeholder="ID de la carrera"
              value={form.carrera_id}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Nivel Educativo</label>
            <select name="nivel_educativo" value={form.nivel_educativo} onChange={handleChange}>
              <option value="secundaria">Secundaria</option>
              <option value="tecnico">Técnico</option>
              <option value="universitario">Universitario</option>
              <option value="licenciatura">Licenciatura</option>
              <option value="maestria">Maestría</option>
            </select>
          </div>

          <div>
            <label>Estado Laboral</label>
            <select name="estado_laboral" value={form.estado_laboral} onChange={handleChange}>
              <option value="buscando">Buscando empleo</option>
              <option value="empleado">Empleado</option>
              <option value="desempleado">Desempleado</option>
            </select>
          </div>

          <div>
            <label>Sobre mí</label>
            <textarea
              name="sobre_mi"
              placeholder="Cuéntanos sobre ti..."
              value={form.sobre_mi}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="button" onClick={() => setPaso(1)}>← Atrás</button>
          <button type="submit">Guardar Perfil</button>
        </form>
      )}
    </div>
  );
};

export default FormAspirante;