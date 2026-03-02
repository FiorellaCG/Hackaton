import { useState } from "react";
import { loginUser } from "../../../services/services";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(correo, contrasena);

      console.log("Login exitoso:", data);

      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(data));

      alert("Login exitoso");
    } catch (error) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;