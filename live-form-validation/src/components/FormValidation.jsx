import React, { useState } from 'react';

const FormValidation = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        let newErrors = { ...errors };

        if (name === 'name') {
            newErrors.name = value.trim() === '' ? 'Name is required' : '';
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            newErrors.email = !emailRegex.test(value) ? 'Invalid email' : '';
        }

        if (name === 'password') {
            newErrors.password = value.length < 6 ? 'Password must be 6+ characters' : '';
        }

        setErrors(newErrors);
    };

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Register Form</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={
                        !form.name || !form.email || !form.password ||
                        errors.name || errors.email || errors.password
                    }
                >
                    Submit
                </button>

            </form>
        </div>
    );
};

export default FormValidation;
