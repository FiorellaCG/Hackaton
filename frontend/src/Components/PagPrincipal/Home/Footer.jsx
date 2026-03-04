import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoImg from "../../../assents/Logo.png";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 transition-colors">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand Section */}
                <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-6">
                    <div className="flex items-center gap-5 group">
                        <div className="relative group-hover:scale-110 transition-all duration-500 bg-[#1a8641] p-4 rounded-2xl shadow-2xl shadow-green-900/40">
                            <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain brightness-110 contrast-125" />
                            <div className="absolute -inset-2 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white leading-none tracking-tighter uppercase m-0">{t('brand.name')}</h2>
                            <span className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1.5 block">{t('brand.location')}</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2 max-w-xs leading-relaxed font-medium">
                        {t('footer.description')}
                    </p>
                    <div className="flex gap-4">
                        <Facebook className="w-5 h-5 text-slate-500 hover:text-green-500 cursor-pointer transition-colors" />
                        <Twitter className="w-5 h-5 text-slate-500 hover:text-green-500 cursor-pointer transition-colors" />
                        <Instagram className="w-5 h-5 text-slate-500 hover:text-green-500 cursor-pointer transition-colors" />
                        <Linkedin className="w-5 h-5 text-slate-500 hover:text-green-500 cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-black mb-6 text-sm uppercase tracking-widest">{t('footer.candidates')}</h3>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.search_jobs')}</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.internships')}</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.create_profile')}</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.cv_tips')}</a></li>
                    </ul>
                </div>

                {/* For Companies */}
                <div>
                    <h3 className="text-white font-black mb-6 text-sm uppercase tracking-widest">{t('footer.companies')}</h3>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.post_job')}</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.find_candidates')}</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.plans_pricing')}</a></li>
                        <li><a href="#" className="text-slate-500 hover:text-green-500 transition-colors">{t('footer.about_us')}</a></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="text-white font-black mb-6 text-sm uppercase tracking-widest">{t('footer.contact')}</h3>
                    <ul className="space-y-5 text-sm font-medium">
                        <li className="flex items-start gap-4">
                            <div className="p-2 bg-slate-800 rounded-lg">
                                <MapPin className="w-4 h-4 text-green-500" />
                            </div>
                            <span className="text-slate-400">{t('brand.location')}, Cartago, Costa Rica</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="p-2 bg-slate-800 rounded-lg">
                                <Phone className="w-4 h-4 text-green-500" />
                            </div>
                            <span className="text-slate-400">+506 2200-0000</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="p-2 bg-slate-800 rounded-lg">
                                <Mail className="w-4 h-4 text-green-500" />
                            </div>
                            <span className="text-slate-400">info@greentalent.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                    © {new Date().getFullYear()} GreenTalent. {t('footer.rights')}
                </p>

                <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-slate-600 hover:text-slate-400 cursor-pointer transition-colors uppercase tracking-tight">{t('footer.privacy')}</span>
                    <span className="text-xs font-bold text-slate-600 hover:text-slate-400 cursor-pointer transition-colors uppercase tracking-tight">{t('footer.terms')}</span>
                    <span className="text-xs font-bold text-slate-600 hover:text-slate-400 cursor-pointer transition-colors uppercase tracking-tight">{t('footer.cookies')}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
