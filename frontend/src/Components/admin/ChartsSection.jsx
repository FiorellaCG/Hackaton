import React from 'react';
import { useTranslation } from "react-i18next";
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import {
    ResponsiveContainer,
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell
} from 'recharts';

const COLORS = ['#163a6d', '#1988a6', '#b1b900', '#64748b', '#ef4444'];

const ChartsSection = ({ title, type, data, dataKeys = [], labelKey = "month" }) => {
    const { t } = useTranslation();

    const getIcon = () => {
        if (type === 'bar') return <BarChartIcon className="w-5 h-5 text-[#1988a6]" />;
        if (type === 'pie') return <PieChartIcon className="w-5 h-5 text-[#b1b900]" />;
        return <LineChartIcon className="w-5 h-5 text-[#163a6d]" />;
    };

    const formatName = (key) => {
        const translations = {
            'estudiantes': t('admin.students_tab'),
            'empresas': t('admin.companies_tab'),
            'count': t('admin.applicants_count')
        };
        return translations[key] || key.charAt(0).toUpperCase() + key.slice(1);
    };

    const renderChart = () => {
        if (!data || data.length === 0) {
            return (
                <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                    <span className="text-slate-400 dark:text-slate-500 font-bold italic text-sm mb-2 opacity-50 uppercase tracking-tighter">
                        No hay datos disponibles para mostrar
                    </span>
                </div>
            );
        }

        if (type === 'line') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey={labelKey} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        {dataKeys.map((key, index) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={COLORS[index % COLORS.length]}
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name={formatName(key)}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            );
        }

        if (type === 'bar') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey={labelKey} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        {dataKeys.map((key, index) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={COLORS[index % COLORS.length]}
                                radius={[4, 4, 0, 0]}
                                name={formatName(key)}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            );
        }

        if (type === 'pie') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data.map(item => ({ ...item, name: t(`admin.${item.name.toLowerCase()}_tab`) || item.name }))}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            );
        }
    };

    return (
        <div className="flex flex-col h-[350px]">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    {getIcon()}
                </div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{title}</h3>
            </div>

            <div className="flex-1">
                {renderChart()}
            </div>
        </div>
    );
};

export default ChartsSection;
