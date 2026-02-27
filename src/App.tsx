import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, CheckCircle, XCircle, User, Heart, X, Info, Sparkles, Send } from 'lucide-react';

interface Vacante {
  id: string;
  titulo: string;
  descripcion: string;
  empresa_nombre: string;
  empresa_logo: string;
  area_nombre: string;
  salario: string;
  ubicacion: string;
  requisitos: string[];
}

interface Postulacion {
  id: string;
  titulo: string;
  empresa_nombre: string;
  match_score: number;
  creado_en: string;
}

interface SwipeCardProps {
  vacante: Vacante;
  onSwipe: (direction: 'left' | 'right') => void | Promise<void>;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ vacante, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100"
    >
      <div className="relative h-64">
        <img
          src={vacante.empresa_logo}
          alt={vacante.empresa_nombre}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white">
          <h2 className="text-2xl font-bold leading-tight">{vacante.titulo}</h2>
          <p className="text-lg opacity-90">{vacante.empresa_nombre}</p>
        </div>
        
        {/* Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-emerald-500 rounded-lg px-4 py-2 rotate-[-20deg]">
          <span className="text-emerald-500 text-4xl font-black uppercase">INTERÉS</span>
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-rose-500 rounded-lg px-4 py-2 rotate-[20deg]">
          <span className="text-rose-500 text-4xl font-black uppercase">PASAR</span>
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {vacante.area_nombre}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {vacante.ubicacion}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            {vacante.salario}
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {vacante.descripcion}
        </p>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Requisitos Clave</h4>
          <div className="flex flex-wrap gap-2">
            {vacante.requisitos.map((req, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<'swipe' | 'matches' | 'profile'>('swipe');
  const [userSkills, setUserSkills] = useState<string[]>(['React', 'Node.js', 'JavaScript']);
  const [newSkill, setNewSkill] = useState('');
  const [lastMatch, setLastMatch] = useState<any>(null);

  useEffect(() => {
    fetchVacantes();
    fetchPostulaciones();
  }, []);

  const fetchVacantes = async () => {
    const res = await fetch('/api/vacantes');
    const data = await res.json();
    setVacantes(data);
  };

  const fetchPostulaciones = async () => {
    const res = await fetch('/api/postulaciones');
    const data = await res.json();
    setPostulaciones(data);
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const vacante = vacantes[currentIndex];
      const res = await fetch('/api/postular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vacante_id: vacante.id,
          aspirante_id: 'user_123',
          user_skills: userSkills
        })
      });
      const data = await res.json();
      if (data.match && data.match.score > 50) {
        setLastMatch({ ...data.match, vacante });
      }
      fetchPostulaciones();
    }
    setCurrentIndex(prev => prev + 1);
  };

  const addSkill = () => {
    if (newSkill && !userSkills.includes(newSkill)) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setView('profile')} className={`p-2 rounded-full transition-colors ${view === 'profile' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:bg-gray-50'}`}>
            <User className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              TALENTMATCH
            </h1>
          </div>
          <button onClick={() => setView('matches')} className={`p-2 rounded-full transition-colors ${view === 'matches' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:bg-gray-50'}`}>
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="pt-20 pb-24 px-4 max-w-md mx-auto min-h-screen flex flex-col">
        {view === 'swipe' && (
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
              {currentIndex < vacantes.length ? (
                <SwipeCard
                  key={vacantes[currentIndex].id}
                  vacante={vacantes[currentIndex]}
                  onSwipe={handleSwipe}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold">¡Has visto todo por hoy!</h3>
                  <p className="text-gray-500">Vuelve más tarde para nuevas oportunidades.</p>
                  <button 
                    onClick={() => setCurrentIndex(0)}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Reiniciar búsqueda
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            {currentIndex < vacantes.length && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:scale-110 transition-transform border border-gray-100"
                >
                  <X className="w-8 h-8" />
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-500 hover:scale-110 transition-transform border border-gray-100"
                >
                  <Heart className="w-8 h-8 fill-current" />
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'matches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight">Tus Matches</h2>
              <button onClick={() => setView('swipe')} className="text-sm font-semibold text-indigo-600">Volver</button>
            </div>
            <div className="grid gap-4">
              {postulaciones.length > 0 ? postulaciones.map((p) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={p.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-gray-900">{p.titulo}</h4>
                    <p className="text-sm text-gray-500">{p.empresa_nombre}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-black ${p.match_score > 70 ? 'text-emerald-500' : 'text-indigo-500'}`}>
                      {Math.round(p.match_score)}%
                    </div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Match</span>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-12 text-gray-400">
                  Aún no tienes postulaciones. ¡Empieza a swipear!
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight">Tu Perfil</h2>
              <button onClick={() => setView('swipe')} className="text-sm font-semibold text-indigo-600">Volver</button>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="text-xl font-bold">Juan Developer</h3>
                  <p className="text-gray-500">Fullstack Engineer</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tus Habilidades (Python Matcher)</label>
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((skill) => (
                    <span key={skill} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-indigo-800">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Agregar habilidad..."
                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                  <button onClick={addSkill} className="bg-indigo-600 text-white p-2 rounded-xl">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Match Modal */}
      <AnimatePresence>
        {lastMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-indigo-600/95 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center text-white space-y-8"
            >
              <h2 className="text-6xl font-black italic tracking-tighter">¡IT'S A MATCH!</h2>
              <div className="flex justify-center -space-x-4">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <div className="w-full h-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-4xl font-bold">JD</div>
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <img src={lastMatch.vacante.empresa_logo} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{lastMatch.vacante.empresa_nombre} está interesado en ti</p>
                <p className="opacity-80">Tu puntuación de match es del {Math.round(lastMatch.score)}%</p>
              </div>
              <div className="pt-8 flex flex-col gap-4">
                <button 
                  onClick={() => setLastMatch(null)}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform"
                >
                  ENVIAR MENSAJE
                </button>
                <button 
                  onClick={() => setLastMatch(null)}
                  className="text-white/60 font-bold hover:text-white"
                >
                  Seguir buscando
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Tab Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 h-20 flex items-center justify-around z-40">
        <button onClick={() => setView('swipe')} className={`p-2 ${view === 'swipe' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Briefcase className="w-7 h-7" />
        </button>
        <button onClick={() => setView('matches')} className={`p-2 ${view === 'matches' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Heart className="w-7 h-7" />
        </button>
        <button onClick={() => setView('profile')} className={`p-2 ${view === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <User className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
