import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {loginAsync as loginAuth} from '../redux/reducers/test'
import LoadingOverlay from "../components/Loading";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error} = useSelector(state => state.auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(
            await loginAuth(
                {email: `${email}`, password: `${password}`},
                () => navigate('/'))
        );

    };

    return (
        <>
            <LoadingOverlay/>
            <div className="vh-100 d-flex justify-content-center">
                <div className="form-access my-auto">
                    <form onSubmit={handleSubmit}>
                        <span>Sign In</span>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-right">
                            <Link to="/reset">Forgot Password?</Link>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="form-checkbox"
                            />
                            <label className="custom-control-label" htmlFor="form-checkbox">
                                Remember me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                    </form>
                    <h2>
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </h2>
                </div>
            </div>
        </>
    );
}
