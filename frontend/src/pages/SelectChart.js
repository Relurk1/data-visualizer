import React from 'react';
import Navbar from '../components/Navbar';
import './SelectChart.css';

function SelectChart() {
    return (
        <div className='Select'>
            <Navbar />
            <h1>Select Visualization</h1>

            <h2>Pairwise</h2>
            <div className='grid-container'>
                <div className='grid-item'>
                    <h6>Plot</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Scatter</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Bar</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Stem</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Fill Between</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Stack Plot</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Stairs</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
            </div>

            <h2>Statistical Distribution</h2>
            <div className='grid-container'>
                <div className='grid-item'>
                    <h6>Histogram</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Box Plot</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Error Bars</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Violin Plot</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Event Plot</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>2D Histogram</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Hexbin</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>Pie Chart</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
                <div className='grid-item'>
                    <h6>ECDF</h6>
                    <img alt='' src='/Placeholder.webp'></img>
                </div>
            </div>
        </div>
    )
}

export default SelectChart;