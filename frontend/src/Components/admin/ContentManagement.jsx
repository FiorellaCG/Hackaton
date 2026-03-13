import React, { useState } from 'react';
import DynamicFormFieldsManager from './DynamicFormFieldsManager';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('forms');

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Administración de Contenido y Ajustes Globales</h2>

            <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
                <button
                    onClick={() => setActiveTab('forms')}
                    className={`px-4 py-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'forms'
                            ? 'text-green-600 border-green-600'
                            : 'text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    Formularios Dinámicos
                </button>
                <button
                    onClick={() => setActiveTab('general')}
                    className={`px-4 py-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'general'
                            ? 'text-green-600 border-green-600'
                            : 'text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    Ajustes Generales
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                {activeTab === 'forms' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
                            Configura los campos dinámicos que se solicitan durante el registro de los diferentes roles de usuario.
                        </p>
                        <DynamicFormFieldsManager />
                    </div>
                )}

                {activeTab === 'general' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Ajustes Generales de la Plataforma</h3>
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Esta sección está preparada para la integración con la API de ajustes globales del sitio.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
