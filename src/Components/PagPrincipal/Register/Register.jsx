import { X, Eye, EyeOff, Mail, Lock, Phone, User, Building2, ShieldCheck, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../../services/services";
import { motion, AnimatePresence } from "framer-motion";
import "./Register.css";

export default function RegisterModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    telefono: "",
    contrasena: "",
    rol: "aspirante",
    activo: true,
    consentimiento: false,
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarTerms, setMostrarTerms] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (rol) => {
    setForm({ ...form, rol });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.consentimiento) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await registerUser(form);
      alert("Registro exitoso");
      onClose();
      navigate("/login");
    } catch (err) {
      setError(t('auth.register_error') || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--border-color)] transition-all my-8">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>

        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
              <User size={28} />
            </div>
            <button
              onClick={onClose}
              className="p-2.5 bg-[var(--bg-main)] text-slate-400 hover:text-red-500 rounded-xl transition-all border border-[var(--border-color)] hover:scale-110 active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase m-0">
              {t('auth.register_title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {t('auth.register_subtitle')}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* TIPO DE USUARIO */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                Soy un...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("aspirante")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all group ${form.rol === "aspirante"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400"
                    : "bg-[var(--bg-card)] border-[var(--border-color)] text-slate-500 hover:border-slate-200"}`}
                >
                  <User size={24} className={form.rol === "aspirante" ? "text-green-600" : "text-slate-400"} />
                  <span className="text-xs font-black uppercase tracking-widest">Aspirante</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect("empresa")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all group ${form.rol === "empresa"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400"
                    : "bg-[var(--bg-card)] border-[var(--border-color)] text-slate-500 hover:border-slate-200"}`}
                >
                  <Building2 size={24} className={form.rol === "empresa" ? "text-green-600" : "text-slate-400"} />
                  <span className="text-xs font-black uppercase tracking-widest">Empresa</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  {t('auth.email')}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="email"
                    name="correo"
                    placeholder="name@email.com"
                    value={form.correo}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Teléfono
                </label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="text"
                    name="telefono"
                    placeholder="+506 0000 0000"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  {t('auth.password')}
                </label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type={mostrarContrasena ? "text" : "password"}
                    name="contrasena"
                    placeholder="••••••••"
                    value={form.contrasena}
                    onChange={handleChange}
                    className="w-full pl-12 pr-14 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  >
                    {mostrarContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* CONSENTIMIENTO */}
            <div
              onClick={() => setForm({ ...form, consentimiento: !form.consentimiento })}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${form.consentimiento ? "bg-green-50 dark:bg-green-900/10 border-green-500/30" : "bg-[var(--bg-main)] border-transparent hover:bg-slate-100 dark:hover:bg-slate-900"}`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${form.consentimiento ? "bg-green-600 border-green-600 text-white" : "bg-[var(--bg-card)] border-[var(--border-color)]"}`}>
                {form.consentimiento && <CheckCircle size={14} />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest leading-none">Acepto términos y condiciones</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMostrarTerms(true); }}
                  className="text-[9px] font-bold text-green-600 dark:text-green-400 mt-1 hover:underline"
                >
                  Leer contrato de privacidad
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wider">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl text-xs uppercase tracking-[0.15em] transform transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 mt-4"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('auth.registering')}
                </div>
              ) : t('auth.register_button')}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
              {t('auth.already_account')}{" "}
              <button
                className="text-green-600 dark:text-green-400 font-extrabold hover:underline ml-1"
                onClick={() => navigate("/login")}
              >
                {t('auth.login_link')}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* MODAL DE TÉRMINOS */}
      <AnimatePresence>
        {mostrarTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--bg-card)] w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight m-0">Privacidad y Términos</h3>
                  <div className="w-12 h-1 bg-green-500 mt-2"></div>
                </div>
                <button onClick={() => setMostrarTerms(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-6 text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed mb-10 pr-4">
                <p>En cumplimiento con las leyes de protección de datos personales de Costa Rica, GreenTalent – ZFL La Lima tratará su información de manera estrictamente confidencial.</p>
                <div className="p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)]">
                  <h4 className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-green-600" /> Finalidad del Tratamiento
                  </h4>
                  <p className="text-xs m-0">Sus datos serán utilizados únicamente para establecer el SmartMatch entre su perfil profesional y las vacantes vigentes en las empresas de la Zona Franca La Lima.</p>
                </div>
                <p>Usted tiene derecho a revocar este consentimiento y solicitar la eliminación total de su información personal de nuestros servidores en cualquier momento a través del panel de Ajustes.</p>
              </div>

              <button
                onClick={() => { setForm({ ...form, consentimiento: true }); setMostrarTerms(false); }}
                className="w-full py-5 bg-green-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transform transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-green-900/20"
              >
                Acepto y Entiendo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}