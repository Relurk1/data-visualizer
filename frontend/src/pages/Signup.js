import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignupSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      setMessageType('danger');
      return;
    }

    if (!name || !email || !password) {
      setMessage('All fields are required!');
      setMessageType('danger');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful! Logging you in...');
        setMessageType('success');

        // Auto-login after successful signup
        const loginResponse = await fetch('http://127.0.0.1:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Save token and user data to localStorage
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('user', JSON.stringify(loginData.user));

          if (onSignupSuccess) {
            onSignupSuccess(loginData.user);
          }

          setTimeout(() => {
            navigate('/profile'); // Redirect to profile
          }, 1500);
        } else {
          setMessage('Signup successful, but login failed. Please log in manually.');
          setMessageType('danger');
          navigate('/login');
        }
      } else {
        setMessage(data.error || 'Signup failed! Please try again.');
        setMessageType('danger');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
      setMessageType('danger');
    }
  };

  const clickLogIn = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 p-3 border bg-white rounded">
        <h2 className="text-center mb-4">Sign Up</h2>
        {message && <Alert variant={messageType}>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="mt-4 w-100"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            Sign Up
          </Button>

          <Button
            variant="secondary"
            className="mt-4 w-100"
            onClick={clickLogIn}
            style={{
              backgroundColor: 'white',
              borderColor: 'var(--theme-color)',
              color: 'var(--theme-color)',
            }}
          >
            Have an account? Log in!
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
