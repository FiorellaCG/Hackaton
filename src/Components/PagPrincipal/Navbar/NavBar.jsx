import { LoginModal } from "../Login/Login";
import  RegistroModal from '../../PagPrincipal/Login/Registrer'

import "./Navbar.css";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || "es";

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const changeLanguage = (newLang) => {
    navigate(`/${newLang}/jobs`);
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

          <button className="login-btn" onClick={() => setLoginOpen(true)}>
            Iniciar Sesión
          </button>
          <button className="register-btn" onClick={() => setRegisterOpen(true)}>
            Registrarse
          </button>
        </div>
      </nav>

      {/* Modales */}
      {loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
      {registerOpen && <RegistroModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />}
    </>
  );
};

export default Navbar;