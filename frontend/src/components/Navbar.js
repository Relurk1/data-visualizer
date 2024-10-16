import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };
    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="/" className="logo-link"><img src="Logo.png" alt="The Chartify Logo" className="logo"/></a>
            </div>
            <div className="nav-right">
                <button className="btn btn-primary m-2" onClick={handleLogin}>Login</button>
                <button className="btn btn-secondary m-2" onClick={handleSignup}>Sign Up</button>
            </div>
        </nav>
    );
};

export default Navbar;