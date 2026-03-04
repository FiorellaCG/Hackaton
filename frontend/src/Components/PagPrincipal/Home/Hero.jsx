import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Users, Briefcase, Sparkles, GraduationCap } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { obtenerEstadisticasGeneral } from "../../../services/services";

const Hero = ({ onSearch }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [activeCategory, setActiveCategory] = useState("todos");
    const [serverStats, setServerStats] = useState(null);

    useEffect(() => {
        obtenerEstadisticasGeneral()
            .then(data => setServerStats(data))
            .catch(err => console.error("Error fetching hero stats:", err));
    }, []);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchValue(val);
        // Instant search while typing (if enabled by parent)
        if (onSearch) onSearch(val, activeCategory);
    };

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        if (onSearch) onSearch(searchValue, cat);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchValue, activeCategory);
        } else {
            // Navigate to specific page with query parameter
            let route = activeCategory === 'pasantías' ? '/pasantias' : '/empleos';
            navigate(`${route}?q=${encodeURIComponent(searchValue)}`);
        }
    };

    const stats = [
        { label: t('hero.stats.vacancies'), value: serverStats?.total_vacantes ? `${serverStats.total_vacantes}+` : '120+', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30', path: '/empleos' },
        { label: t('hero.stats.companies'), value: serverStats?.total_empresas ? `${serverStats.total_empresas}+` : '45+', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30', path: '/empresas' },
        { label: t('hero.stats.hired'), value: serverStats?.total_postulaciones ? `${serverStats.total_postulaciones}+` : '850+', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/30', path: '/estadisticas' },
    ];

    return (
        <section className="relative w-full pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-green-100/40 dark:bg-green-900/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-4xl w-full text-center space-y-12">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 dark:text-white tracking-tight leading-[1.1]">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                        {t('hero.subtitle')}
                    </p>
                </div>

                {/* Search Bar Container with Tabs */}
                <div className="relative max-w-3xl mx-auto w-full group">
                    {/* Tabs */}
                    <div className="flex justify-start gap-4 mb-3 ml-2">
                        {[
                            { id: 'todos', label: t('hero.categories.all'), icon: Search },
                            { id: 'empleos', label: t('hero.categories.jobs'), icon: Briefcase },
                            { id: 'pasantías', label: t('hero.categories.internships'), icon: GraduationCap }
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-6 py-2.5 rounded-t-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all duration-300 border-b-2 ${activeCategory === cat.id
                                    ? 'bg-white dark:bg-slate-900 text-[#1a8641] dark:text-green-500 border-[#1a8641] dark:border-green-500 shadow-[-10px_-10px_20px_rgba(0,0,0,0.02)]'
                                    : 'text-slate-400 dark:text-slate-600 border-transparent hover:text-slate-600 dark:hover:text-slate-400'
                                    }`}
                            >
                                <cat.icon size={14} />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex flex-col md:flex-row items-center bg-white dark:bg-slate-900 rounded-3xl rounded-tl-none p-3 shadow-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex-1 flex items-center px-6 w-full border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700 py-4 md:py-0">
                            <Search className="w-5 h-5 text-slate-400 mr-4 shrink-0" />
                            <input
                                type="text"
                                placeholder={
                                    activeCategory === 'empleos' ? t('hero.search_jobs_placeholder') :
                                        activeCategory === 'pasantías' ? t('hero.search_internships_placeholder') :
                                            t('hero.search_placeholder')
                                }
                                value={searchValue}
                                onChange={handleSearchChange}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                                className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex-[0.5] flex items-center px-6 w-full py-4 md:py-0">
                            <MapPin className="w-5 h-5 text-slate-400 mr-4 shrink-0" />
                            <span className="text-slate-700 dark:text-slate-200 font-black text-xs uppercase tracking-widest">{t('brand.location') || 'Zona Franca La Lima'}</span>
                        </div>
                        <button
                            type="button"
                            onClick={handleSearchClick}
                            className="w-full md:w-auto px-10 py-5 bg-[#1a8641] dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 group/btn"
                        >
                            <Sparkles className="w-4 h-4 text-green-300 group-hover:animate-pulse" />
                            {t('hero.search_button')}
                        </button>
                    </div>
                    {/* IA Recommendation Badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full border border-slate-800 dark:border-slate-200 flex items-center gap-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        <Sparkles size={12} className="text-green-400 dark:text-green-600" />
                        {t('hero.smart_match', { count: 124 })}
                    </div>
                </div>

                {/* Popular Tags */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
                    <span className="text-slate-400 dark:text-slate-600 uppercase tracking-widest text-xs">
                        {t('hero.popular')}
                    </span>
                    {Object.entries(t('hero.popular_tags', { returnObjects: true })).map(([key, tag]) => (
                        <span
                            key={key}
                            onClick={() => navigate(`/empleos?q=${tag}`)}
                            className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600 transition-colors cursor-pointer capitalize"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx}
                                onClick={() => navigate(stat.path)}
                                className="flex flex-col items-center p-4 cursor-pointer hover:scale-105 transition-transform group"
                            >
                                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl mb-3 group-hover:shadow-lg transition-all`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <span className="text-2xl font-black text-slate-800 dark:text-white leading-none mb-1">{stat.value}</span>
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hero;
