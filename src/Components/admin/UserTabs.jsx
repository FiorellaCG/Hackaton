import React from 'react';

const UserTabs = ({ activeTab, onTabSelect }) => {
    const tabs = ['All Users', 'Companies', 'Institutions', 'Students'];

    return (
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '15px' }}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabSelect(tab)}
                    style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderBottom: activeTab === tab ? '2px solid #0056b3' : 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontWeight: activeTab === tab ? 'bold' : 'normal',
                        color: activeTab === tab ? '#0056b3' : '#555',
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default UserTabs;
