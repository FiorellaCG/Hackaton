import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMiPerfil } from "../../../services/services";
import FormAspirante from "./FormAspirante";
import { User, Briefcase, MapPin, Phone, GraduationCap, Edit, CheckCircle2, ChevronRight, UploadCloud, FileText, Sparkles, Building2, Code, Database, Cpu, Globe, Users, MessageSquare, Clock, Shield, Star } from "lucide-react";
import FormEmpresa from "./FormEmpresa";
import CVIAModal from "./CVIAModal";

const MiPerfil = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const rol = usuario?.rol;

  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarCVIAModal, setMostrarCVIAModal] = useState(false);
  const [skillInfo, setSkillInfo] = useState(null);

  const iconsMap = { Code, Database, Cpu, Globe, Users, MessageSquare, Clock, Shield };

  const renderSkillIcon = (iconName) => {
    const IconComponent = iconsMap[iconName] || Star;
    return <IconComponent className="w-4 h-4" />;
  };

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        if (!usuario.id) {
          setCargando(false);
          return;
        }
        const data = await obtenerMiPerfil(usuario.id);

        if (data && data.perfil_completo === false) {
          // Si el backend explicitly dice que el perfil está incompleto, mostramos el formulario
          setPerfil(data);
          setMostrarForm(true);
        } else if (data && data.persona && data.persona.nombre) {
          setPerfil({
            ...data.usuario,
            ...data.persona,
            ...(data.aspirante || {})
          });
        } else if (data && data.nombre) {
          setPerfil(data);
        } else {
          setMostrarForm(true);
        }
      } catch (error) {
        setMostrarForm(true);
      } finally {
        setCargando(false);
      }
    };
    cargarPerfil();
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (mostrarForm) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <Edit className="w-6 h-6 text-green-600" />
            Completar Mi Perfil
          </h2>
          {rol === "aspirante" && <FormAspirante usuarioId={usuario.id} currentData={perfil} />}
          {rol === "empresa" && <FormEmpresa usuarioId={usuario.id} currentData={perfil} />}
        </div>
      </div>
    );
  }

  if (!perfil) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {rol === "empresa" ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-green-600" /> Perfil de Empresa
            </h3>
            <button onClick={() => setMostrarForm(true)} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Editar Perfil
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Nombre', value: perfil.nombre },
              { label: 'Contacto', value: perfil.nombre_contacto },
              { label: 'Correo Contacto', value: perfil.correo_contacto },
              { label: 'Sitio Web', value: perfil.url_externa || "—" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-transparent dark:border-slate-700/50">
                <span className="block text-slate-500 dark:text-slate-400 mb-1">{item.label}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden transition-colors">
            <div className="flex gap-6 items-start flex-1 w-full">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-slate-900 overflow-hidden relative shadow-lg">
                  <img
                    src={perfil.foto_url || "https://i.pravatar.cc/250?u=a042581f4e29026704d"}
                    alt="Perfil"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm hover:bg-green-600 transition-colors">
                  <Edit className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                    {perfil.nombre} {perfil.apellidos}
                  </h2>
                  <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded p-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <p className="font-semibold text-green-600 dark:text-green-400 text-sm mb-3">
                  Profesional • {perfil.canton}, {perfil.provincia}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {perfil.canton}</span>
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {perfil.nivel_educativo}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {perfil.telefono}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> Tecnología</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {[...(perfil.habilidades_tecnicas || []), ...(perfil.habilidades_blandas || [])].map((skill, i) => (
                    <div
                      key={i}
                      onClick={() => setSkillInfo(skillInfo === skill.name ? null : skill.name)}
                      className="relative flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-green-300 dark:hover:border-green-600 transition-all"
                    >
                      {renderSkillIcon(skill.icon)} {skill.name}
                      {skillInfo === skill.name && (
                        <div className="absolute top-10 left-0 z-20 w-48 p-3 bg-slate-900 dark:bg-slate-950 text-white text-[10px] rounded-xl shadow-2xl animate-in fade-in zoom-in-95 border border-slate-800">
                          {skill.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto min-w-[160px]">
              <button
                onClick={() => setMostrarForm(true)}
                className="w-full bg-[#1a8641] dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-sm shadow-md shadow-green-900/10"
              >
                Editar Perfil
              </button>
              <button
                className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition-all text-sm shadow-sm border border-slate-200 dark:border-slate-700"
              >
                Descargar CV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
              <h3 className="text-sm font-black text-slate-800 dark:text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Postulaciones Recientes
              </h3>

              <div className="space-y-3">
                {perfil.postulaciones && perfil.postulaciones.length > 0 ? (
                  perfil.postulaciones.map((postulacion, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{postulacion.cargo}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{postulacion.empresa}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${postulacion.estado.toLowerCase().includes('entrevista')
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50'
                        : postulacion.estado.toLowerCase().includes('rechazado')
                          ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/50'
                          : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800/50'
                        }`}>
                        {postulacion.estado}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Aún no tienes postulaciones recientes.</p>
                    <button
                      onClick={() => navigate("/empleos")}
                      className="mt-4 text-xs text-green-600 dark:text-green-400 font-black hover:underline uppercase tracking-widest"
                    >
                      Explorar vacantes
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full transition-colors">
              <h3 className="text-sm font-black text-slate-800 dark:text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-green-500" /> Gestión de CV
              </h3>

              <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 transition-all cursor-pointer mb-5 text-center group">
                <UploadCloud className="w-10 h-10 text-slate-400 dark:text-slate-600 mb-3 group-hover:text-green-500 transition-colors" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Subir CV (PDF)</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Soporta hasta 5MB</p>
              </div>

              <button
                onClick={() => setMostrarCVIAModal(true)}
                className="w-full bg-white dark:bg-slate-800 border-2 border-green-100 dark:border-green-900/50 text-green-700 dark:text-green-400 font-black py-3 px-4 rounded-xl transition-all hover:bg-green-50 dark:hover:bg-green-900/20 text-xs flex justify-center items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" /> CREAR CV DIGITAL CON IA
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col transition-colors">
              <h3 className="text-sm font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-500" /> Análisis de Perfil IA
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                Nuestra IA analiza tu perfil para determinar tu afinidad con las vacantes activas en ZFL La Lima.
              </p>

              <div className="w-full mt-auto">
                <button
                  onClick={() => navigate("/talento-match")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-4 rounded-2xl transition-all text-xs shadow-lg shadow-blue-900/20 uppercase tracking-widest flex justify-center items-center gap-2"
                >
                  <Cpu className="w-4 h-4" /> Analizar Perfil ahora
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
              <h3 className="text-sm font-black text-orange-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Star className="w-4 h-4" />
                Habilidades Recomendadas
              </h3>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mb-5 uppercase tracking-tight">Basado en tendencias de la zona:</p>

              <div className="space-y-2">
                {["Docker & Kubernetes", "AWS Cloud Practitioner", "Scrum Master Certification"].map((habilidad, index) => (
                  <div key={index} className="flex justify-between items-center p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group">
                    {habilidad}
                    <div className="p-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <CVIAModal
        isOpen={mostrarCVIAModal}
        onClose={() => setMostrarCVIAModal(false)}
        perfil={perfil}
      />
    </div>
  );
};

export default MiPerfil;