import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2>User not logged in</h2>
          <Button variant="primary" className="mt-3" onClick={() => navigate('/signup')}>
            Go to Signup
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="w-50 shadow-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4">Welcome, {user.name}!</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <div className="d-flex flex-column align-items-center">
            <Button
              variant="success"
              className="mb-3 w-75"
              onClick={() => navigate('/saved-graphs')}
            >
              View Saved Graphs
            </Button>
            <Button
              variant="secondary"
              className="mb-3 w-75"
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
            <Button
              variant="danger"
              className="w-75"
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
