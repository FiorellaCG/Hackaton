import React, { useState, useEffect } from 'react';
import FiltersBar from '../../Components/admin/FiltersBar';

const VacantesManagement = () => {
    const [vacantes, setVacantes] = useState([]);

    useEffect(() => {
        // API Call to fetch vacantes
        setVacantes([]);
    }, []);

    const handleToggleStatus = (id, currentStatus) => {
        console.log(`Toggling status for vacante ${id} to ${!currentStatus}`);
        // Backend integration goes here
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Vacancies Management</h2>
                <button style={{ padding: '10px 15px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    + Add Manual Vacancy
                </button>
            </div>

            <FiltersBar onFilterChange={(filters) => console.log('Filters applied:', filters)} />

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '10px' }}>Title</th>
                            <th style={{ padding: '10px' }}>Company</th>
                            <th style={{ padding: '10px' }}>Date Posted</th>
                            <th style={{ padding: '10px' }}>Status</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacantes.length > 0 ? (
                            vacantes.map((vacante) => (
                                <tr key={vacante.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>{vacante.title}</td>
                                    <td style={{ padding: '10px' }}>{vacante.company}</td>
                                    <td style={{ padding: '10px' }}>{vacante.date}</td>
                                    <td style={{ padding: '10px' }}>
                                        <span style={{ color: vacante.isActive ? '#155724' : '#721c24', fontWeight: 'bold' }}>
                                            {vacante.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <button
                                            onClick={() => handleToggleStatus(vacante.id, vacante.isActive)}
                                            style={{ padding: '5px 10px', backgroundColor: vacante.isActive ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            {vacante.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '15px', textAlign: 'center', color: '#888' }}>
                                    No vacancies found. Ready for backend data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VacantesManagement;
