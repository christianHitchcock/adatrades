import React, {useEffect} from 'react';
import {Navbar, Nav, NavDropdown, Dropdown, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {ThemeConsumer} from '../context/ThemeContext';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {logoutAsync} from "../redux/reducers/test";
import {clearPersistedData} from "../redux/store";

const Header = () => {
    const {isAuthenticated, user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const userProfile = user;
    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = () => {
            document.body.classList.toggle('dark');
        };

        let el = document.querySelector('#darkTheme');
        if (el) {
            el.addEventListener('click', handleClick);
        }

        return () => {
            if (el) {
                el.removeEventListener('click', handleClick);
            }
        };
    }, []);
    const handleLogout = async () => {
        await dispatch(logoutAsync());
        clearPersistedData();
        // Redirect to login page after logout
        navigate('/login');
    };
    return (
        <>
            <header className="light-bb">
                <Navbar expand="lg">
                    <Link className="navbar-brand" to="/">
                        <ThemeConsumer>
                            {({data}) => (
                                <img src={'img/Adatradeslogo.png'} alt="logo"/>
                            )}
                        </ThemeConsumer>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-nav mr-auto">
                            <Link to="/" className="nav-link">
                                Exchange
                            </Link>
                            <Link to="/markets" className="nav-link">
                                Markets
                            </Link>
                            {isAuthenticated && (
                                <NavDropdown title="Dashboard">
                                    <Link to="/profile" className="dropdown-item">
                                        Profile
                                    </Link>
                                    <Link to="/wallet" className="dropdown-item">
                                        Wallet
                                    </Link>
                                    <Link to="/settings" className="dropdown-item">
                                        Settings
                                    </Link>
                                </NavDropdown>
                            )}
                            {isAuthenticated && (
                                <NavDropdown title="Others">
                                    <Link to="/login" className="dropdown-item">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="dropdown-item">
                                        Sign up
                                    </Link>
                                    <Link to="/lock" className="dropdown-item">
                                        Lock
                                    </Link>
                                    <Link to="/otp-number" className="dropdown-item">
                                        OTP Number
                                    </Link>
                                    <Link to="/otp-verify" className="dropdown-item">
                                        OTP Verify
                                    </Link>
                                    <Link to="/reset" className="dropdown-item">
                                        Reset
                                    </Link>
                                    <Link to="/notfound" className="dropdown-item">
                                        404
                                    </Link>
                                </NavDropdown>
                            )}
                        </Nav>
                        <Nav className="navbar-nav ml-auto">
                            <Dropdown className="header-custom-icon">
                                <ThemeConsumer>
                                    {({data, update}) => (
                                        <Button variant="default" onClick={update} id="darkTheme">
                                            {data.theme === 'light' ? (
                                                <i className="icon ion-md-moon"></i>
                                            ) : (
                                                <i className="icon ion-md-sunny"></i>
                                            )}
                                        </Button>
                                    )}
                                </ThemeConsumer>
                                {isAuthenticated && (
                                    <Dropdown.Toggle variant="default">
                                        <i className="icon ion-md-notifications"></i>
                                        <span className="circle-pulse"></span>
                                    </Dropdown.Toggle>
                                )}
                                <Dropdown.Menu>
                                    {isAuthenticated && (
                                        <>
                                            <div
                                                className="dropdown-header d-flex align-items-center justify-content-between">
                                                <p className="mb-0 font-weight-medium">
                                                    6 New Notifications
                                                </p>
                                                <a href="#!" className="text-muted">
                                                    Clear all
                                                </a>
                                            </div>
                                            <div className="dropdown-body">
                                                <a href="#!" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-md-lock"></i>
                                                    </div>
                                                    <div className="content">
                                                        <p>Account password change</p>
                                                        <p className="sub-text text-muted">5 sec ago</p>
                                                    </div>
                                                </a>
                                                <a href="#!" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-md-alert"></i>
                                                    </div>
                                                    <div className="content">
                                                        <p>Solve the security issue</p>
                                                        <p className="sub-text text-muted">10 min ago</p>
                                                    </div>
                                                </a>
                                                <a href="#!" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-logo-android"></i>
                                                    </div>
                                                    <div className="content">
                                                        <p>Download android app</p>
                                                        <p className="sub-text text-muted">1 hrs ago</p>
                                                    </div>
                                                </a>
                                                <a href="#!" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-logo-bitcoin"></i>
                                                    </div>
                                                    <div className="content">
                                                        <p>Bitcoin price is high now</p>
                                                        <p className="sub-text text-muted">2 hrs ago</p>
                                                    </div>
                                                </a>
                                                <a href="#!" className="dropdown-item">
                                                    <div className="icon">
                                                        <i className="icon ion-logo-usd"></i>
                                                    </div>
                                                    <div className="content">
                                                        <p>Payment completed</p>
                                                        <p className="sub-text text-muted">4 hrs ago</p>
                                                    </div>
                                                </a>
                                            </div>
                                            <div
                                                className="dropdown-footer d-flex align-items-center justify-content-center">
                                                <a href="#!">View all</a>
                                            </div>
                                        </>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            {isAuthenticated ? (
                                <Dropdown className="header-img-icon">
                                    <Dropdown.Toggle variant="default">
                                        <img src={'img/avatar.svg'} alt="avatar"/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <div className="dropdown-header d-flex flex-column align-items-center">
                                            <div className="figure mb-3">
                                                <img src={'img/avatar.svg'} alt=""/>
                                            </div>
                                            <div className="info text-center">
                                                <p className="name font-weight-bold mb-0">{userProfile?.email}</p>
                                                <p className="email text-muted mb-3">
                                                    {userProfile?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="dropdown-body">
                                            <ul className="profile-nav">
                                                <li className="nav-item">
                                                    <Link to="/profile" className="nav-link">
                                                        <i className="icon ion-md-person"></i>
                                                        <span>Profile</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/wallet" className="nav-link">
                                                        <i className="icon ion-md-wallet"></i>
                                                        <span>My Wallet</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/settings" className="nav-link">
                                                        <i className="icon ion-md-settings"></i>
                                                        <span>Settings</span>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/login" className="nav-link red" onClick={handleLogout}>
                                                        <i className="icon ion-md-power"></i>
                                                        <span>Log Out</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Dropdown className="header-img-icon">
                                    <Dropdown.Toggle variant="default">
                                        <img src={'img/avatar.svg'} alt="avatar"/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <div className="dropdown-body">
                                            <li className="nav-item">
                                                <Link to="/login" className="nav-link red">
                                                    <i className="icon ion-md-power mr-2"></i>
                                                    <span>Sign in</span>
                                                </Link>
                                            </li>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </>
    );
};

export default Header;
