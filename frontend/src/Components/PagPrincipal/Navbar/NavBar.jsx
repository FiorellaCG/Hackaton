import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImg from "../../../assents/Logo.png";

import { LoginModal } from "../Login/Login";
import RegistroModal from "../../PagPrincipal/Login/Registrer";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
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
          <Link to="/" className="flex items-center gap-3 no-underline text-inherit">
            <div className="logo-container">
              <img src={logoImg} alt="Logo" className="navbar-logo" />
            </div>
            <div className="brand">
              <h1 className="text-xl font-black">{t('brand.name') || 'GreenTalent'}</h1>
              <span className="text-[10px] uppercase">{t('brand.location') || 'ZFL La Lima'}</span>
            </div>
          </Link>
        </div>

        {/* LINKS */}
        <ul className="navbar-links">
          <li><Link to="/empleos">{t('navbar.jobs')}</Link></li>
          <li><Link to="/pasantias">{t('navbar.internships')}</Link></li>
          <li>{t('navbar.companies')}</li>
          <li>{t('navbar.statistics')}</li>

          {usuario && (
            <li>
              <Link to="/dashboard-aspirante" className="active-link">{t('navbar.my_profile')}</Link>
            </li>
          )}
        </ul>

        {/* RIGHT */}
        <div className="navbar-right">
          {!usuario ? (
            <>
              <button
                className="login-btn"
                onClick={() => setLoginOpen(true)}
              >
                {t('navbar.login')}
              </button>

              <button
                className="register-btn"
                onClick={() => setRegisterOpen(true)}
              >
                {t('navbar.register')}
              </button>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              {t('navbar.logout')}
            </button>
          )}
        </div>
      </nav>

      {/* MODALES */}
      {loginOpen && (
        <LoginModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSwitchToRegister={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
          }}
          onLoginSuccess={(userData) => setUsuario(userData)}
        />
      )}

      {registerOpen && (
        <RegistroModal
          isOpen={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onSwitchToLogin={() => {
            setRegisterOpen(false);
            setLoginOpen(true);
          }}
          onRegisterSuccess={(userData) => setUsuario(userData)}
        />
      )}
    </>
  );
};

export default Navbar;