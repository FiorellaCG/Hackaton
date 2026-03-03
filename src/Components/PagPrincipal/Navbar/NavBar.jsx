import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import  LoginModal  from "../../PagPrincipal/Login/Login";
import RegistroModal from "../../PagPrincipal/Login/Registrer";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || "es";

  const [usuario, setUsuario] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

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
    <>
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

          {!usuario && (
            <>
              <button
                className="login-btn"
                onClick={() => setLoginOpen(true)}
              >
                Iniciar Sesión
              </button>

              <button
                className="register-btn"
                onClick={() => setRegisterOpen(true)}
              >
                Registrarse
              </button>
            </>
          )}

          {usuario && (
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Modales */}
      {loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
      {registerOpen && <RegistroModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />}
    </>
  );
};

export default Navbar;