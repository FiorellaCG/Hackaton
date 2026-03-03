import React, { useState, useEffect } from 'react';
import FiltersBar from '../../Components/admin/FiltersBar';

const ProgramasManagement = () => {
    const [programas, setProgramas] = useState([]);

    useEffect(() => {
        // API fetch for Programs placeholder
        setProgramas([]);
    }, []);

    const toggleProgramaState = (id, state) => {
        console.log(`Program ID: ${id} modified to state: ${!state}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Academic / Company Programs</h2>
            <FiltersBar />

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '12px' }}>Program Name</th>
                            <th style={{ padding: '12px' }}>Institution / Creator</th>
                            <th style={{ padding: '12px' }}>Applicants count</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Toggle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programas.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Structure initialized: Connect endpoints to hydrate data.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgramasManagement;
