import React from 'react';
import { useTranslation } from "react-i18next";
import { Download, FileDown } from "lucide-react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useModal } from '../../ModalContext';

const ReportsExport = ({ stats }) => {
    const { t } = useTranslation();
    const { showError } = useModal();

    const exportPDF = () => {
        if (!stats) return;

        try {
            const doc = new jsPDF();
            const timestamp = new Date().toLocaleDateString();

            // Header con estilo premium
            doc.setFontSize(24);
            doc.setTextColor(22, 101, 52); // Tailwind green-800
            doc.text("GreenTalent", 20, 25);
            
            doc.setFontSize(14);
            doc.setTextColor(51, 65, 85); // Slate-700
            doc.text("Reporte Ejecutivo de Gestión", 20, 35);

            doc.setFontSize(9);
            doc.setTextColor(100);
            doc.text(`Generado por: Administrador GreenTalent`, 20, 42);
            doc.text(`Fecha: ${timestamp}`, 20, 47);

            // General Stats Table
            const summaryBody = [
                ['Población de Aspirantes', stats.total_estudiantes || 0],
                ['Empresas en Plataforma', stats.total_empresas || 0],
                ['Oportunidades Abiertas', stats.total_vacantes || 0],
                ['Total Postulaciones', stats.total_postulaciones || 0],
                ['Índice de Colocación', `${stats.tasa_colocacion || 0}%`],
            ];

            autoTable(doc, {
                startY: 55,
                head: [['Indicador de Rendimiento', 'Métrica']],
                body: summaryBody,
                theme: 'striped',
                headStyles: { fillColor: [22, 101, 52], fontSize: 11, fontStyle: 'bold' },
                bodyStyles: { fontSize: 10 },
                alternateRowStyles: { fillColor: [240, 253, 244] }
            });

            // Role Distribution
            if (stats.distribucion_roles && stats.distribucion_roles.length > 0) {
                autoTable(doc, {
                    startY: doc.lastAutoTable.finalY + 15,
                    head: [['Segmentación de Usuarios', 'Volumen']],
                    body: stats.distribucion_roles.map(r => [r.name || 'N/A', r.value || 0]),
                    theme: 'grid',
                    headStyles: { fillColor: [51, 65, 85], fontSize: 11 },
                    bodyStyles: { fontSize: 10 }
                });
            }

            // Vacancies by Area
            if (stats.vacantes_por_area && stats.vacantes_por_area.length > 0) {
                autoTable(doc, {
                    startY: doc.lastAutoTable.finalY + 15,
                    head: [['Área Profesional', 'Vacantes Activas']],
                    body: stats.vacantes_por_area.map(a => [a.area_trabajo__nombre || 'Otros', a.count || 0]),
                    theme: 'striped',
                    headStyles: { fillColor: [16, 185, 129], fontSize: 11 },
                    bodyStyles: { fontSize: 10 }
                });
            }

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(`Página ${i} de ${pageCount} - GreenTalent Confidential`, 20, doc.internal.pageSize.height - 10);
            }

            doc.save(`GT_Reporte_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
            showError("Hubo un error al generar el PDF. Por favor, intente de nuevo.");
        }
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
