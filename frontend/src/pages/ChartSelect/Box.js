import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./OneVarDistribution.css";

function Box() {
  const { fileId } = useParams(); // Get fileId from URL
  const [columns, setColumns] = useState([]); // State to store column names
  const [dropdown1, setDropdown1] = useState(''); // State for selected variable
  const [xLabel, setXLabel] = useState(''); // Custom X-axis label
  const [yLabel, setYLabel] = useState(''); // Custom X-axis label
  const [graphTitle, setGraphTitle] = useState(''); // Custom graph title
  const [graphColor, setGraphColor] = useState('#000000'); // Default color: black
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch column names from the backend
    axios.get(`http://localhost:5000/api/columns/${fileId}`)
      .then(response => {
        setColumns(response.data.columns);
      })
      .catch(error => {
        console.error("Error fetching columns:", error);
      });
  }, [fileId]);

  const handleDropdown1Change = (event) => setDropdown1(event.target.value);

  const handleSubmit = () => {
    // Prepare data to send to the backend
    const payload = {
      Id: fileId,
      var_amt: '1',
      chartType: "box",
      x_col: dropdown1,
      x_label: xLabel, // Include custom X-axis label
      y_label: yLabel,
      title: graphTitle, // Include custom graph title
      color: graphColor, // Include custom graph color
    };

    axios.post(`http://localhost:5000/api/chart`, payload)
      .then(response => {
        // Navigate to the ViewChart component with the chart ID
        navigate(`/view_chart/${fileId}`);
      })
      .catch(error => {
        console.error("Error generating chart:", error);
      });
  };

  return (
    <div className="plot">
      <Navbar />
      <div className='grid-container-svardist'>

        {/* Title */}
        <h3 className="grid-item-1-svardist">Box Plot</h3>

        {/* Tracked Variable Dropdown */}
        <FormControl fullWidth margin="normal" className="grid-item-2-svardist" sx={{width: "100%",}}>
          <InputLabel>Tracked Variable</InputLabel>
          <Select value={dropdown1} onChange={handleDropdown1Change} sx={{width: "100%", textAlign: "left",}}>
            {columns.map((col, index) => (
              <MenuItem key={index} value={col}>{col}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Custom Graph Title */}
        <TextField
          label="Graph Title"
          value={graphTitle} 
          onChange={(e) => setGraphTitle(e.target.value)}
          fullWidth
          margin="normal"
          className="grid-item-4-svardist"
        />


        {/* Custom X-Axis Label */}
        <TextField
          label="X-Axis Label"
          value={xLabel}
          onChange={(e) => setXLabel(e.target.value)}
          fullWidth
          margin="normal"
          className="grid-item-3-svardist"
        />

          {/* Custom Y-Axis Label */}
          <TextField
          label="Y-Axis Label"
          value={xLabel}
          onChange={(e) => setYLabel(e.target.value)}
          fullWidth
          margin="normal"
          className="grid-item-3-svardist"
        />

        {/* Color Picker */}
        <div className="grid-item-5-svardist">
          <label htmlFor="colorPicker" style={{ marginRight: "1rem" }}>
            Choose Graph Color:
          </label>
          <input
            type="color"
            id="colorPicker"
            value={graphColor}
            onChange={(e) => setGraphColor(e.target.value)}
            style={{ cursor: "pointer", width: "50px", height: "30px", border: "none" }}
          />
        </div>

        {/* Submit Button */}
        <div className="grid-item-6-svardist">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "var(--theme-color)",
              "&:hover": {
                backgroundColor: "var(--theme-color-secondary)",
              },
            }}
          >
            Submit
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Box;
