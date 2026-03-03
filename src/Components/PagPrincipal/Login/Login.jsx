import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../../../services/services";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || "es";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(correo, contrasena);
      localStorage.setItem("usuario", JSON.stringify(data));

      if (data.rol === "aspirante") {
        navigate(`/${currentLang}/mi-perfil`);
      } else if (data.rol === "empresa") {
        navigate(`/${currentLang}/mi-perfil`);
      } else {
        navigate(`/${currentLang}/jobs`);
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