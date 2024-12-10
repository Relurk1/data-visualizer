import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './ViewChart.css';

function ViewChart() {
  const { fileId } = useParams();
  const [chartUrl, setChartUrl] = useState(null);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);
  const sharableLink = `http://localhost:5000/api/chart/${fileId}`;

  // Fetch chart image from backend on component mount
  useEffect(() => {
    axios.get(sharableLink, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setChartUrl(url);
      })
      .catch(error => {
        console.error("Error fetching chart image:", error);
        setError("Could not load chart image.");
      });
  }, [fileId]);

  // Save chart to profile
  const handleSaveToProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSaveMessage('You must be logged in to save charts.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/chart/save',
        { fileId, chartUrl: sharableLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setSaveMessage('Chart saved to your profile successfully!');
      }
    } catch (error) {
      console.error("Error saving chart:", error);
      setSaveMessage('Failed to save chart. Please try again.');
    }
  };

  // Function to download the chart
  const handleDownload = () => {
    if (chartUrl) {
      const link = document.createElement('a');
      link.href = chartUrl;
      link.download = `${fileId}-chart.png`;
      link.click();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="view-chart-container">
        <div className="content-container">
          {/* Chart Section */}
          <div className="chart-section">
            <h2>Generated Chart</h2>
            {error ? (
              <p className="error">{error}</p>
            ) : (
              chartUrl && <img src={chartUrl} alt="Generated Chart" className="chart-image" />
            )}
          </div>

          {/* Sidebar Section */}
          <div className="sidebar-section">
            <div className="qr-code-container">
              <h3>Shareable QR Code</h3>
              <QRCodeCanvas value={sharableLink} size={150} />
            </div>
            <button onClick={handleDownload} className="download-button">
              Download Chart
            </button>
            <button onClick={handleSaveToProfile} className="save-button">
              Save to Profile
            </button>
            {saveMessage && <p className="save-message">{saveMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewChart;
