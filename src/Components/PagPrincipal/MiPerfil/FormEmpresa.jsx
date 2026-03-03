import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearPerfilEmpresa } from "../../../services/services";

const FormEmpresa = ({ usuarioId }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    nombre_contacto: "",
    correo_contacto: "",
    url_externa: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearPerfilEmpresa({
        ...form,
        usuario_id: usuarioId,
      });
      alert("Perfil de empresa creado con éxito");
      navigate("/mi-perfil");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el perfil");
    }
  };

  return (
    <div>
      <h3>Perfil de Empresa</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la empresa</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={4} />
        </div>
        <div>
          <label>Nombre de contacto</label>
          <input name="nombre_contacto" value={form.nombre_contacto} onChange={handleChange} required />
        </div>
        <div>
          <label>Correo de contacto</label>
          <input type="email" name="correo_contacto" value={form.correo_contacto} onChange={handleChange} required />
        </div>
        <div>
          <label>Sitio web</label>
          <input name="url_externa" value={form.url_externa} onChange={handleChange} />
        </div>
        <button type="submit">Guardar Perfil</button>
      </form>
    </div>
  );
};

export default FormEmpresa;