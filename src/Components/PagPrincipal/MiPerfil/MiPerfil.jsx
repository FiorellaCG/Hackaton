import { useState, useEffect } from "react";
import { obtenerMiPerfil } from "../../../services/services";
import FormAspirante from "./FormAspirante";
import { User, Briefcase, MapPin, Phone, GraduationCap, Edit, CheckCircle2, ChevronRight, UploadCloud, FileText, Sparkles, Building2 } from "lucide-react";
import FormEmpresa from "./FormEmpresa";
import CVIAModal from "./CVIAModal";

const MiPerfil = () => {
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
        if (data && data.persona && data.persona.nombre) {
          setPerfil({
            ...data.usuario,
            ...data.persona,
            ...(data.aspirante || {})
          });
        } else if (data && data.nombre) {
          // Lógica para Empresas que viene desde origin/main
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

  // ── Si no tiene perfil aún, mostrar formulario ──
  if (mostrarForm) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Edit className="w-6 h-6 text-green-600" />
            Completar Mi Perfil
          </h2>
          {rol === "aspirante" && <FormAspirante usuarioId={usuario.id} />}
          {rol === "empresa" && <FormEmpresa usuarioId={usuario.id} />}
        </div>
      </div>
    );
  }

  // Si no hay sesión o falló algo crítico
  if (!perfil) return null;

  // ── Si ya tiene perfil, mostrar la info (DISEÑO MOCKUP GREEN TALENT) ──
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {rol === "empresa" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-green-600" /> Perfil de Empresa
            </h3>
            <button onClick={() => setMostrarForm(true)} className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
              Editar Perfil
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-xl">
              <span className="block text-slate-500 mb-1">Nombre</span>
              <span className="font-bold text-slate-800">{perfil.nombre}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <span className="block text-slate-500 mb-1">Contacto</span>
              <span className="font-bold text-slate-800">{perfil.nombre_contacto}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <span className="block text-slate-500 mb-1">Correo Contacto</span>
              <span className="font-bold text-slate-800">{perfil.correo_contacto}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <span className="block text-slate-500 mb-1">Sitio Web</span>
              <span className="font-bold text-slate-800">{perfil.url_externa || "—"}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* TARJETA 1: Cabecera Perfil principal */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">

            {/* Lado izquierdo: Foto y Datos base */}
            <div className="flex gap-6 items-start flex-1 w-full">
              {/* Avatar con botón de ajuste */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-slate-900 overflow-hidden relative shadow-lg">
                  <img
                    src="https://i.pravatar.cc/250?u=a042581f4e29026704d"
                    alt="Perfil"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm hover:bg-green-600 transition-colors">
                  <Edit className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {perfil.nombre} {perfil.apellidos}
                  </h2>
                  <div className="bg-orange-100 text-orange-600 rounded p-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <p className="font-semibold text-green-600 text-sm mb-3">
                  Profesional • {perfil.canton}, {perfil.provincia}
                </p>

                {/* Atributos pequeños (ej. Paralelo, Universitario) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-5 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Paralelo</span>
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> {perfil.nivel_educativo}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {perfil.telefono}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Tecnología</span>
                </div>

                {/* Etiquetas/Badges inferiroes - AHORA DINÁMICOS */}
                <div className="flex flex-wrap gap-3">
                  {perfil.habilidades_tecnicas?.map((skill, i) => (
                    <div
                      key={i}
                      onClick={() => setSkillInfo(skillInfo === skill.name ? null : skill.name)}
                      className="relative flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg text-xs font-semibold text-green-700 border border-green-100 cursor-pointer hover:bg-green-100 transition-colors"
                    >
                      {renderSkillIcon(skill.icon)} {skill.name}
                      {skillInfo === skill.name && (
                        <div className="absolute top-10 left-0 z-20 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl animate-in fade-in zoom-in-95">
                          {skill.desc}
                        </div>
                      )}
                    </div>
                  ))}
                  {perfil.habilidades_blandas?.map((skill, i) => (
                    <div
                      key={i}
                      onClick={() => setSkillInfo(skillInfo === skill.name ? null : skill.name)}
                      className="relative flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {renderSkillIcon(skill.icon)} {skill.name}
                      {skillInfo === skill.name && (
                        <div className="absolute top-10 left-0 z-20 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl animate-in fade-in zoom-in-95">
                          {skill.desc}
                        </div>
                      )}
                    </div>
                  ))}
                  {(!perfil.habilidades_tecnicas?.length && !perfil.habilidades_blandas?.length) && (
                    <p className="text-xs text-slate-400 italic">No has agregado habilidades aún</p>
                  )}
                </div>
              </div>
            </div>

            {/* Lado derecho: Botones */}
            <div className="flex flex-col gap-3 w-full md:w-auto min-w-[160px]">
              <button
                onClick={() => setMostrarForm(true)}
                className="w-full bg-[#1a8641] hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm"
              >
                Editar Perfil
              </button>
              <button
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm border border-slate-200"
              >
                Descargar CV
              </button>
            </div>
          </div>

          {/* FILA DE DOS COLUMNAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

            {/* TARJETA 2: Postulaciones Recientes */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Postulaciones Recientes
              </h3>

              <div className="space-y-4">
                {perfil.postulaciones && perfil.postulaciones.length > 0 ? (
                  perfil.postulaciones.map((postulacion, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{postulacion.cargo}</h4>
                        <p className="text-xs text-slate-500 font-medium">{postulacion.empresa}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit border ${postulacion.estado.toLowerCase().includes('entrevista')
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : postulacion.estado.toLowerCase().includes('rechazado')
                          ? 'bg-red-50 text-red-600 border-red-100'
                          : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                        {postulacion.estado}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-slate-500">Aún no tienes postulaciones recientes.</p>
                    <button className="mt-3 text-sm text-green-600 font-bold hover:underline">
                      Explorar vacantes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* TARJETA 3: Gestión de CV */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
              <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-500" /> Gestión de CV
              </h3>

              <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-green-50 hover:border-green-200 transition-colors cursor-pointer mb-4 text-center">
                <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                <h4 className="font-bold text-slate-700 text-sm">Subir CV (PDF)</h4>
                <p className="text-xs text-slate-400">Máximo 5MB</p>
              </div>

              <button
                onClick={() => setMostrarCVIAModal(true)}
                className="w-full bg-white border border-green-200 text-green-700 font-bold py-2.5 px-4 rounded-xl transition-colors hover:bg-green-50 text-sm flex justify-center items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Crear CV Digital
              </button>
            </div>

          </div>

          {/* FILA DE DOS COLUMNAS - INFERIOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

            {/* TARJETA 4: Análisis de Perfil IA */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" /> Análisis de Perfil IA
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                Analiza tu perfil actual para ver qué tan compatible eres con las empresas de ZFL.
              </p>

              <div className="w-full mt-auto">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-md flex justify-center items-center gap-2">
                  Analizar Perfil ahora
                </button>
              </div>
            </div>

            {/* TARJETA 5: Habilidades Sugeridas */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-orange-500 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Habilidades Recomendadas
              </h3>

              <p className="text-xs text-slate-500 mb-4">Basado en las vacantes de ZFL, podrías aprender:</p>

              <div className="space-y-2">
                {["Docker & Kubernetes", "AWS Cloud Practitioner", "Metodologías Ágiles"].map((habilidad, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 text-sm font-bold text-slate-700 hover:border-slate-200 cursor-pointer transition-colors group">
                    {habilidad}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}

      {/* MODAL IA CV GENERATOR */}
      <CVIAModal
        isOpen={mostrarCVIAModal}
        onClose={() => setMostrarCVIAModal(false)}
        perfil={perfil}
      />
    </div>
  );
};

export default MiPerfil;