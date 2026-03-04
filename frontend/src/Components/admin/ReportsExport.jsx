import React from 'react';
import { useTranslation } from "react-i18next";
import { Download, FileDown } from "lucide-react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportsExport = ({ stats }) => {
    const { t } = useTranslation();

    const exportPDF = () => {
        if (!stats) return;

        const doc = new jsPDF();
        const timestamp = new Date().toLocaleDateString();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(22, 101, 52); // Tailwind green-800
        doc.text("GreenTalent - Reporte Administrativo", 20, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Fecha de generación: ${timestamp}`, 20, 30);

        // General Stats Table
        doc.autoTable({
            startY: 40,
            head: [['Indicador', 'Valor']],
            body: [
                ['Total Estudiantes', stats.total_estudiantes],
                ['Total Empresas', stats.total_empresas],
                ['Total Vacantes', stats.total_vacantes],
                ['Total Postulaciones', stats.total_postulaciones],
                ['Tasa de Colocación', `${stats.tasa_colocacion}%`],
            ],
            theme: 'striped',
            headStyles: { fillColor: [22, 101, 52] }
        });

        // Distribution Table
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Distribución de Roles', 'Cantidad']],
            body: stats.distribucion_roles.map(r => [r.name, r.value]),
            theme: 'grid',
            headStyles: { fillColor: [22, 101, 52] }
        });

        // Areas Table
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Área de Trabajo', 'Vacantes']],
            body: stats.vacantes_por_area.map(a => [a.area_trabajo__nombre, a.count]),
            theme: 'striped',
            headStyles: { fillColor: [22, 101, 52] }
        });

        doc.save(`Reporte_GreenTalent_${timestamp}.pdf`);
    };

    const exportExcel = () => {
        if (!stats) return;

        const wb = XLSX.utils.book_new();

        // Main sheet
        const summaryData = [
            ["Reporte General GreenTalent", new Date().toLocaleDateString()],
            [""],
            ["Indicador", "Valor"],
            ["Total Estudiantes", stats.total_estudiantes],
            ["Total Empresas", stats.total_empresas],
            ["Total Vacantes", stats.total_vacantes],
            ["Total Postulaciones", stats.total_postulaciones],
            ["Tasa de Colocación", `${stats.tasa_colocacion}%`]
        ];
        const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen");

        // Trends sheet
        const wsTrends = XLSX.utils.json_to_sheet(stats.tendencia_registros);
        XLSX.utils.book_append_sheet(wb, wsTrends, "Tendencias");

        // Areas sheet
        const wsAreas = XLSX.utils.json_to_sheet(stats.vacantes_por_area);
        XLSX.utils.book_append_sheet(wb, wsAreas, "Vacantes por Área");

        XLSX.writeFile(wb, `Reporte_GreenTalent_${new Date().getTime()}.xlsx`);
    };

    return (
        <div className="flex gap-3">
            <button
                onClick={exportExcel}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10 active:scale-95"
            >
                <Download size={16} />
                {t('admin.export_excel')}
            </button>
            <button
                onClick={exportPDF}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/10 active:scale-95"
            >
                <FileDown size={16} />
                {t('admin.export_pdf')}
            </button>
        </div>
    );
};

export default ReportsExport;
