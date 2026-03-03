import { X, Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginUser } from "../../../services/services";
import "./Login.css";

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useTranslation();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(correo, contrasena);
      localStorage.setItem("usuario", JSON.stringify(data));
      if (onLoginSuccess) onLoginSuccess(data);

      if (data.rol === "aspirante" || data.rol === "empresa") {
        navigate("/dashboard-aspirante");
      } else {
        navigate("/");
      }

      onClose();
    } catch (err) {
      setError(t('auth.invalid_creds'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md bg-[var(--bg-card)] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--border-color)] transition-all transform scale-100">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>

        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
              <ShieldCheck size={28} />
            </div>
            <button
              onClick={onClose}
              className="p-2.5 bg-[var(--bg-main)] text-slate-400 hover:text-red-500 rounded-xl transition-all border border-[var(--border-color)] hover:scale-110 active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase m-0">
              {t('auth.login_title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {t('auth.login_subtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                {t('auth.email')}
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                {t('auth.password')}
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl text-xs uppercase tracking-[0.2em] transform transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 mt-4"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('auth.logging_in')}
                </div>
              ) : t('auth.login_button')}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
              {t('auth.no_account')}{" "}
              <button
                className="text-green-600 dark:text-green-400 font-extrabold hover:underline ml-1"
                onClick={() => navigate("/registro")}
              >
                {t('auth.register_link')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};