import React from 'react';
import { useTranslation } from "react-i18next";
import { Download, FileDown } from "lucide-react";

const ReportsExport = () => {
    const { t } = useTranslation();

    const exportPDF = () => {
        console.log("Exporting to PDF... Integration required.");
    };

    const exportExcel = () => {
        console.log("Exporting to Excel (CSV)... Integration required.");
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
