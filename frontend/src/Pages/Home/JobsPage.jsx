import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../Components/PagPrincipal/Navbar/NavBar";
import Footer from "../../Components/PagPrincipal/Home/Footer";
import FeaturedJobs from "../../Components/PagPrincipal/Home/FeaturedJobs";
import { allJobs } from "../../data/mockJobs";
import { Search, Briefcase, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

function JobsPage({ tipo }) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [inputValue, setInputValue] = useState(initialQuery);
    const [allJobsCombined, setAllJobsCombined] = useState([...allJobs]);

    // Sync state if URL changes
    useEffect(() => {
        const q = searchParams.get("q") || "";
        setSearchTerm(q);
        setInputValue(q);
    }, [searchParams]);

    // Load active jobs from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('vacantes_empresa');
            if (stored) {
                const parsed = JSON.parse(stored);
                let companyName = "Empresa Confidencial";
                let companyLogo = `https://ui-avatars.com/api/?name=Empresa&background=163a6d&color=fff`;

                const currentUser = localStorage.getItem('usuario');
                if (currentUser) {
                    const u = JSON.parse(currentUser);
                    if (u.empresa?.nombre) {
                        companyName = u.empresa.nombre;
                        companyLogo = u.empresa.url_imagen || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=163a6d&color=fff`;
                    }
                }

                const localJobs = parsed.map(v => ({
                    id: `local-${v.id}`,
                    title: v.titulo,
                    company: companyName,
                    location: v.ubicacion,
                    type: v.tipo || "Empleo",
                    schedule: v.horario || v.modalidad,
                    level: "Profesional",
                    salary: "A convenir",
                    logo: companyLogo,
                    tags: [v.modalidad, ...(v.requisitos ? v.requisitos.split(',').map(r => r.trim()) : [])]
                }));

                // Merge with mock
                setAllJobsCombined([...localJobs, ...allJobs]);
            }
        } catch (e) {
            console.error("Error cargando vacantes:", e);
        }
    }, []);

    const isPasantia = tipo === 'pasantia';
    const title = isPasantia ? "Pasantías Disponibles" : "Explorar Vacantes";
    const subtitle = isPasantia
        ? "Encuentra tu primera oportunidad profesional"
        : "Descubre el próximo gran paso en tu carrera";
    const filterType = isPasantia ? 'pasantía' : 'empleo';

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(inputValue);
        if (inputValue) {
            setSearchParams({ q: inputValue });
        } else {
            setSearchParams({});
        }
    };

    const filteredJobs = allJobsCombined.filter(job => {
        // First check if the job matches the current page type (empleo vs pasantia)
        const normalizedJobType = job.type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedFilterType = filterType.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const isMatchingType = normalizedJobType === normalizedFilterType;
        if (!isMatchingType && tipo !== 'todos') return false;

        // If there's no search term, return all jobs of this type
        if (!searchTerm) return true;

        // If there is a search term, filter by title, company, or tags
        const searchLower = searchTerm.toLowerCase();
        return (
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.type.toLowerCase().includes(searchLower) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-main)] transition-colors duration-300">
            <Navbar />

            {/* Header Section */}
            <div className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-20 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl mb-6">
                        {isPasantia ? <GraduationCap size={40} /> : <Briefcase size={40} />}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-8">
                        {subtitle}
                    </p>

                    {/* Simple Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Buscar ${isPasantia ? 'carrera o tecnología...' : 'cargo, empresa o tecnología...'}`}
                            className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-400 py-4 px-4"
                        />
                        <button
                            type="submit"
                            className="bg-[#1a8641] dark:bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-r-2xl transition-colors"
                        >
                            Buscar
                        </button>
                    </form>
                </div>
            </div>

            <main className="flex-grow py-8">
                {filteredJobs.length > 0 ? (
                    <FeaturedJobs jobs={filteredJobs} />
                ) : (
                    <div className="text-center py-20 px-4">
                        <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No se encontraron resultados</h3>
                        <p className="text-slate-500 dark:text-slate-400">Intenta buscando con otros términos o palabras clave.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default JobsPage;
