import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand Section */}
                <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#1a8641] text-white p-2 rounded-lg font-bold text-xl h-10 w-10 flex items-center justify-center">
                            GT
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-none">GreenTalent</h2>
                            <span className="text-xs text-slate-400">ZFL La Lima</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2 max-w-xs">
                        Conectamos el mejor talento con las empresas líderes en la Zona Franca La Lima, impulsando el crecimiento profesional.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Para Candidatos</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-green-500 transition-colors">Buscar Empleos</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Pasantías</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Crear Perfil</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Consejos de CV</a></li>
                    </ul>
                </div>

                {/* For Companies */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Para Empresas</h3>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-green-500 transition-colors">Publicar Empleo</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Buscar Candidatos</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Planes y Precios</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Sobre Nosotros</a></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Contacto</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>Zona Franca La Lima, Cartago, Costa Rica</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>+506 2200-0000</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>info@greentalent.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} GreenTalent. Todos los derechos reservados.
                </p>

                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                        <Linkedin className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
