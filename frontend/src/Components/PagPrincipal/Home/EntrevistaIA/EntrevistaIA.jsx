import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Mic, Sparkles, User, Award, CheckCircle2, ChevronLeft, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EntrevistaIA.css';

const MOCK_QUESTIONS = [
    "¡Hola! Soy tu asistente de entrevistas virtuales de GreenTalent. Para empezar, cuéntame un poco sobre ti y tu experiencia principal.",
    "Interesante. ¿Podrías darme un ejemplo de un desafío técnico complejo que hayas resuelto recientemente y cómo lo abordaste?",
    "Entiendo. ¿Cómo manejas las situaciones en las que tienes múltiples tareas con la misma prioridad y poco tiempo?",
    "Excelente. Finalmente, ¿por qué te gustaría unirte a una empresa de la zona franca y qué valor crees que aportarías en tus primeros meses?"
];

const MOCK_HINTS = [
    "Consejo: Empieza mencionando tu carrera o estudios actuales, las 2 o 3 habilidades principales que dominas, y qué tipo de desarrollo o área te apasiona más.",
    "Consejo: Aplica el método STAR. Nombra la Situación/Problema, cuál era tu Tarea, la Acción que tomaste (tu código/solución) y el Resultado positivo final.",
    "Consejo: Destaca tu capacidad de comunicación. Menciona que hablarías con tu líder/equipo para entender el impacto al negocio, y que usas herramientas para organizar prioridades.",
    "Consejo: Demuestra proactividad. Menciona que buscas crecimiento constante en un ecosistema tecnológico avanzado y que aportarás energía, ganas de aprender y adaptabilidad."
];

const EntrevistaIA = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [interviewFinished, setInterviewFinished] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);
    const messagesEndRef = useRef(null);
    const isInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // En React Strict Mode (desarrollo), useEffect se ejecuta dos veces.
        // Este ref previene que la intro se envíe por duplicado.
        if (!isInitialized.current) {
            simulateAITyping(MOCK_QUESTIONS[0]);
            isInitialized.current = true;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const simulateAITyping = (text) => {
        setIsTyping(true);
        // Simular tiempo de "pensamiento" basado en la longitud de la respuesta
        const typingTime = Math.min(1500 + text.length * 10, 3000);

        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'ai', text: text }]);
            setIsTyping(false);
            setHintUsed(false); // Resetear el uso de pista para la nueva pregunta
        }, typingTime);
    };

    const handleGetHint = () => {
        if (isTyping || hintUsed || currentQuestionIndex >= MOCK_QUESTIONS.length) return;
        setHintUsed(true);

        // Agregar el consejo sutilmente
        setMessages(prev => [...prev, {
            sender: 'ai',
            text: `💡 ${MOCK_HINTS[currentQuestionIndex]}`,
            isHint: true
        }]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        // Agregar mensaje del usuario
        const userMessage = inputValue;
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInputValue("");

        // Avanzar a la siguiente pregunta lógica
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);

        // Determinar siguiente paso
        if (nextIndex < MOCK_QUESTIONS.length) {
            simulateAITyping(MOCK_QUESTIONS[nextIndex]);
        } else {
            // Finalizar entrevista y dar feedback
            finishInterview();
        }
    };

    const finishInterview = () => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: "¡Excelente! Hemos concluido la simulación de la entrevista. Analizando tus respuestas, tienes una buena capacidad de resolución de problemas y comunicación estructurada. Te enviaré un reporte detallado a tu perfil. ¡Mucho éxito!",
                isFeedback: true
            }]);
            setIsTyping(false);
            setInterviewFinished(true);
        }, 2500);
    };

    return (
        <div className="entrevista-container min-h-screen bg-[var(--bg-main)] flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard-aspirante')}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center relative">
                                <Bot className="w-6 h-6 text-green-600 dark:text-green-400" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-slate-800 dark:text-white leading-tight">Interviewer IA</h1>
                                <p className="text-xs font-bold text-green-600 dark:text-green-500">En línea</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <Sparkles className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Simulación Smart</span>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 w-full">
                <div className="max-w-3xl mx-auto space-y-6 pb-20">

                    {/* Intro Card */}
                    <div className="text-center py-6 mb-8 text-slate-500 dark:text-slate-400">
                        <p className="text-xs font-black uppercase tracking-widest mb-1">Entrevista Técnica Virtual</p>
                        <p className="text-sm">Tus respuestas serán analizadas para darte feedback.</p>
                    </div>

                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                {/* Avatar */}
                                <div className="flex-shrink-0 mt-1">
                                    {msg.sender === 'ai' ? (
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center border border-green-200 dark:border-green-800">
                                            <Bot className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-300 dark:border-slate-700">
                                            <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isFeedback
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 text-slate-800 dark:text-slate-200'
                                        : msg.isHint
                                            ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 rounded-tl-sm'
                                            : msg.sender === 'user'
                                                ? 'bg-[#1a8641] dark:bg-green-600 text-white rounded-tr-sm'
                                                : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                                        }`}
                                >
                                    {msg.isFeedback && (
                                        <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-400 font-bold border-b border-green-200 dark:border-green-800/50 pb-2">
                                            <Award className="w-5 h-5" /> Reporte de Resultados
                                        </div>
                                    )}
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex w-full justify-start">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center border border-green-200 dark:border-green-800 mt-1 flex-shrink-0">
                                    <Bot className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 sticky bottom-0 z-10 w-full">
                <div className="max-w-3xl mx-auto flex flex-col items-center">

                    {/* Botón de pedir consejo */}
                    {!interviewFinished && !isTyping && !hintUsed && currentQuestionIndex < MOCK_QUESTIONS.length && (
                        <button
                            onClick={handleGetHint}
                            className="mb-3 flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 rounded-full text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-sm"
                        >
                            <Lightbulb className="w-3.5 h-3.5" /> ¿No sabes qué responder? Pide un consejo
                        </button>
                    )}

                    {interviewFinished ? (
                        <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 text-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white">Entrevista Finalizada</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Puedes volver a tu panel para ver más opciones.</p>
                            </div>
                            <button
                                onClick={() => navigate('/dashboard-aspirante')}
                                className="mt-2 px-6 py-2 bg-[#1a8641] dark:bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-sm"
                            >
                                Volver al Dashboard
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSendMessage} className="w-full relative flex items-center bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-green-500 dark:focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all p-1">
                            <button
                                type="button"
                                className="p-3 text-slate-400 hover:text-green-600 transition-colors shrink-0"
                                title="Responder con voz (Próximamente)"
                            >
                                <Mic className="w-5 h-5" />
                            </button>

                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe tu respuesta aquí..."
                                disabled={isTyping}
                                className="flex-1 bg-transparent border-none outline-none px-2 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 text-sm py-3 disabled:opacity-50"
                            />

                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className={`p-3 rounded-xl flex items-center justify-center transition-all shrink-0 ml-1 ${inputValue.trim() && !isTyping
                                    ? 'bg-[#1a8641] dark:bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default EntrevistaIA;
