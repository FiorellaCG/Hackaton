import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Sparkles, FileText, Download, CheckCircle,
    Loader2, Wand2, Briefcase, GraduationCap, MapPin, Phone
} from "lucide-react";

const CVIAModal = ({ isOpen, onClose, perfil }) => {
    const [step, setStep] = useState(1); // 1: Analysis, 2: Template, 3: Generation, 4: Preview
    const [progress, setProgress] = useState(0);
    const [currentAnalisis, setCurrentAnalisis] = useState("Escaneando perfil...");

    const frasesAnalisis = [
        "Analizando formación académica...",
        "Extrayendo experiencias clave...",
        "Optimizando palabras clave para ATS...",
        "Estructurando secciones profesionales...",
        "Finalizando diseño con IA..."
    ];

    useEffect(() => {
        if (step === 1 && isOpen) {
            let interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStep(2), 500);
                        return 100;
                    }
                    const next = prev + 1;
                    if (next % 20 === 0) {
                        setCurrentAnalisis(frasesAnalisis[Math.floor(next / 20) - 1] || "Finalizando...");
                    }
                    return next;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [step, isOpen]);

    const handleGenerate = () => {
        setStep(3);
        setTimeout(() => setStep(4), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-xl text-green-600">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Generador de CV con IA</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">

                    {/* STEP 1: Análisis */}
                    {step === 1 && (
                        <div className="flex flex-col items-center justify-center py-10 space-y-6">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div
                                    className="absolute inset-0 border-4 border-green-500 rounded-full transition-all duration-300"
                                    style={{
                                        clipPath: `inset(0 0 0 0)`,
                                        maskImage: `conic-gradient(black ${progress}%, transparent 0)`
                                    }}
                                ></div>
                                <Wand2 className="w-10 h-10 text-green-600 animate-pulse" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-800 mb-1">{currentAnalisis}</h3>
                                <p className="text-sm text-slate-500">Estamos utilizando IA para estructurar tu mejor perfil</p>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Seleccion plantilla */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="text-center max-w-md mx-auto">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Perfil Analizado!</h3>
                                <p className="text-slate-500">La IA ha identificado tus fortalezas. Selecciona un estilo para tu currículum.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { id: 'modern', name: 'Moderno', desc: 'Minimalista y limpio', color: 'bg-blue-500' },
                                    { id: 'prof', name: 'Ejecutivo', desc: 'Serio y profesional', color: 'bg-slate-800' },
                                    { id: 'creative', name: 'Creativo', desc: 'Dinámico y visual', color: 'bg-green-500' }
                                ].map((tpl) => (
                                    <button
                                        key={tpl.id}
                                        onClick={handleGenerate}
                                        className="p-6 border border-slate-200 rounded-3xl hover:border-green-500 hover:ring-4 hover:ring-green-50 transition-all text-left group"
                                    >
                                        <div className={`w-12 h-16 ${tpl.color} rounded-lg mb-4 opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                                        <h4 className="font-bold text-slate-800 mb-1">{tpl.name}</h4>
                                        <p className="text-xs text-slate-500">{tpl.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Generando */}
                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
                            <h3 className="text-xl font-bold text-slate-800">Generando documento final...</h3>
                        </div>
                    )}

                    {/* STEP 4: Preview */}
                    {step === 4 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start">

                            {/* Fake Document Preview */}
                            <div className="bg-slate-100 rounded-2xl p-4 shadow-inner">
                                <div className="bg-white aspect-[1/1.41] shadow-2xl rounded p-8 flex flex-col space-y-4 text-[8px]">
                                    <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                                        <div>
                                            <h1 className="text-xs font-bold text-slate-900 uppercase">{perfil.nombre} {perfil.apellidos}</h1>
                                            <p className="text-green-600 font-bold mb-1">Software Professional</p>
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <span className="flex items-center gap-1"><MapPin size={6} /> {perfil.canton}</span>
                                                <span className="flex items-center gap-1"><Phone size={6} /> {perfil.telefono}</span>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 bg-slate-100 rounded"></div>
                                    </div>

                                    <div>
                                        <h2 className="text-[7px] font-bold text-slate-800 border-b-2 border-slate-100 pb-1 mb-2">PERFIL PROFESIONAL</h2>
                                        <p className="text-slate-600 italic leading-relaxed">
                                            {perfil.sobre_mi || "Profesional proactivo con alta capacidad de aprendizaje y enfoque en resultados..."}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h2 className="text-[7px] font-bold text-slate-800 border-b-2 border-slate-100 pb-1 mb-2">EDUCACIÓN</h2>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="font-bold">{perfil.nivel_educativo}</p>
                                                    <p className="text-slate-400">Universidad Federada de C.R.</p>
                                                </div>
                                                <div>
                                                    <p className="font-bold">Técnico en Programación</p>
                                                    <p className="text-slate-400">Instituto Tecnológico</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-[7px] font-bold text-slate-800 border-b-2 border-slate-100 pb-1 mb-2">HABILIDADES</h2>
                                            <div className="flex flex-wrap gap-1">
                                                {['React', 'Node.js', 'SQL', 'IA', 'Leadership', 'Cloud'].map(h => (
                                                    <span key={h} className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-600">{h}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-50 text-center">
                                        <p className="text-[6px] text-slate-300 italic">Generado inteligentemente por GreenTalent AI Engine</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Box */}
                            <div className="space-y-6">
                                <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                                    <div className="flex items-center gap-2 text-green-700 mb-2">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-bold">¡CV Generado con éxito!</span>
                                    </div>
                                    <p className="text-sm text-green-600">Hemos optimizado tu perfil para que sea un 85% más visible ante reclutadores de zona franca.</p>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-[#1a8641] hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg flex items-center justify-center gap-3">
                                        <Download className="w-5 h-5" /> Descargar PDF Terminado
                                    </button>
                                    <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-colors hover:bg-slate-50 flex items-center justify-center gap-3">
                                        <FileText className="w-5 h-5" /> Guardar en mi perfil
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </motion.div>
        </div>
    );
};

export default CVIAModal;
