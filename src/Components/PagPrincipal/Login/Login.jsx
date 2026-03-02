import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/services";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(correo, contrasena);
      localStorage.setItem("usuario", JSON.stringify(data));

      // ✅ Redirige según el rol
      if (data.rol === "aspirante") {
        navigate("/mi-perfil");
      } else if (data.rol === "empresa") {
        navigate("/mi-perfil");
      } else {
        navigate("/");
      }

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
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;