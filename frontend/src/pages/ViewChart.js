import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Use named export
import './ViewChart.css';

function ViewChart() {
  const { fileId } = useParams(); // Retrieve fileId from URL
  const [chartUrl, setChartUrl] = useState(null); // Store chart URL
  const [error, setError] = useState(null); // Handle errors if any
  const sharableLink = `http://localhost:5000/api/chart/${fileId}`; // Sharable link to the chart

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
        </div>
      </div>
    </div>
    </div>
  );
}

export default ViewChart;
