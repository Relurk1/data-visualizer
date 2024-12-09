import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="logo-link">
          <img src="/Logo.png" alt="The Chartify Logo" className="logo" />
        </a>
      </div>
      <div className="nav-right">
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="btn btn-primary"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/Login">Log In</a>
              </li>
              <li>
                <a href="/Signup">Sign Up</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
