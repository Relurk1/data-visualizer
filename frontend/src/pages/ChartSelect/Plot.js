import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button } from '@mui/material';
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
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
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

  // Handlers for dropdowns
  const handleDropdown1Change = (event) => setDropdown1(event.target.value);
  const handleDropdown2Change = (event) => setDropdown2(event.target.value);

  // Handlers for toggles
  const handleToggle1Change = (event) => setToggle1(event.target.checked);
  const handleToggle2Change = (event) => setToggle2(event.target.checked);
  const handleToggle3Change = (event) => setToggle3(event.target.checked);

  const handleSubmit = () => {
    // Prepare data to send to the backend
    const payload = {
      Id : fileId,
      var_amt : '2',
      chartType: "plot",
      x_col: dropdown1,
      y_col: dropdown2,
      displayAxisNames: toggle1,
      displayTitle: toggle2,
      generateStatistics: toggle3,
    };

    axios.post(`http://localhost:5000/api/chart`, payload)
      .then(response => {
        // Navigate to the ViewChart component with the chart ID
        navigate(`/view_chart/${fileId}`);
      })
      .catch(error => {
        console.error("Error generating chart:", error);
      });
  }

  return (
    <div className="plot">
      <Navbar />
      <div className='grid-container'>

        <h3 className="grid-item-1">Plot</h3>

        <FormControl fullWidth margin="normal" className="grid-item-2">
            <InputLabel>Independent Variable</InputLabel>
            <Select value={dropdown1} onChange={handleDropdown1Change}>
              {columns.map((col, index) => (
                <MenuItem key={index} value={col}>{col}</MenuItem>
              ))}
            </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal" className="grid-item-3">
            <InputLabel>Dependent Variable</InputLabel>
            <Select value={dropdown2} onChange={handleDropdown2Change}>
              {columns.map((col, index) => (
                <MenuItem key={index} value={col}>{col}</MenuItem>
              ))}
            </Select>
        </FormControl>

        <div className='grid-item-4'>
            <FormControlLabel
                control={<Switch checked={toggle1} onChange={handleToggle1Change} />}
                label="Display Axis Names"
            />
            <FormControlLabel
                control={<Switch checked={toggle2} onChange={handleToggle2Change} />}
                label="Display Title"
            />
            <FormControlLabel
                control={<Switch checked={toggle3} onChange={handleToggle3Change} />}
                label="Generate Statistics"
            />
        </div>

        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '1rem' }} 
          className="grid-item-5"
          onClick={handleSubmit}
        >
          Submit
        </Button>

      </div>
    </div>
  );
}

export default Plot;
