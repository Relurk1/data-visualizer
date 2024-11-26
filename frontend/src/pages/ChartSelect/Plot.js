import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Pairwise.css";

function Plot() {
  const { fileId } = useParams(); // Get fileId from URL
  const [columns, setColumns] = useState([]); // State to store column names
  const [dropdown1, setDropdown1] = useState(''); // State for selected independent variable
  const [dropdown2, setDropdown2] = useState(''); // State for selected dependent variable
  const [xLabel, setXLabel] = useState(''); // Custom x-axis label
  const [yLabel, setYLabel] = useState(''); // Custom y-axis label
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
  const handleDropdown2Change = (event) => setDropdown2(event.target.value);

  const handleSubmit = () => {
    const payload = {
      Id: fileId,
      var_amt: '2',
      chartType: "plot",
      x_col: dropdown1,
      y_col: dropdown2,
      x_label: xLabel,
      y_label: yLabel,
      color: graphColor, // Pass the selected graph color
    };
  
    axios.post(`http://localhost:5000/api/chart`, payload)
      .then(response => {
        navigate(`/view_chart/${fileId}`);
      })
      .catch(error => {
        console.error("Error generating chart:", error);
      });
  };
  
  

  return (
<div className="plot">
  <Navbar />
  <div className="grid-container">
    {/* Title */}
    <h3 className="grid-item-1">Plot</h3>

    {/* Independent Variable Dropdown */}
    <FormControl fullWidth margin="normal" className="grid-item-2">
      <InputLabel>Independent Variable</InputLabel>
      <Select value={dropdown1} onChange={handleDropdown1Change}>
        {columns.map((col, index) => (
          <MenuItem key={index} value={col}>
            {col}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Dependent Variable Dropdown */}
    <FormControl fullWidth margin="normal" className="grid-item-3">
      <InputLabel>Dependent Variable</InputLabel>
      <Select value={dropdown2} onChange={handleDropdown2Change}>
        {columns.map((col, index) => (
          <MenuItem key={index} value={col}>
            {col}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* X and Y Axis Labels */}
    <TextField
      label="X-Axis Label"
      value={xLabel}
      onChange={(e) => setXLabel(e.target.value)}
      fullWidth
      margin="normal"
      className="grid-item-4"
    />
    <TextField
      label="Y-Axis Label"
      value={yLabel}
      onChange={(e) => setYLabel(e.target.value)}
      fullWidth
      margin="normal"
      className="grid-item-4"
    />

    <div className="grid-item-6">
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
    <div className="grid-item-5">
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  </div>
</div>

  );
}

export default Plot;
