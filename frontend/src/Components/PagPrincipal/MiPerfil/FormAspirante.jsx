import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { crearPerfilAspirante } from "../../../services/services";
import {
  User, Briefcase, MapPin, Flag, FileText, Calendar, Loader2,
  ArrowRight, ArrowLeft, Check, AlertCircle, Info, Star, Cpu,
  Code, Database, Globe, Layers, MessageSquare, Users, Brain, Clock, Shield
} from "lucide-react";

const FormAspirante = ({ usuarioId, onSuccess, currentData, initialStep = 1 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [paso, setPaso] = useState(initialStep);
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tooltipActive, setTooltipActive] = useState(null);

  const [form, setForm] = useState({
    nombre: currentData?.nombre || "",
    apellidos: currentData?.apellidos || "",
    cedula: currentData?.cedula || "",
    fecha_nacimiento: currentData?.fecha_nacimiento || "",
    genero: currentData?.genero || "",
    nacionalidad: currentData?.nacionalidad || "",
    telefono: currentData?.telefono || "",
    telefono_alterno: currentData?.telefono_alterno || "",
    provincia: currentData?.provincia || "",
    canton: currentData?.canton || "",
    carrera_id: currentData?.carrera_id || "ea9e54af-9a82-45d0-9d32-32feaa2d5eb5",
    nivel_educativo: currentData?.nivel_educativo || "secundaria",
    estado_laboral: currentData?.estado_laboral || "buscando",
    sobre_mi: currentData?.sobre_mi || "",
    foto_url: currentData?.foto_url || "",
    habilidades_tecnicas: currentData?.habilidades_tecnicas || [],
    habilidades_blandas: currentData?.habilidades_blandas || [],
    experiencia: currentData?.experiencia || [],
  });

  const techSkillsList = [
    { icon: 'Code', name: 'Frontend', desc: 'Creación de interfaces interactivas con React/Vue' },
    { icon: 'Database', name: 'Backend', desc: 'Gestión de datos y servidores con Node o Django' },
    { icon: 'Cpu', name: 'Arquitectura', desc: 'Diseño de sistemas escalables y robustos' },
    { icon: 'Globe', name: 'Cloud', desc: 'Despliegue y gestión en AWS, Azure o Google Cloud' },
  ];

  const softSkillsList = [
    { icon: 'Users', name: 'Trabajo en Equipo', desc: 'Colaboración efectiva en grupos multidisciplinarios' },
    { icon: 'MessageSquare', name: 'Comunicación', desc: 'Capacidad de transmitir ideas claramente' },
    { icon: 'Clock', name: 'Gestión Tiempo', desc: 'Priorización eficiente de tareas y entregas' },
    { icon: 'Shield', name: 'Liderazgo', desc: 'Capacidad de guiar y motivar equipos' },
  ];

  const toggleSkill = (type, skill) => {
    const list = type === 'tech' ? 'habilidades_tecnicas' : 'habilidades_blandas';
    const exists = form[list].some(s => s.name === skill.name);

    if (exists) {
      setForm({ ...form, [list]: form[list].filter(s => s.name !== skill.name) });
    } else {
      setForm({ ...form, [list]: [...form[list], skill] });
    }
  };

  const getIcon = (iconName) => {
    const icons = { Code, Database, Cpu, Globe, Users, MessageSquare, Clock, Shield };
    const IconComponent = icons[iconName] || Star;
    return <IconComponent className="w-5 h-5" />;
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();

      // Append all flat fields
      Object.keys(form).forEach(key => {
        if (key === 'habilidades_tecnicas' || key === 'habilidades_blandas' || key === 'experiencia') {
          formData.append(key, JSON.stringify(form[key]));
        } else if (key === 'foto_url') {
          if (form[key] instanceof File) {
            formData.append(key, form[key]);
          }
        } else if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      formData.append('usuario_id', usuarioId);

      await crearPerfilAspirante(formData);
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      let errMsg = t('company_profile.error_retry');
      if (error && typeof error === 'object') {
        const messages = Object.values(error).flat();
        if (messages.length > 0) errMsg = messages.join(". ");
      }
      setErrorMsg(errMsg);
      setPaso(1);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 transition-colors duration-300">
      {/* Indicador de Pasos */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-green-600 uppercase tracking-wider">
            {t('candidate_profile.steps.step', { current: paso, total: 3 })}
          </p>
          <p className="text-sm font-medium text-slate-400">
            {paso === 1 ? t('candidate_profile.steps.info_basica') : paso === 2 ? t('candidate_profile.steps.perfil_pro') : t('candidate_profile.steps.habilidades')}
          </p>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            style={{ width: paso === 1 ? "33%" : paso === 2 ? "66%" : "100%" }}
          ></div>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <p className="text-sm font-bold">{t('company_profile.error_save')}</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={paso === 3 ? handleSubmitFinal : (e) => { e.preventDefault(); setPaso(paso + 1); }}>

        {paso === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <User className="text-green-600 dark:text-green-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t('candidate_profile.basic.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t('candidate_profile.basic.subtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.first_name')}</label>
                <input required name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej. Ana María" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.last_name')}</label>
                <input required name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Ej. García Pérez" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.photo')}</label>
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-green-500 transition-all group relative">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex-shrink-0 overflow-hidden border-2 border-white dark:border-slate-700">
                    {form.foto_url ? (
                      <img
                        src={form.foto_url instanceof File ? URL.createObjectURL(form.foto_url) : form.foto_url}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-full h-full p-4 text-slate-200 dark:text-slate-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-500 mb-1">{t('candidate_profile.labels.photo_hint')}</p>
                    <p className="text-[10px] text-slate-400 mb-2">{t('candidate_profile.labels.photo_formats')}</p>
                    <input
                      type="file"
                      name="foto_url"
                      onChange={handleChange}
                      accept="image/*"
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-green-600 file:text-white hover:file:bg-green-700 transition-all cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.id')}</label>
                <input required name="cedula" value={form.cedula} onChange={handleChange} placeholder="0-0000-0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.birth_date')}</label>
                <input required type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.province')}</label>
                <input required name="provincia" value={form.provincia} onChange={handleChange} placeholder="Ej. Cartago" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.canton')}</label>
                <input required name="canton" value={form.canton} onChange={handleChange} placeholder="Ej. La Unión" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.phone')}</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 font-semibold text-sm">+506</span>
                  <input required name="telefono" value={form.telefono} onChange={handleChange} placeholder="8888 8888" className="w-full px-4 py-3 rounded-r-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.phone_alt')}</label>
                <input name="telefono_alterno" value={form.telefono_alterno} onChange={handleChange} placeholder="8888 8888" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.gender')}</label>
                <select required name="genero" value={form.genero} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700 appearance-none">
                  <option value="" disabled>{t('candidate_profile.labels.gender_placeholder')}</option>
                  <option value="Femenino">{t('candidate_profile.labels.gender_female')}</option>
                  <option value="Masculino">{t('candidate_profile.labels.gender_male')}</option>
                  <option value="Otro">{t('candidate_profile.labels.gender_other')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.labels.nationality')}</label>
                <input required name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="Ej. Costarricense" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800" />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100">
              <button type="submit" className="px-8 py-3 bg-[#1a8641] hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-md">
                {t('candidate_profile.buttons.next')} <ArrowRight className="w-5 h-5" />
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
                <h3 className="text-2xl font-bold text-slate-800">{t('candidate_profile.pro.title')}</h3>
                <p className="text-slate-500 text-sm">{t('candidate_profile.pro.subtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.pro.career')}</label>
                <select required name="carrera_id" value={form.carrera_id} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700">
                  <option value="ea9e54af-9a82-45d0-9d32-32feaa2d5eb5">Ingeniería en Sistemas de Información</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.pro.education_level')}</label>
                <select required name="nivel_educativo" value={form.nivel_educativo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-slate-50 focus:bg-white text-slate-700">
                  <option value="secundaria">Secundaria / Bachillerato</option>
                  <option value="tecnico">Técnico Superior</option>
                  <option value="universitario">Universitario (Grado)</option>
                  <option value="licenciatura">Licenciatura</option>
                  <option value="maestria">Maestría o Superior</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.pro.about_me')}</label>
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

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('candidate_profile.pro.experience')}</label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, experiencia: [...form.experiencia, { id: Date.now(), puesto: '', empresa: '', periodo: '', descripcion: '' }] })}
                    className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {t('candidate_profile.pro.add_experience')}
                  </button>
                </div>

                <div className="space-y-4">
                  {form.experiencia.map((exp, index) => (
                    <div key={exp.id || index} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group animate-in slide-in-from-top-2">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, experiencia: form.experiencia.filter((_, i) => i !== index) })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          placeholder="Puesto (Ej. Frontend Dev)"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-green-500"
                          value={exp.puesto}
                          onChange={(e) => {
                            const newExp = [...form.experiencia];
                            newExp[index].puesto = e.target.value;
                            setForm({ ...form, experiencia: newExp });
                          }}
                        />
                        <input
                          placeholder="Empresa"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-green-500"
                          value={exp.empresa}
                          onChange={(e) => {
                            const newExp = [...form.experiencia];
                            newExp[index].empresa = e.target.value;
                            setForm({ ...form, experiencia: newExp });
                          }}
                        />
                        <input
                          placeholder="Periodo (Ej. 2022 - 2024)"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-green-500"
                          value={exp.periodo}
                          onChange={(e) => {
                            const newExp = [...form.experiencia];
                            newExp[index].periodo = e.target.value;
                            setForm({ ...form, experiencia: newExp });
                          }}
                        />
                        <input
                          placeholder="Descripción breve"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-green-500"
                          value={exp.descripcion}
                          onChange={(e) => {
                            const newExp = [...form.experiencia];
                            newExp[index].descripcion = e.target.value;
                            setForm({ ...form, experiencia: newExp });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {form.experiencia.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                      <p className="text-xs">{t('candidate_profile.pro.no_experience')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4">
              <button type="button" onClick={() => setPaso(1)} className="w-full sm:w-auto px-6 py-3 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex justify-center items-center gap-2">
                <ArrowLeft className="w-5 h-5" /> {t('candidate_profile.buttons.back')}
              </button>
              <button type="button" onClick={() => setPaso(3)} className="px-8 py-3 bg-[#1a8641] hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-md">
                {t('candidate_profile.buttons.next')} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Star className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{t('candidate_profile.skills.title')}</h3>
                <p className="text-slate-500 text-sm">{t('candidate_profile.skills.subtitle')}</p>
              </div>
            </div>

            <div className="space-y-8 mb-10">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{t('candidate_profile.skills.tech')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {techSkillsList.map((skill) => (
                    <div key={skill.name} className="relative">
                      <div
                        onClick={() => toggleSkill('tech', skill)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${form.habilidades_tecnicas.some(s => s.name === skill.name) ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setTooltipActive(tooltipActive === skill.name ? null : skill.name); }}
                          className={`p-2 rounded-lg transition-colors ${form.habilidades_tecnicas.some(s => s.name === skill.name) ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                        >
                          {getIcon(skill.icon)}
                        </button>
                        <span className={`font-bold ${form.habilidades_tecnicas.some(s => s.name === skill.name) ? 'text-green-900' : 'text-slate-700'}`}>{skill.name}</span>
                      </div>
                      {tooltipActive === skill.name && (
                        <div className="absolute top-16 left-0 right-0 z-10 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl animate-in zoom-in-95">
                          <p>{skill.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{t('candidate_profile.skills.soft')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {softSkillsList.map((skill) => (
                    <div key={skill.name} className="relative">
                      <div
                        onClick={() => toggleSkill('soft', skill)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${form.habilidades_blandas.some(s => s.name === skill.name) ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setTooltipActive(tooltipActive === skill.name ? null : skill.name); }}
                          className={`p-2 rounded-lg transition-colors ${form.habilidades_blandas.some(s => s.name === skill.name) ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                        >
                          {getIcon(skill.icon)}
                        </button>
                        <span className={`font-bold ${form.habilidades_blandas.some(s => s.name === skill.name) ? 'text-green-900' : 'text-slate-700'}`}>{skill.name}</span>
                      </div>
                      {tooltipActive === skill.name && (
                        <div className="absolute top-16 left-0 right-0 z-10 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl animate-in zoom-in-95">
                          <p>{skill.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4">
              <button type="button" onClick={() => setPaso(2)} className="w-full sm:w-auto px-6 py-3 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex justify-center items-center gap-2">
                <ArrowLeft className="w-5 h-5" /> {t('candidate_profile.buttons.back')}
              </button>
              <button disabled={cargando} type="submit" className={`w-full sm:w-auto px-8 py-3 bg-[#1a8641] hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex justify-center items-center gap-2 shadow-md ${cargando ? "opacity-70 cursor-not-allowed" : ""}`}>
                {cargando ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {t('candidate_profile.buttons.saving')}</>
                ) : (
                  <><Check className="w-5 h-5" /> {t('candidate_profile.buttons.complete')}</>
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