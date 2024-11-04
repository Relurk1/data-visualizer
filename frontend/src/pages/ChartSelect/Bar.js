import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import "./Pairwise.css";

function BarChart() {
  // State variables for dropdowns
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  
  // State variables for toggles
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  // Handlers for dropdowns
  const handleDropdown1Change = (event) => setDropdown1(event.target.value);
  const handleDropdown2Change = (event) => setDropdown2(event.target.value);

  // Handlers for toggles
  const handleToggle1Change = (event) => setToggle1(event.target.checked);
  const handleToggle2Change = (event) => setToggle2(event.target.checked);
  const handleToggle3Change = (event) => setToggle3(event.target.checked);

  return (
    <div className="plot">
      <Navbar />
      <div className='grid-container'>

        <h3 className="grid-item-1">Bar Chart</h3>

        <FormControl fullWidth margin="normal" className="grid-item-2">
            <InputLabel>Independent Variable</InputLabel>
            <Select value={dropdown1} onChange={handleDropdown1Change}>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
            </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal" className="grid-item-3">
            <InputLabel>Dependent Variable</InputLabel>
            <Select value={dropdown2} onChange={handleDropdown2Change}>
            <MenuItem value="optionA">Option A</MenuItem>
            <MenuItem value="optionB">Option B</MenuItem>
            <MenuItem value="optionC">Option C</MenuItem>
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

        
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} className="grid-item-5">
            Submit
        </Button>

      </div>
    </div>
  );
}

export default BarChart;
