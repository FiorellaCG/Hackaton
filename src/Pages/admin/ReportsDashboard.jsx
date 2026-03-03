import React from 'react';
import MetricsCards from '../../Components/admin/MetricsCards';
import ChartsSection from '../../Components/admin/ChartsSection';
import FiltersBar from '../../Components/admin/FiltersBar';
import ReportsExport from '../../Components/admin/ReportsExport';

const ReportsDashboard = () => {
    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>System Reports & Analytics Dashboard</h2>
                <ReportsExport />
            </div>

            <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <FiltersBar />
            </div>

            <MetricsCards />

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 60%', minWidth: '400px' }}>
                    <ChartsSection title="User Registration Trends" type="line" />
                </div>
                <div style={{ flex: '1 1 35%', minWidth: '300px' }}>
                    <ChartsSection title="Roles Distribution" type="pie" />
                </div>
            </div>

            <div>
                <ChartsSection title="Monthly Active Participants (Companies vs Students)" type="bar" />
            </div>

        </div>
    );
};

export default ReportsDashboard;
