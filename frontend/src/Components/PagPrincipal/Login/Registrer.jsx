import { X, Eye, EyeOff, Mail, Lock, Phone, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../../services/services";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const { t } = useTranslation();

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

  const [mostrarModalTerminos, setMostrarModalTerminos] = useState(false);
  const [aceptado, setAceptado] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (rol) => {
    setForm({ ...form, rol });
  };

  const handleAceptarConsentimiento = () => {
    setAceptado(true);
    setForm({ ...form, consentimiento: true });
    setMostrarModalTerminos(false);
  };

  const handleRechazarConsentimiento = () => {
    setAceptado(false);
    setForm({ ...form, consentimiento: false });
    setMostrarModalTerminos(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!aceptado) {
      setError(t('auth.must_accept'));
      return;
    }

    try {
      setLoading(true);
      setError("");
      await registerUser(form);
      alert(t('auth.register_success') || "¡Registro exitoso!");
      onSwitchToLogin();
    } catch (err) {
      setError(t('auth.error_register') || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative w-full max-w-[32rem] max-h-[90vh] bg-[var(--bg-card)] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--border-color)] transition-all transform scale-100 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600 shrink-0"></div>

          <div className="p-8 sm:p-10 overflow-y-auto">
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

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Rol Selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  {t('auth.user_type')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['aspirante', 'empresa', 'institucion'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`py-3 px-2 rounded-xl border-2 font-bold text-[10px] uppercase tracking-wider transition-all ${form.rol === role
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400 shadow-lg shadow-green-200'
                        : 'bg-[var(--bg-main)] border-[var(--border-color)] text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                    >
                      {role === 'aspirante' ? t('auth.candidate') : role === 'empresa' ? t('auth.company') : t('auth.institution')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  {t('auth.email')}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="email"
                    name="correo"
                    placeholder="name@email.com"
                    value={form.correo}
                    onChange={handleChange}
                    className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  {t('auth.phone')}
                </label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="text"
                    name="telefono"
                    placeholder="8888-8888"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full pl-14 pr-5 py-4 bg-[var(--bg-main)] border-2 border-[var(--border-color)] rounded-2xl outline-none focus:border-green-500 text-slate-800 dark:text-white font-bold transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
                  {t('auth.password')}
                </label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type={mostrarContrasena ? "text" : "password"}
                    name="contrasena"
                    placeholder="••••••••"
                    value={form.contrasena}
                    onChange={handleChange}
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

              {/* Terms Checkbox/Link style */}
              <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-[var(--border-color)]">
                <button
                  type="button"
                  className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xs"
                  onClick={() => setMostrarModalTerminos(true)}
                >
                  <ShieldCheck size={16} /> {t('auth.see_terms')}
                </button>
                <p className={`text-[10px] font-black uppercase tracking-widest ${aceptado ? 'text-green-500' : 'text-red-500'}`}>
                  {aceptado ? `✅ ${t('auth.terms_accepted')}` : `❌ ${t('auth.must_accept')}`}
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider">
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
                    {t('auth.registering')}
                  </div>
                ) : t('auth.register_button')}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                {t('auth.already_account')}{" "}
                <button
                  type="button"
                  className="text-green-600 dark:text-green-400 font-extrabold hover:underline ml-1"
                  onClick={onSwitchToLogin}
                >
                  {t('auth.login_link')}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Términos (Premium Style) */}
      {mostrarModalTerminos && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={() => setMostrarModalTerminos(false)}></div>
          <div className="relative bg-[var(--bg-card)] p-8 rounded-[2.5rem] max-w-lg w-full shadow-2xl border border-[var(--border-color)]">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">{t('auth.terms')}</h3>
            <div className="max-h-[50vh] overflow-y-auto pr-4 space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>{t('auth.terms_desc_1')}</p>
              <p>{t('auth.terms_desc_2')}</p>
              <p>{t('auth.terms_desc_3')}</p>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs uppercase tracking-widest"
                onClick={handleRechazarConsentimiento}
              >
                {t('auth.reject')}
              </button>
              <button
                className="flex-1 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all text-xs uppercase tracking-widest shadow-lg shadow-green-900/20"
                onClick={handleAceptarConsentimiento}
              >
                {t('auth.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}