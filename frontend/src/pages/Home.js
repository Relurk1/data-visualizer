import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <Navbar>
        <div className="nav-options">
          {isLoggedIn ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/profile')}
              >
                Profile
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  setIsLoggedIn(false);
                  navigate('/');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </Navbar>
      <div className="App-body">
        <div className="grid-item-1-home">
          <h1>Chartify</h1>
        </div>
        <div className="grid-item-2-home">
          <h3 className="usp-text">Quickly generate beautiful visualizations from CSV data, without any of the fuss</h3>
        </div>
        <div className="grid-item-3-home">
          <FileUpload />
        </div>
        <div className="grid-item-4-home">
          <img src="home-img.jpg" alt="A computer screen displaying a chart" className="img" />
        </div>
      </div>
    </div>
  );
}

export default Home;
