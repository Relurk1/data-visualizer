import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Spinner } from 'react-bootstrap';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [savedCharts, setSavedCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const profileResponse = await fetch('http://127.0.0.1:5000/api/auth/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = await profileResponse.json();
        if (profileResponse.ok) {
          setUser(profileData);
        } else {
          throw new Error(profileData.message || 'Failed to fetch profile.');
        }

        const chartsResponse = await fetch('http://127.0.0.1:5000/api/chart/saved', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const chartsData = await chartsResponse.json();
        if (chartsResponse.ok) {
          setSavedCharts(chartsData.charts || []);
        } else {
          console.error('Error fetching saved charts:', chartsData.message);
          setSavedCharts([]);
        }
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message || 'An error occurred. Please try again later.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2>{error}</h2>
          <Button variant="primary" className="mt-3" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="vh-100 d-flex flex-column align-items-center">
      <Card className="w-50 shadow-lg mb-4">
        <Card.Body>
          <Card.Title className="text-center mb-4">Welcome, {user.name}!</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="saved-charts-container w-100">
        <h3 className="text-center">Your Saved Charts</h3>
        {savedCharts.length > 0 ? (
          savedCharts.map((chart, index) => (
            <Card key={index} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>Chart ID: {chart.fileId}</Card.Title>
                <img
                  src={chart.chartUrl}
                  alt={`Chart ${chart.fileId}`}
                  className="img-fluid rounded"
                />
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center mt-3">No saved charts yet. Create and save one!</p>
        )}
      </div>

      <div className="d-flex flex-column align-items-center mt-4">
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
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </div>
    </Container>
  );
}

export default Profile;
