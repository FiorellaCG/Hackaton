import { MapPin, Briefcase, GraduationCap, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeaturedJobs = ({ jobs = [] }) => {
    const { t } = useTranslation();

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

                            <div className="pt-5 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{t('featured_jobs.budget')}</span>
                                    <span className="font-black text-slate-800 dark:text-slate-200">{job.salary} <span className="text-[10px] text-slate-400 font-bold">{t('featured_jobs.salary_per_month')}</span></span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                                    <Clock className="w-5 h-5" />
                                </div>
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
        </section>
    );
};

export default FeaturedJobs;
