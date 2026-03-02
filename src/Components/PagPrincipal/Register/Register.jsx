import { useState } from "react";
import { registerUser } from "../../../services/services";

const Register = () => {
  const [form, setForm] = useState({
    correo: "",
    telefono: "",
    contrasena: "",
    rol: "aspirante",
    activo: true,
    consentimiento: true
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(form);
      console.log("Usuario creado:", data);
      alert("Registro exitoso");
    } catch (error) {
      console.log(error);
      alert("Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
        />

        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;