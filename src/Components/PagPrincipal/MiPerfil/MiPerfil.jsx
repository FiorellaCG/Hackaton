import { useState, useEffect } from "react";
import { obtenerMiPerfil } from "../../../services/services";
import FormAspirante from "./FormAspirante";
import FormEmpresa from "./FormEmpresa";

const MiPerfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const rol = usuario?.rol;

  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await obtenerMiPerfil(usuario.id);
        if (data && data.nombre) {
          setPerfil(data);
        } else {
          setMostrarForm(true);
        }
      } catch (error) {
        setMostrarForm(true);
      } finally {
        setCargando(false);
      }
    };
    cargarPerfil();
  }, []);

  if (cargando) return <p>Cargando perfil...</p>;

  if (mostrarForm) {
    return (
      <div>
        <h2>Completar Mi Perfil</h2>
        {rol === "aspirante" && <FormAspirante usuarioId={usuario.id} />}
        {rol === "empresa" && <FormEmpresa usuarioId={usuario.id} />}
      </div>
    );
  }

  return (
    <div>
      <h2>Mi Perfil</h2>
      <button onClick={() => setMostrarForm(true)}>✏️ Editar perfil</button>
      <section>
        <h3>Datos Personales</h3>
        <div><span>Nombre completo</span><span>{perfil.nombre} {perfil.apellidos}</span></div>
        <div><span>Cédula</span><span>{perfil.cedula}</span></div>
        <div><span>Fecha de nacimiento</span><span>{perfil.fecha_nacimiento}</span></div>
        <div><span>Género</span><span>{perfil.genero}</span></div>
        <div><span>Nacionalidad</span><span>{perfil.nacionalidad}</span></div>
        <div><span>Teléfono</span><span>{perfil.telefono}</span></div>
        <div><span>Teléfono Alterno</span><span>{perfil.telefono_alterno || "—"}</span></div>
        <div><span>Provincia</span><span>{perfil.provincia}</span></div>
        <div><span>Cantón</span><span>{perfil.canton}</span></div>
      </section>

      {rol === "aspirante" && perfil.nivel_educativo && (
        <section>
          <h3>Perfil Profesional</h3>
          <div><span>Nivel Educativo</span><span>{perfil.nivel_educativo}</span></div>
          <div><span>Estado Laboral</span><span>{perfil.estado_laboral}</span></div>
          <div><span>Sobre mí</span><p>{perfil.sobre_mi || "—"}</p></div>
        </section>
      )}

      {rol === "empresa" && perfil.nombre && (
        <section>
          <h3>Perfil de Empresa</h3>
          <div><span>Nombre</span><span>{perfil.nombre}</span></div>
          <div><span>Descripción</span><span>{perfil.descripcion || "—"}</span></div>
          <div><span>Contacto</span><span>{perfil.nombre_contacto}</span></div>
          <div><span>Correo contacto</span><span>{perfil.correo_contacto}</span></div>
          <div><span>Sitio web</span><span>{perfil.url_externa || "—"}</span></div>
        </section>
      )}
    </div>
  );
};

export default MiPerfil;