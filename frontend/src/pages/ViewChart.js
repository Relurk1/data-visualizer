import React from 'react';
import Navbar from '../components/Navbar';
import './ViewChart.css'

function ViewChart() {
  return (
    <div className="View">
      
      <Navbar />
      <div className="grid-container-view">
        <div className="grid-item-1-view">
            <img src="/Placeholder.png" alt="" className="generated-chart-view"/>
        </div>
        <div className="grid-item-2-view">
            <p className="statistics-view">
                Statistical info here
            </p>
        </div>
        <div className="grid-item-3-view">
            <button>
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
