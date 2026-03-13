import React, { useState, useEffect } from "react";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import Sidebar from "../../Components/PagPrincipal/Sidebar/Sidebar";
import { Search, BookOpen, Clock, Calendar, ExternalLink, Sparkles, Heart, CheckCircle } from "lucide-react";
import { obtenerCapacitaciones, toggleFavorito, inscribirCapacitacion } from "../../services/services";
import { LoginModal } from "../../Components/PagPrincipal/Login/Login";
import { AnimatePresence, motion } from "motion/react";

const CapacitacionesPage = () => {
    const [capacitaciones, setCapacitaciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [favoritos, setFavoritos] = useState({});
    const [inscritos, setInscritos] = useState({});
    const [loadingBtn, setLoadingBtn] = useState({});
    const [toast, setToast] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        obtenerCapacitaciones()
            .then(data => { setCapacitaciones(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLike = async (e, capId) => {
        e.stopPropagation();
        const userStr = localStorage.getItem("usuario");
        if (!userStr) { setLoginOpen(true); return; }
        const user = JSON.parse(userStr);
        try {
            await toggleFavorito(user.id, null, capId);
            setFavoritos(prev => ({ ...prev, [capId]: !prev[capId] }));
            showToast(favoritos[capId] ? "Eliminado de favoritos" : "¡Guardado en favoritos!");
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleInscribir = async (e, cap) => {
        e.preventDefault();
        const userStr = localStorage.getItem("usuario");
        if (!userStr) { setLoginOpen(true); return; }
        const user = JSON.parse(userStr);

        if (inscritos[cap.id]) {
            showToast("Ya estás inscrito en esta capacitación", "info");
            return;
        }

        setLoadingBtn(prev => ({ ...prev, [cap.id]: true }));
        try {
            await inscribirCapacitacion(user.id, cap.id);
            setInscritos(prev => ({ ...prev, [cap.id]: true }));
            showToast(`¡Inscrito en "${cap.titulo}"! Aparecerá en tu perfil.`);
            if (cap.url_inscripcion) {
                window.open(cap.url_inscripcion, "_blank");
            }
        } catch (error) {
            if (error?.aspirante || error?.non_field_errors) {
                setInscritos(prev => ({ ...prev, [cap.id]: true }));
                showToast("Ya estabas inscrito anteriormente.", "info");
            } else {
                showToast("Error al inscribirse. Intenta de nuevo.", "error");
            }
        } finally {
            setLoadingBtn(prev => ({ ...prev, [cap.id]: false }));
        }
    };

    const filtered = capacitaciones.filter(c =>
        c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.descripcion && c.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.nombre_empresa && c.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Toast notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm text-white ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-green-600'}`}
                    >
                        <CheckCircle size={18} />
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 lg:ml-72 flex flex-col min-h-screen">
                <div className="p-6 lg:p-10">
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                                <BookOpen size={24} />
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Capacitaciones</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Potencia tus habilidades con cursos de las mejores empresas e instituciones.</p>
                    </header>

                    <div className="relative mb-8 max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar capacitaciones por título, empresa o descripción..."
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm text-slate-700 dark:text-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filtered.map((cap) => (
                                <div key={cap.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -mr-10 -mt-10"></div>

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                            <BookOpen className="text-green-600" size={24} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => handleLike(e, cap.id)}
                                                className={`p-1.5 rounded-xl border transition-colors ${favoritos[cap.id] ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-300'}`}
                                            >
                                                <Heart className={`w-4 h-4 ${favoritos[cap.id] ? 'fill-current' : ''}`} />
                                            </button>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${cap.modalidad?.toLowerCase().includes('virtual')
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900'
                                                : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900'
                                                }`}>
                                                {cap.modalidad}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-green-600 transition-colors uppercase leading-tight tracking-tight relative z-10">
                                        {cap.titulo}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest relative z-10">
                                        {cap.nombre_institucion || cap.nombre_empresa || "Institución"}
                                    </p>

                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 font-medium leading-relaxed relative z-10">
                                        {cap.descripcion}
                                    </p>

                                    <div className="space-y-3 mb-8 relative z-10">
                                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-bold">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                <Clock size={14} className="text-blue-500" />
                                            </div>
                                            Duración: {cap.duracion_horas || cap.duracion || '—'} h
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-bold">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                <Calendar size={14} className="text-orange-500" />
                                            </div>
                                            Inicia: {cap.fecha_inicio ? new Date(cap.fecha_inicio).toLocaleDateString() : 'Pronto'}
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => handleInscribir(e, cap)}
                                        disabled={loadingBtn[cap.id]}
                                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg relative z-10 ${inscritos[cap.id]
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white'
                                            } ${loadingBtn[cap.id] ? 'opacity-70 pointer-events-none' : ''}`}
                                    >
                                        {loadingBtn[cap.id] ? (
                                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                        ) : inscritos[cap.id] ? (
                                            <><CheckCircle size={14} /> Inscrito</>
                                        ) : (
                                            <>Inscribirme <ExternalLink size={14} /></>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filtered.length === 0 && (
                        <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <Sparkles className="mx-auto w-12 h-12 text-slate-300 mb-4" />
                            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No se encontraron capacitaciones</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Vuelve pronto para ver nuevas oportunidades de aprendizaje o intenta una búsqueda diferente.</p>
                        </div>
                    )}
                </div>
                <Footer />
            </main>
            {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
        </div>
    );
};

export default CapacitacionesPage;
