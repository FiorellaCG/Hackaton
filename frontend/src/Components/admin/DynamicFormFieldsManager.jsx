import React, { useState } from 'react';

const DynamicFormFieldsManager = () => {
    const [fields, setFields] = useState([
        { id: 1, targetRole: 'Student', label: 'University Name', type: 'dropdown', isActive: true },
        { id: 2, targetRole: 'Company', label: 'Industry Sector', type: 'multiple', isActive: true },
        { id: 3, targetRole: 'Institution', label: 'Accreditation Code', type: 'open_text', isActive: false },
    ]);

    const [newField, setNewField] = useState({ targetRole: 'Student', label: '', type: 'open_text' });

    const handleAddField = (e) => {
        e.preventDefault();
        if (newField.label.trim()) {
            setFields([...fields, { ...newField, id: Date.now(), isActive: true }]);
            setNewField({ ...newField, label: '' }); // reset label
        }
    };

    const toggleFieldStatus = (id) => {
        setFields(fields.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f));
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3>Dynamic Registration Fields Manager</h3>

            <form onSubmit={handleAddField} style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Target Role</label>
                    <select
                        value={newField.targetRole}
                        onChange={(e) => setNewField({ ...newField, targetRole: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="Student">Student (Aspirante)</option>
                        <option value="Company">Company</option>
                        <option value="Institution">Institution</option>
                    </select>
                </div>
                <div style={{ flex: 2, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Field Label</label>
                    <input
                        type="text"
                        placeholder="E.g. Desired Salary"
                        value={newField.label}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Input Type</label>
                    <select
                        value={newField.type}
                        onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="open_text">Open Text</option>
                        <option value="dropdown">Dropdown Selection</option>
                        <option value="multiple">Multiple Selection</option>
                    </select>
                </div>
                <div>
                    <button type="submit" style={{ padding: '9px 20px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Add Field
                    </button>
                </div>
            </form>

            <h4>Current Configured Fields</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                        <th style={{ padding: '10px' }}>Target Role</th>
                        <th style={{ padding: '10px' }}>Field Label</th>
                        <th style={{ padding: '10px' }}>Input Type</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{field.targetRole}</td>
                            <td style={{ padding: '10px' }}>{field.label}</td>
                            <td style={{ padding: '10px', textTransform: 'capitalize' }}>{field.type.replace('_', ' ')}</td>
                            <td style={{ padding: '10px' }}>
                                <span style={{ color: field.isActive ? '#155724' : '#721c24', fontWeight: 'bold', fontSize: '13px' }}>
                                    {field.isActive ? 'Active' : 'Disabled'}
                                </span>
                            </td>
                            <td style={{ padding: '10px' }}>
                                <button
                                    onClick={() => toggleFieldStatus(field.id)}
                                    style={{ padding: '5px 10px', backgroundColor: field.isActive ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                                >
                                    {field.isActive ? 'Disable' : 'Enable'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicFormFieldsManager;
