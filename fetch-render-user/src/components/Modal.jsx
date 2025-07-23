import React, { useEffect, useState } from 'react';

const Modal = () => {
    const [show, setShow] = useState(false);

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

    

    const toggle = () => {
        setShow(prev => !prev);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShow(false);
            }
        }
        if (show) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        }

    }, [show]);


    return (
        <div className='container py-4 text-center'>
            <button type="button" className="btn btn-primary" onClick={toggle}>
                Launch Modal
            </button>

            {show && (
                <>

                    <div className="modal-backdrop fade show"></div>


                    <div
                        className="modal show d-block"
                        tabIndex="-1"
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Form Validation</h5>
                                 
                                </div>
                                <div className="modal-body">
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
                                            onClick={toggle}
                                        >
                                            Submit
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Modal;
