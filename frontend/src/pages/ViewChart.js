import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewChart.css';

function ViewChart() {
  const { fileId } = useParams(); // Retrieve fileId from URL
  const [chartUrl, setChartUrl] = useState(null); // Store chart URL
  const [error, setError] = useState(null); // Handle errors if any

  // Fetch chart image from backend on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/api/chart/${fileId}`, { responseType: 'blob' })
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
    <div className="View">
      <Navbar />
      <div className="grid-container-view">
        <div className="grid-item-1-view">
          {error ? (
            <p>{error}</p>
          ) : (
            chartUrl && <img src={chartUrl} alt="Generated Chart" className="generated-chart-view"/>
          )}
        </div>
        <div className="grid-item-2-view">
          <p className="statistics-view">
            Statistical info here
          </p>
        </div>
        <div className="grid-item-3-view">
          <button onClick={handleDownload}>
            Download
          </button>
          <button>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewChart;
