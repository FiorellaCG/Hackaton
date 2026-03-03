import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { LoginModal } from "../Login/Login";
import RegistroModal from "../../PagPrincipal/Login/Registrer";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || "es";

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
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
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <div className="navbar-left">
          <div className="logo">GT</div>
          <div className="brand">
            <h1>GreenTalent</h1>
            <span>ZFL La Lima</span>
          </div>
        </div>

        {/* LINKS */}
        <ul className="navbar-links">
          <li><Link to="/">Empleos</Link></li>
          <li><Link to="/">Pasantías</Link></li>
          <li>Empresas</li>
          <li>Estadísticas</li>

          {usuario && (
            <li>
              <Link to="/dashboard-aspirante" className="active-link">Mi Perfil</Link>
            </li>
          )}
        </ul>

        {/* RIGHT */}
        <div className="navbar-right">
          <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-selector"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>

          {!usuario ? (
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
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* MODALES */}
      {loginOpen && (
        <LoginModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLoginSuccess={(userData) => setUsuario(userData)}
        />
      )}

      {registerOpen && (
        <RegistroModal
          isOpen={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onRegisterSuccess={(userData) => setUsuario(userData)}
        />
      )}
    </>
  );
};

export default Navbar;