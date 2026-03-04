import React, { useState } from 'react';
import DynamicFormFieldsManager from '../../Components/admin/DynamicFormFieldsManager';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('forms');

    return (
        <div style={{ padding: '20px', backgroundColor: '#F9FAFB', minHeight: '100%' }}>
            <h2 style={{ marginBottom: '20px' }}>Content & Global Settings Management</h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <button
                    onClick={() => setActiveTab('forms')}
                    style={{
                        padding: '8px 16px', border: 'none', backgroundColor: 'transparent',
                        fontWeight: activeTab === 'forms' ? 'bold' : 'normal',
                        borderBottom: activeTab === 'forms' ? '2px solid #0056b3' : 'none', cursor: 'pointer'
                    }}
                >
                    Dynamic Forms
                </button>
                <button
                    onClick={() => setActiveTab('general')}
                    style={{
                        padding: '8px 16px', border: 'none', backgroundColor: 'transparent',
                        fontWeight: activeTab === 'general' ? 'bold' : 'normal',
                        borderBottom: activeTab === 'general' ? '2px solid #0056b3' : 'none', cursor: 'pointer'
                    }}
                >
                    General Settings
                </button>
            </div>

            {activeTab === 'forms' && (
                <div>
                    <p style={{ color: '#555', marginBottom: '20px' }}>
                        Configure dynamic fields requested during the registration of different user roles.
                    </p>
                    <DynamicFormFieldsManager />
                </div>
            )}

            {activeTab === 'general' && (
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3>General Platform Settings</h3>
                    <p style={{ color: '#666' }}>Structure ready for API backend integration regarding site-wide content settings.</p>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
