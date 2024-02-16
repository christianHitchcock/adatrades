import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {register} from "../redux/reducers/test";

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (name === 'confirmPassword' && formData.password !== value) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        const body = {
            email: formData.email,
            name: formData.fullName,
            phoneNumber: formData.phoneNumber,
            password: formData.password
        }
        setPasswordError('');
        console.log(formData);
        await dispatch(
            await register(body, () => navigate('/login'))
        )
    };

    return (
        <>
            <div className="vh-100 d-flex justify-content-center">
                <div className="form-access my-auto">
                    <form onSubmit={handleSubmit}>
                        <span>Create Account</span>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            {passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="form-checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                            />
                            <label className="custom-control-label" htmlFor="form-checkbox">
                                I agree to the{' '}
                                <Link to="/terms-and-conditions">Terms & Conditions</Link>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create Account
                        </button>
                    </form>
                    <h2>
                        Already have an account?
                        <Link to="/login"> Sign in here</Link>
                    </h2>
                </div>
            </div>
        </>
    );
}
