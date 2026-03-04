import React, { useState, useEffect } from "react";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import Sidebar from "../../Components/PagPrincipal/Sidebar";
import { Search, BookOpen, Clock, Calendar, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { obtenerCapacitaciones } from "../../services/services";

const CapacitacionesPage = () => {
    const [capacitaciones, setCapacitaciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerCapacitaciones()
            .then(data => {
                setCapacitaciones(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filtered = capacitaciones.filter(c =>
        c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.nombre_empresa && c.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${cap.modalidad.toLowerCase().includes('virtual')
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900'
                                                : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900'
                                            }`}>
                                            {cap.modalidad}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-green-600 transition-colors uppercase leading-tight tracking-tight relative z-10">
                                        {cap.titulo}
                                    </h3>

                                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 relative z-10">
                                        {cap.nombre_empresa || cap.nombre_institucion || "Empresa GreenTalent"}
                                    </p>

                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 font-medium leading-relaxed relative z-10">
                                        {cap.descripcion}
                                    </p>

                                    <div className="space-y-3 mb-8 relative z-10">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                                            <Clock size={14} className="text-slate-400" />
                                            Duración: {cap.duracion}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                                            <Calendar size={14} className="text-slate-400" />
                                            Inicia: {cap.fecha_inicio ? new Date(cap.fecha_inicio).toLocaleDateString() : 'Pronto'}
                                        </div>
                                    </div>

                                    <a
                                        href={cap.url_inscripcion || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-slate-200 dark:shadow-none relative z-10"
                                    >
                                        Inscribirme <ExternalLink size={14} />
                                    </a>
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
        </div>
    );
};

export default CapacitacionesPage;
