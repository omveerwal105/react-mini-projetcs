import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({});

    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = (data) => {
        const error = {};
        if (!data.name.trim()) {
            error.name = "Name is required";
        }
        if (!data.email.trim()) {
            error.email = "Email is required";
        }
        if (!data.password) {
            error.password = 'Password is required';
        } else if (data.password.length < 8) {
            error.password = 'Password must be at least 8 characters long';
        }
        if (data.confirmPassword !== data.password) {
            error.confirmPassword = 'Passwords do not match';
        }
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = validateForm(formData);
        setError(newError);

        if (Object.keys(newError).length === 0) {
            console.log('Form submitted successfully!');
            setSubmittedData(formData);
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } else {
            console.log('Form submission failed due to validation errors.');
            setSubmittedData(null);
        }


    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='card'>
                    <input
                        className='form-control'
                        type='text'
                        name='name'
                        placeholder='Enter a name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
                </div>

                <div className='card'>
                    <input
                        className='form-control'
                        type='email'
                        name='email'
                        placeholder='Enter a mail'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
                </div>

                <div className='card'>
                    <input
                        className='form-control'
                        type='password'
                        name='password'
                        placeholder='Enter a password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                </div>

                <div className='card'>
                    <input
                        className='form-control'
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {error.confirmPassword && <p style={{ color: 'red' }}>{error.confirmPassword}</p>}
                </div>

                <button className='btn btn-primary' type="submit">Submit</button>
            </form>
            {submittedData && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <h3>Submitted Data:</h3>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Form;
