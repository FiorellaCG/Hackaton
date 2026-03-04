import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Briefcase, BarChart3, User, Sparkles, MapPin, Zap, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import './EmpresaHome.css';

const EmpresaHome = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('todo');
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('usuario') || '{}');
        if (user.empresa) {
            setEmpresa(user.empresa);
        }
    }, []);

    const categories = [
        { id: 'aspirantes', label: 'Aspirantes Empleos', icon: Users, color: '#163a6d', path: '/empresa/dashboard/aspirantes' },
        { id: 'pasantias', label: 'Aspirantes Pasantías', icon: GraduationCap, color: '#1988a6', path: '/empresa/dashboard/aspirantes' },
        { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3, color: '#b1b900', path: '/empresa/dashboard/estadisticas' },
        { id: 'perfil', label: 'Mi Perfil', icon: User, color: '#64748b', path: '/empresa/dashboard/perfil' },
    ];

    const stats = [
        { label: 'Postulaciones Hoy', value: '+12', icon: Zap, color: '#b1b900' },
        { label: 'Vacantes Activas', value: '8', icon: Briefcase, color: '#163a6d' },
        { label: 'Talento Sugerido', value: '24', icon: Sparkles, color: '#1988a6' },
    ];

    return (
        <div className="empresa-home">
            {/* HERO SECTION */}
            <section className="empresa-hero">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-content"
                >
                    <div className="hero-badge">
                        <Sparkles size={14} />
                        <span>Panel de Reclutamiento Inteligente</span>
                    </div>
                    <h1>
                        Encuentra el <span className="highlight">Talento Ideal</span> <br />
                        para {empresa?.nombre || 'tu Empresa'}
                    </h1>
                    <p>
                        Utiliza nuestra tecnología de emparejamiento basada en IA para conectar con
                        aspirantes altamente calificados en la Zona Franca La Lima.
                    </p>

                    {/* SEARCH BAR */}
                    <div className="search-wrapper">
                        <div className="search-bar">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Busca por nombre, habilidad o cargo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="search-btn" onClick={() => navigate('/empresa/dashboard/aspirantes')}>
                                Buscar Talento
                            </button>
                        </div>
                        <div className="search-filters">
                            <button className="filter-btn">
                                <Filter size={16} /> Filtros Avanzados
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* STATS PREVIEW */}
                <div className="hero-stats">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="stat-mini-card"
                        >
                            <div className="stat-icon-circle" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                <stat.icon size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-v">{stat.value}</span>
                                <span className="stat-l">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CATEGORIES GRID (MAPA DE SECCIONES) */}
            <section className="categories-section">
                <div className="section-header">
                    <h2>Explorar Panel</h2>
                    <p>Accede rápidamente a todas las herramientas de gestión.</p>
                </div>

                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="category-card"
                            onClick={() => navigate(cat.path)}
                        >
                            <div className="cat-icon-wrapper" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                                <cat.icon size={32} />
                            </div>
                            <h3>{cat.label}</h3>
                            <p>Gestiona todos los procesos relacionados con {cat.label.toLowerCase()}.</p>
                            <div className="cat-arrow">→</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* RECENT ACTIVITY / SUGGESTED TALENT */}
            <section className="talent-preview">
                <div className="section-header">
                    <h2>Talento Recomendado</h2>
                    <Link to="/empresa/dashboard/aspirantes" className="view-all">Ver todos los aspirantes</Link>
                </div>

                <div className="talent-list">
                    {/* Simulated Talent Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="talent-card-mini">
                            <div className="talent-avatar">
                                <Users size={24} />
                            </div>
                            <div className="talent-details">
                                <h4>Aspirante #{i}204</h4>
                                <p>Ingeniería de Software • 95% Match</p>
                                <div className="talent-tags">
                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>AWS</span>
                                </div>
                            </div>
                            <button className="invite-btn">Ver Perfil</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EmpresaHome;
