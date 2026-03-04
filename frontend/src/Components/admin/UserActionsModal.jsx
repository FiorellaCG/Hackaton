import React, { useState, useEffect } from 'react';

const UserActionsModal = ({ isOpen, user, onClose, onSave }) => {
    const [editData, setEditData] = useState({
        role: '',
        isActive: false
    });

    useEffect(() => {
        if (user) {
            setEditData({
                role: user.role || 'Student',
                isActive: user.isActive || false
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSave = () => {
        onSave({ ...user, ...editData });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
                <h3 style={{ marginTop: 0 }}>Manage User: {user.name}</h3>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assign Role</label>
                    <select
                        value={editData.role}
                        onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Company">Company</option>
                        <option value="Institution">Institution</option>
                        <option value="Student">Student</option>
                        <option value="Reviewer">Reviewer</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ fontWeight: 'bold' }}>Account Status:</label>
                    <button
                        onClick={() => setEditData({ ...editData, isActive: !editData.isActive })}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: editData.isActive ? '#dc3545' : '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {editData.isActive ? 'Deactivate Account' : 'Activate Account'}
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                        onClick={onClose}
                        style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        style={{ padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserActionsModal;
