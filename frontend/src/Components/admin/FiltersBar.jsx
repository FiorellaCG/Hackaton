import React, { useState } from 'react';

const FiltersBar = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState('all');

    const handleApply = () => {
        if (onFilterChange) {
            onFilterChange({ searchTerm, dateRange });
        }
    };

    return (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
                type="text"
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minWidth: '200px' }}
            />

            <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
            </select>

            <button
                onClick={handleApply}
                style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Apply Filter
            </button>
        </div>
    );
};

export default FiltersBar;
