import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful! Redirecting to your profile...');
        setMessageType('success');
  
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
  
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        setMessage(data.message || 'Login failed! Please try again.');
        setMessageType('danger');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
      setMessageType('danger');
    }
  };
  

  const clickSignUp = () => {
    navigate('/Signup')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 p-3 border bg-white rounded">
        <h2 className="text-center mb-4">Login</h2>
        {message && <Alert variant={messageType}>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100" style={{backgroundColor: "var(--theme-color)"}}>
            Login
          </Button>
          <Button variant="secondary" type="submit" className="mt-4 w-100" onClick={clickSignUp} style={{
            backgroundColor: "white",
            borderColor: "var(--theme-color)",
            color: "var(--theme-color)"
          }}>
            Dont have an account?  Sign up!
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;