import { useTranslation } from "react-i18next";

const UserTabs = ({ activeTab, onTabSelect }) => {
    const { t } = useTranslation();
    const tabs = [
        { id: 'All Users', label: t('admin.all_users') },
        { id: 'Companies', label: t('admin.companies_tab') },
        { id: 'Institutions', label: t('admin.institutions_tab') },
        { id: 'Students', label: t('admin.students_tab') }
    ];

    return (
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '15px' }}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabSelect(tab.id)}
                    style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderBottom: activeTab === tab.id ? '2px solid #0056b3' : 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                        color: activeTab === tab.id ? '#0056b3' : '#555',
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default UserTabs;
