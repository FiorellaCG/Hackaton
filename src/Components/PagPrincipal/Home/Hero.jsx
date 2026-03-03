import { Search, MapPin, Sparkles, Briefcase } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white flex flex-col items-center justify-center overflow-hidden">
            {/* Background dotted pattern */}
            <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                {/* Title & Subtitle */}
                <div className="text-center mb-10 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4">
                        Conecta tu talento con las <br className="hidden sm:block" />
                        <span className="text-[#1a8641]">mejores oportunidades</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-500 font-medium">
                        La plataforma de empleo inteligente de la Zona Franca La Lima
                    </p>
                </div>

                {/* Search Bar - Main Container */}
                <div className="w-full max-w-4xl bg-white rounded-full shadow-lg border border-slate-100 p-2 flex flex-col sm:flex-row items-center gap-2 mb-8">
                    {/* Keyword Input */}
                    <div className="flex-1 flex items-center px-4 w-full h-12 bg-slate-50 rounded-full sm:rounded-l-full sm:rounded-r-none border-none">
                        <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Título del puesto, empresa, o palabra clave..."
                            className="bg-transparent border-none outline-none w-full text-slate-600 placeholder-slate-400 font-medium text-sm"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex-1 flex items-center px-4 w-full h-12 bg-slate-50 rounded-full sm:rounded-none border-none sm:border-l sm:border-slate-200">
                        <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="La Lima, Costa Rica"
                            defaultValue="La Lima, Costa Rica"
                            className="bg-transparent border-none outline-none w-full text-slate-600 placeholder-slate-400 font-medium text-sm"
                        />
                    </div>

                    {/* Search Button */}
                    <button className="w-full sm:w-auto px-6 h-12 bg-[#1a8641] hover:bg-green-700 transition-colors rounded-full text-white font-semibold flex justify-center items-center gap-2 flex-shrink-0 shadow-md">
                        <Sparkles className="w-5 h-5" />
                        <span>Buscar con IA</span>
                    </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <span className="px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 flex items-center gap-2 hover:border-green-600 hover:text-green-700 cursor-pointer shadow-sm transition-all duration-300">
                        <Briefcase className="w-4 h-4" /> Tiempo Completo
                    </span>
                    <span className="px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:border-green-600 hover:text-green-700 cursor-pointer shadow-sm transition-all duration-300">
                        Remoto
                    </span>
                    <span className="px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:border-green-600 hover:text-green-700 cursor-pointer shadow-sm transition-all duration-300">
                        Pasantías
                    </span>
                    <span className="px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:border-green-600 hover:text-green-700 cursor-pointer shadow-sm transition-all duration-300">
                        Entrada
                    </span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center sm:justify-between w-full max-w-3xl gap-8 px-4">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-[#1a8641] mb-1">2,500+</span>
                        <span className="text-sm font-medium text-slate-500">Ofertas Activas</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-[#1a8641] mb-1">150+</span>
                        <span className="text-sm font-medium text-slate-500">Empresas</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-[#1a8641] mb-1">10,000+</span>
                        <span className="text-sm font-medium text-slate-500">Candidatos</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-[#1a8641] mb-1">95%</span>
                        <span className="text-sm font-medium text-slate-500">Tasa de Éxito</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
