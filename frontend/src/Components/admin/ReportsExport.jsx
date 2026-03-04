import React from 'react';

const ReportsExport = () => {
    const exportPDF = () => {
        console.log("Exporting to PDF... Integration required.");
    };

    const exportExcel = () => {
        console.log("Exporting to Excel (CSV)... Integration required.");
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <button
                onClick={exportExcel}
                style={{
                    padding: '8px 15px', backgroundColor: '#28a745', color: '#fff',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                }}
            >
                📥 Export Excel
            </button>
            <button
                onClick={exportPDF}
                style={{
                    padding: '8px 15px', backgroundColor: '#dc3545', color: '#fff',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                }}
            >
                📄 Export PDF
            </button>
        </div>
    );
};

export default ReportsExport;
