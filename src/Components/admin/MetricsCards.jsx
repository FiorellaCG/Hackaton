import React from 'react';

const MetricsCards = () => {
    const metrics = [
        { id: 1, title: 'Total Registered Students', value: '0', color: '#0056b3' },
        { id: 2, title: 'Active Companies', value: '0', color: '#28a745' },
        { id: 3, title: 'Pending Vacancies', value: '0', color: '#ffc107', textColor: '#333' },
        { id: 4, title: 'System Alerts / Errors', value: '0', color: '#dc3545' }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {metrics.map(metric => (
                <div key={metric.id} style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    borderTop: `4px solid ${metric.color}`
                }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{metric.title}</h4>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: metric.textColor || metric.color }}>
                        {metric.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MetricsCards;
