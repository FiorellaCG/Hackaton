import React from 'react';
import { BarChart, PieChart, LineChart } from "lucide-react";

const ChartsSection = ({ title, type }) => {
    const getIcon = () => {
        if (type === 'bar') return <BarChart className="w-5 h-5 text-indigo-500" />;
        if (type === 'pie') return <PieChart className="w-5 h-5 text-emerald-500" />;
        return <LineChart className="w-5 h-5 text-rose-500" />;
    };

    return (
        <div className="flex flex-col h-[300px]">
            <div className="flex items-center gap-2 mb-4">
                {getIcon()}
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{title}</h3>
            </div>

            {/* Placeholder for real charts */}
            <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                <span className="text-slate-400 dark:text-slate-500 font-bold italic text-sm mb-2 opacity-50 uppercase tracking-tighter">
                    {type} chart visualization
                </span>
                <p className="text-[10px] text-slate-300 dark:text-slate-600 font-black uppercase">GreenTalent Analytics Engine</p>
            </div>
        </div>
    );
};

export default ChartsSection;
