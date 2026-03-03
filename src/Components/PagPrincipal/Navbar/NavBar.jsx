<<<<<<< HEAD
import { LoginModal } from "../Login/Login";
import  RegistroModal from '../../PagPrincipal/Login/Registrer'

import "./Navbar.css";

import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
import { useNavigate, useParams } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || "es";

<<<<<<< HEAD
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
=======
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2

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

<<<<<<< HEAD
        <ul className="navbar-links">
          <li onClick={() => navigate(`/${currentLang}/jobs`)}>Empleos</li>
          <li onClick={() => navigate(`/${currentLang}/internships`)}>Pasantías</li>
          <li>Empresas</li>
          <li>Estadísticas</li>
        </ul>
=======
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
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2

        <div className="navbar-right">
          <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-selector"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>

<<<<<<< HEAD
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
=======
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
>>>>>>> a281648b8ba0205ba00765a9fd8598e8190e9df2
  );
};

export default Navbar;