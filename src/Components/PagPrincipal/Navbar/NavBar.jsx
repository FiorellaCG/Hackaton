import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { lang } = useParams();

  const currentLang = lang || "es";

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const changeLanguage = (newLang) => {
    navigate(`/${newLang}/jobs`);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate(`/${currentLang}/jobs`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">GT</div>
        <div className="brand">
          <h1>GreenTalent</h1>
          <span>ZFL La Lima</span>
        </div>
      </div>

      <ul className="navbar-links">
        <li onClick={() => navigate(`/${currentLang}/jobs`)}>Empleos</li>
        <li onClick={() => navigate(`/${currentLang}/internships`)}>Pasantías</li>
        <li>Empresas</li>
        <li>Estadísticas</li>

        {/* 🔥 Mostrar solo si está logueado */}
        {usuario && (
          <li onClick={() => navigate(`/${currentLang}/mi-perfil`)}>
            Mi Perfil
          </li>
        )}
      </ul>

      <div className="navbar-right">
        <select
          value={currentLang}
          onChange={(e) => changeLanguage(e.target.value)}
          className="language-selector"
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>

        {/* 🔥 Si NO está logueado */}
        {!usuario && (
          <>
            <button
              className="login-btn"
              onClick={() => navigate(`/${currentLang}/login`)}
            >
              Iniciar Sesión
            </button>

            <button
              className="register-btn"
              onClick={() => navigate(`/${currentLang}/register`)}
            >
              Registrarse
            </button>
          </>
        )}

        {/* 🔥 Si está logueado */}
        {usuario && (
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;