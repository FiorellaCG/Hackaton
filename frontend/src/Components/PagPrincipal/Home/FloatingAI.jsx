import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Zap, Target, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FloatingAI = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: '¡Hola! Soy GreenBot, tu asistente de carrera en la Zona Franca La Lima. ¿Cómo puedo ayudarte hoy?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (textOveride) => {
        const messageText = textOveride || inputValue;
        if (!messageText.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: messageText };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let aiResponse = { id: Date.now() + 1, type: 'ai', text: '', options: [] };
            const input = messageText.toLowerCase();

            if (input.includes('empleo') || input.includes('trabajo') || input.includes('vacante')) {
                aiResponse.text = "He encontrado varias posiciones destacadas en Desarrollo de Software e Ingeniería que encajan con el perfil tecnológico de la zona. ¿Te gustaría ver las más recientes?";
                aiResponse.options = ['Sí', 'No'];
            } else if (input.includes('pasantía') || input.includes('practicante')) {
                aiResponse.text = "Tenemos programas de pasantías activos en Intel y Teradyne para este semestre. ¿Deseas que filtre por área de estudio?";
                aiResponse.options = ['Sí', 'No'];
            } else if (input === 'sí' || input === 'si') {
                aiResponse.text = "¡Excelente! Estoy preparando el listado filtrado para ti. También te recomiendo completar tu perfil para usar el SmartMatch. ¿Quieres ir a tu perfil ahora?";
                aiResponse.options = ['Sí', 'No'];
            } else if (input === 'no') {
                aiResponse.text = "Entendido. ¿Hay alguna otra área o empresa específica de La Lima que te interese explorar?";
            } else if (input.includes('hola') || input.includes('saludos')) {
                aiResponse.text = "¡Hola! Estoy listo para ayudarte a encontrar tu lugar en el ecosistema de innovación de Cartago. ¿Buscas empleo o pasantía?";
                aiResponse.options = ['Empleo', 'Pasantía'];
            } else {
                aiResponse.text = "Puedo optimizar tu búsqueda utilizando SmartMatch basado en tus habilidades. ¿Te gustaría que analicemos tu perfil actual?";
                aiResponse.options = ['Sí', 'No'];
            }

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[1000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-6 w-[380px] h-[550px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-800/50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-br from-[#1a8641] to-green-700 text-white relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Bot size={80} />
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                    <Sparkles className="text-white animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-widest leading-none m-0">GreenBot IA</h3>
                                    <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1 block">Asistente de Carreras</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, x: msg.type === 'ai' ? -10 : 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${msg.type === 'ai'
                                            ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none'
                                            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-tr-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>

                                    {msg.type === 'ai' && msg.options && msg.options.length > 0 && (
                                        <div className="flex flex-wrap gap-2 ml-2">
                                            {msg.options.map((option) => (
                                                <motion.button
                                                    key={option}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    onClick={() => handleSend(option)}
                                                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest text-[#1a8641] hover:bg-green-50 dark:hover:bg-green-900/20 transition-all shadow-sm"
                                                >
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl rounded-tl-none border border-slate-100 dark:border-slate-800">
                                        <div className="flex gap-1.5 items-center h-4">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-0"></span>
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></span>
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {!isTyping && messages[messages.length - 1]?.type !== 'ai' && (
                            <div className="px-6 pb-2 flex flex-wrap gap-2">
                                {['Buscar Empleo', 'Pasantías', '¿Cómo funciona?'].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => { handleSend(suggestion) }}
                                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700 hover:border-green-500 hover:text-green-600 transition-all"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-6 pt-2">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Pregúntale a la IA..."
                                    className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:border-green-500 dark:focus:border-green-600 text-slate-800 dark:text-white font-medium transition-all"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a8641] text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bubble Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen
                    ? 'bg-slate-900 text-white rotate-90'
                    : 'bg-[#1a8641] text-white'
                    }`}
            >
                {isOpen ? <X size={32} /> : (
                    <div className="relative">
                        <Bot size={32} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default FloatingAI;
