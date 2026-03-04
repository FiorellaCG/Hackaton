import React, { useState, useEffect } from "react";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import { obtenerEmpresas } from "../../services/services";
import { Building2, Search, ExternalLink, Globe, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const CompaniesPage = () => {
    const [empresas, setEmpresas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const data = await obtenerEmpresas();
                setEmpresas(data);
            } catch (error) {
                console.error("Error al obtener empresas:", error);
            } finally {
                setCargando(false);
            }
        };
        fetchEmpresas();
    }, []);

    const filteredEmpresas = empresas.filter(emp =>
        emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.descripcion && emp.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-main)] transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-3xl mb-8"
                    >
                        <Building2 size={48} strokeWidth={1.5} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-black text-slate-800 dark:text-white mb-6 tracking-tight uppercase"
                    >
                        Nuestros <span className="text-green-600 dark:text-green-400">Partners</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto mb-12 uppercase tracking-widest text-sm"
                    >
                        Conoce a las empresas líderes que impulsan el desarrollo tecnológico en la región
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl mx-auto relative flex items-center shadow-2xl shadow-green-900/10 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-2"
                    >
                        <Search className="w-6 h-6 text-slate-400 ml-6 shrink-0" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre o sector..."
                            className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-bold placeholder:text-slate-400 py-5 px-6 text-lg"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Companies Grid */}
            <main className="flex-grow py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {cargando ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
                        </div>
                    ) : filteredEmpresas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEmpresas.map((emp, index) => (
                                <motion.div
                                    key={emp.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden shadow-inner group-hover:border-green-200 dark:group-hover:border-green-800 transition-colors">
                                            {emp.url_imagen ? (
                                                <img src={emp.url_imagen} alt={emp.nombre} className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                            )}
                                        </div>
                                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            Partner Oficial
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                        {emp.nombre}
                                    </h3>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-3 mb-8 leading-relaxed">
                                        {emp.descripcion || "Líder en innovación tecnológica y compromiso con la excelencia operativa en Costa Rica."}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                            <Globe size={16} className="text-green-500" />
                                            <span className="text-xs font-bold truncate max-w-[200px]">{emp.url_externa || "Sitio web no disponible"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                            <MapPin size={16} className="text-green-500" />
                                            <span className="text-xs font-bold">Zona Franca La Lima, CR</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                        <Users size={10} className="text-slate-400" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">+100 vacantes</span>
                                        </div>

                                        <a
                                            href={emp.url_externa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white rounded-xl transition-all shadow-sm"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4">
                            <h3 className="text-2xl font-black text-slate-700 dark:text-slate-300 mb-2 uppercase">No se encontraron empresas</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Intenta buscando con otros términos.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CompaniesPage;
