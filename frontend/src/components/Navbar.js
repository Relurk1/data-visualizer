import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="/" className="logo-link"><img src="Logo.png" alt="The Chartify Logo" className="logo"/></a>
            </div>
            <div className="nav-right">
                <ul className="nav-links">
                    <li>
                        <a href="/Login">Log In</a>
                    </li>
                    <li>
                        <a href="/Signup">Sign Up</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;