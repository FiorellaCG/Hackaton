import { MapPin, Briefcase, GraduationCap, Clock } from "lucide-react";

const FeaturedJobs = () => {
    const jobs = [
        {
            id: 1,
            title: "Fullstack Developer",
            company: "TechNova",
            location: "San José, Costa Rica",
            type: "Tiempo Completo",
            level: "Intermedio",
            salary: "$1,500 - $2,500",
            logo: "https://picsum.photos/seed/technova/100/100",
            tags: ["React", "Node.js", "SQL"]
        },
        {
            id: 2,
            title: "UX/UI Designer",
            company: "CreativeFlow",
            location: "Heredia, Costa Rica",
            type: "Remoto",
            level: "Senior",
            salary: "$2,000 - $3,500",
            logo: "https://picsum.photos/seed/creative/100/100",
            tags: ["Figma", "Design System", "UX Research"]
        },
        {
            id: 3,
            title: "Marketing Specialist",
            company: "GlobalMarket",
            location: "Alajuela, Costa Rica",
            type: "Híbrido",
            level: "Junior",
            salary: "$1,000 - $1,500",
            logo: "https://picsum.photos/seed/market/100/100",
            tags: ["SEO", "Content Marketing", "Analytics"]
        }
    ];

    return (
        <section className="w-full py-16 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Empleos Destacados</h2>
                        <p className="text-slate-500">Descubre las oportunidades más recientes y de mayor demanda.</p>
                    </div>
                    <button className="hidden sm:block px-6 py-2 text-[#1a8641] font-semibold border border-[#1a8641] rounded-full hover:bg-green-50 transition-colors">
                        Ver todas las ofertas
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
                            <div>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{job.title}</h3>
                                        <p className="text-sm font-medium text-slate-500">{job.company}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mb-4">
                                    <div className="flex items-center text-sm text-slate-500">
                                        <MapPin className="w-4 h-4 mr-2" /> {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Briefcase className="w-4 h-4 mr-2" /> {job.type}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <GraduationCap className="w-4 h-4 mr-2" /> {job.level}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {job.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="font-bold text-slate-800">{job.salary} <span className="text-xs text-slate-400 font-normal">/ mes</span></span>
                                <Clock className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <button className="w-full px-6 py-3 text-[#1a8641] font-semibold border border-[#1a8641] rounded-full hover:bg-green-50 transition-colors">
                        Ver todas las ofertas
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;
