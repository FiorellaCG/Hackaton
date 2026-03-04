import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearPerfilEmpresa } from "../../../services/services";
import { Building2, Mail, User, Globe, FileText, ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";

const FormEmpresa = ({ usuarioId, currentData, onSuccess }) => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [form, setForm] = useState({
    nombre: currentData?.nombre || "",
    descripcion: currentData?.descripcion || "",
    nombre_contacto: currentData?.nombre_contacto || "",
    correo_contacto: currentData?.correo_contacto || currentData?.correo || "",
    url_externa: currentData?.url_externa || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorMsg(null);
    try {
      await crearPerfilEmpresa({
        ...form,
        usuario_id: usuarioId,
      });
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      let errMsg = "Revisa la información registrada e intenta de nuevo.";
      if (error && typeof error === 'object') {
        const messages = Object.values(error).flat();
        if (messages.length > 0) errMsg = messages.join(". ");
      }
      setErrorMsg(errMsg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
          <Building2 className="text-green-600 dark:text-green-400 w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Perfil Corporativo</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Completa los datos de tu empresa</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <p className="text-sm font-bold">No se pudo guardar la información</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" /> Nombre de la Empresa
            </label>
            <input
              required
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej. GreenTalent Corp"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> Nombre de Contacto
            </label>
            <input
              required
              name="nombre_contacto"
              value={form.nombre_contacto}
              onChange={handleChange}
              placeholder="Ej. Roberto Sánchez"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Correo de Contacto
            </label>
            <input
              required
              type="email"
              name="correo_contacto"
              value={form.correo_contacto}
              onChange={handleChange}
              placeholder="rrhh@empresa.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" /> Sitio Web Corporativo (Opcional)
            </label>
            <input
              name="url_externa"
              value={form.url_externa}
              onChange={handleChange}
              placeholder="https://www.tuempresa.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Descripción de la Empresa
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describe la misión, visión y a qué se dedica tu empresa..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800 resize-none"
            />
          </div>

        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={cargando}
            type="submit"
            className={`w-full sm:w-auto px-8 py-3 bg-[#1a8641] hover:bg-green-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 shadow-md ${cargando ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {cargando ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
            ) : (
              <><Check className="w-5 h-5" /> Completar Perfil</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default FormEmpresa;