import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearPerfilAspirante } from "../../../services/services";
import { User, Briefcase, MapPin, Flag, FileText, Calendar, Loader2, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";

const FormAspirante = ({ usuarioId, onSuccess }) => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    fecha_nacimiento: "",
    genero: "",
    nacionalidad: "",
    telefono: "",
    telefono_alterno: "",
    provincia: "",
    canton: "",
    carrera_id: "ea9e54af-9a82-45d0-9d32-32feaa2d5eb5", // Valor por defecto válido recién creado
    nivel_educativo: "secundaria",
    estado_laboral: "buscando",
    sobre_mi: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorMsg(null);
    try {
      const payload = { ...form, usuario_id: usuarioId };
      // Limpiar campos vacíos que pueden causar error 400 en el backend
      if (!payload.fecha_nacimiento) delete payload.fecha_nacimiento;
      if (!payload.telefono_alterno) delete payload.telefono_alterno;
      if (!payload.sobre_mi) delete payload.sobre_mi;

      await crearPerfilAspirante(payload);

      // Llamamos a la función de éxito para ocultar el formulario
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
      setPaso(1); // Devolver al paso 1 por si faltan datos obligatorios ahí
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-10">
      {/* Indicador de Pasos */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-green-600 uppercase tracking-wider">
            Paso {paso} de 2
          </p>
          <p className="text-sm font-medium text-slate-400">
            {paso === 1 ? "Información Básica" : "Perfil Profesional"}
          </p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: paso === 1 ? "50%" : "100%" }}
          ></div>
        </div>
      </div>

      {/* Mostrar Mensajes de Error Profesionales */}
      {errorMsg && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <p className="text-sm font-bold">No se pudo guardar la información</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={paso === 2 ? handleSubmitFinal : (e) => { e.preventDefault(); setPaso(2); }}>

        {/* PASO 1 */}
        {paso === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <User className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Datos Personales</h3>
                <p className="text-slate-500 text-sm">Ingresa tu información de contacto</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Nombre y Apellido */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nombres</label>
                <input required name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej. Ana María" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Apellidos</label>
                <input required name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Ej. García Pérez" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>

              {/* Cédula y Nacimiento */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cédula</label>
                <input required name="cedula" value={form.cedula} onChange={handleChange} placeholder="0-0000-0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Fecha de Nacimiento</label>
                <input required type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Provincia</label>
                <input required name="provincia" value={form.provincia} onChange={handleChange} placeholder="Ej. Cartago" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cantón</label>
                <input required name="canton" value={form.canton} onChange={handleChange} placeholder="Ej. La Unión" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>

              {/* Teléfonos */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Teléfono</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 font-semibold text-sm">+506</span>
                  <input required name="telefono" value={form.telefono} onChange={handleChange} placeholder="8888 8888" className="w-full px-4 py-3 rounded-r-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Teléfono Alterno (Opcional)</label>
                <input name="telefono_alterno" value={form.telefono_alterno} onChange={handleChange} placeholder="8888 8888" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>

              {/* Género y Nacionalidad */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Género</label>
                <select required name="genero" value={form.genero} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700 appearance-none">
                  <option value="" disabled>Selecciona tu género</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro / Prefiero no decir</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nacionalidad</label>
                <input required name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="Ej. Costarricense" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100">
              <button type="submit" className="px-8 py-3 bg-[#1a8641] hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-md">
                Siguiente Paso <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* PASO 2 */}
        {paso === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Briefcase className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Perfil Profesional</h3>
                <p className="text-slate-500 text-sm">Cuéntanos sobre tu experiencia y estudios</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Carrera / Especialidad</label>
                {/* Lo dejamos como select con una opcion por ahora para usar el ID real de tu DB */}
                <select required name="carrera_id" value={form.carrera_id} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700">
                  <option value="" disabled>Selecciona tu especialidad</option>
                  <option value="ea9e54af-9a82-45d0-9d32-32feaa2d5eb5">Ingeniería en Sistemas de Información</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nivel Educativo Actual</label>
                <select required name="nivel_educativo" value={form.nivel_educativo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700">
                  <option value="secundaria">Secundaria / Bachillerato</option>
                  <option value="tecnico">Técnico Superior</option>
                  <option value="universitario">Universitario (Grado)</option>
                  <option value="licenciatura">Licenciatura</option>
                  <option value="maestria">Maestría o Superior</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Estado Laboral Actual</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["buscando", "empleado", "desempleado"].map((estado) => (
                    <label
                      key={estado}
                      className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${form.estado_laboral === estado ? "border-green-600 bg-green-50 text-green-800 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"}`}
                    >
                      <input
                        type="radio"
                        name="estado_laboral"
                        value={estado}
                        checked={form.estado_laboral === estado}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-semibold capitalize">
                        {estado === 'buscando' ? 'Buscando Empleo' : estado}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Sobre mí (Breve descripción de tu perfil)</label>
                <textarea
                  required
                  name="sobre_mi"
                  value={form.sobre_mi}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Soy un profesional analítico con más de 3 años de experiencia en..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4">
              <button type="button" onClick={() => setPaso(1)} className="w-full sm:w-auto px-6 py-3 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex justify-center items-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Atrás
              </button>

              <button disabled={cargando} type="submit" className={`w-full sm:w-auto px-8 py-3 bg-[#1a8641] hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex justify-center items-center gap-2 shadow-md ${cargando ? "opacity-70 cursor-not-allowed" : ""}`}>
                {cargando ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                ) : (
                  <><Check className="w-5 h-5" /> Completar Perfil</>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormAspirante;