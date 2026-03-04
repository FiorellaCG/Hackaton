import React, { useState } from "react";
import { MapPin, Briefcase, GraduationCap, Clock, CheckCircle2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoginModal } from "../Login/Login";

const FeaturedJobs = ({ jobs = [] }) => {
    const { t } = useTranslation();
    const [loginOpen, setLoginOpen] = useState(false);
    const [applicationOpen, setApplicationOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleApplyClick = (job) => {
        const user = localStorage.getItem("usuario");
        if (!user) {
            setLoginOpen(true);
        } else {
            setSelectedJob(job);
            setApplicationOpen(true);
        }
    };

    const handleConfirmApply = () => {
        try {
            const user = JSON.parse(localStorage.getItem("usuario") || "{}");
            const postulaciones = JSON.parse(localStorage.getItem('postulaciones_empresa') || '[]');

            const nuevaPostulacion = {
                id: Date.now(),
                jobId: selectedJob.id,
                jobTitle: selectedJob.title,
                candidatoName: user.nombre ? `${user.nombre} ${user.apellidos || ''}` : user.correo,
                match: Math.floor(Math.random() * 30) + 70, // Random match 70-99
                status: 'Pendiente'
            };

            localStorage.setItem('postulaciones_empresa', JSON.stringify([...postulaciones, nuevaPostulacion]));
        } catch (e) {
            console.error("Error saving postulation", e);
        }
        setSuccessMessage(true);
    };

    return (
        <section id="jobs-section" className="w-full py-16 px-4 bg-[var(--bg-main)] transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{t('featured_jobs.title')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">{t('featured_jobs.subtitle')}</p>
                    </div>
                    <button className="hidden sm:block px-6 py-2.5 text-[#1a8641] dark:text-green-500 font-bold border-2 border-[#1a8641] dark:border-green-600 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all active:scale-95">
                        {t('featured_jobs.view_all')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-[var(--bg-card)] rounded-3xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-xl hover:border-green-100 dark:hover:border-green-900/40 transition-all cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 shadow-sm relative group-hover:scale-105 transition-transform">
                                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${job.type === 'Pasantía'
                                                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                                : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                                                }`}>
                                                {job.type}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors uppercase tracking-tight">{job.title}</h3>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{job.company}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                                        <div className="p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg mr-3">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                        </div>
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                                        <div className="p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg mr-3">
                                            <Briefcase className="w-4 h-4 text-slate-400" />
                                        </div>
                                        {job.schedule || job.type}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                                        <div className="p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg mr-3">
                                            <GraduationCap className="w-4 h-4 text-slate-400" />
                                        </div>
                                        {job.level}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {job.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-green-100 dark:border-green-900/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-5 border-t border-slate-100 dark:border-slate-700 flex gap-3 mt-auto">
                                <button onClick={() => handleApply(job)} className="flex-1 py-2.5 bg-[#163a6d] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md">
                                    Aplicar
                                </button>
                                <button className="px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#b1b900] hover:border-[#b1b900] rounded-xl transition-all flex items-center justify-center">
                                    <Clock className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center sm:hidden">
                    <button className="w-full px-6 py-4 bg-[#1a8641] text-white font-bold rounded-2xl shadow-lg transition-colors">
                        {t('featured_jobs.view_all')}
                    </button>
                </div>
            </div>

            {applicationOpen && selectedJob && (
                <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">
                    {successMessage ? (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-sm w-full text-center relative shadow-2xl">
                            <button onClick={() => { setApplicationOpen(false); setSuccessMessage(false); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                            <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">¡Inscrito correctamente!</h3>
                            <p className="text-slate-500 font-medium text-sm">Te has postulado a {selectedJob.title}. El estado de tu solicitud ha sido enviado a la empresa.</p>
                            <button onClick={() => { setApplicationOpen(false); setSuccessMessage(false); }} className="mt-6 w-full py-3 bg-[#163a6d] hover:bg-slate-800 text-white font-bold rounded-xl transition-all">Continuar</button>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-md w-full relative shadow-2xl">
                            <button onClick={() => setApplicationOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Aplicar a Vacante</h3>
                            <p className="text-slate-500 mb-6 font-medium text-sm">Vacante: <span className="font-bold text-[#163a6d] dark:text-[#b1b900]">{selectedJob.title}</span> en {selectedJob.company}</p>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Tu perfil principal:</label>
                                    <input type="text" readOnly value="Aspirante Registrado" className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-3 text-slate-500" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setApplicationOpen(false)} className="flex-1 py-3 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl transition-colors">Cancelar</button>
                                <button onClick={handleConfirmApply} className="flex-1 py-3 bg-[#163a6d] hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-colors">Inscribirse</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {loginOpen && (
                <LoginModal
                    isOpen={loginOpen}
                    onClose={() => setLoginOpen(false)}
                    onLoginSuccess={(userData) => { setLoginOpen(false); }}
                />
            )}
        </section>
    );
};

export default FeaturedJobs;
