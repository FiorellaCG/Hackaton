import React, { useState } from 'react';

const CreateCompanyInstitutionForm = () => {
    const [formData, setFormData] = useState({
        type: 'Company',
        name: '',
        email: '',
        contactPerson: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API structure integration point goes here
        console.log('Submitting new entity:', formData);
        // Note: Add success toast/message after integration
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Register New Company / Institution</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Entity Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="Company">Company</option>
                        <option value="Institution">Institution</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Organization Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter complete name"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Corporate Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="contact@organization.com"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contact Person (Optional)</label>
                    <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Full name of representative"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Brief description about the organization..."
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    ></textarea>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCompanyInstitutionForm;
