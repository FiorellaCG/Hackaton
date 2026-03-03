import React, { useState } from 'react';
import FiltersBar from '../../Components/admin/FiltersBar';

const PracticasManagement = () => {
    const [practicas, setPracticas] = useState([]);

    const handleToggle = (id) => {
        console.log(`Toggle status for internship ID: ${id}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Internships (Prácticas) Management</h2>
            <FiltersBar />

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left', backgroundColor: '#f4f4f4' }}>
                            <th style={{ padding: '10px' }}>Internship Role</th>
                            <th style={{ padding: '10px' }}>Company</th>
                            <th style={{ padding: '10px' }}>Openings</th>
                            <th style={{ padding: '10px' }}>Status</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {practicas.length > 0 ? (
                            // Will render actual data when connected to backend API
                            null
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '15px', textAlign: 'center', color: '#999' }}>
                                    No internships loaded. Table structure is ready.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PracticasManagement;
