import React from 'react';
import Navbar from '../components/Navbar';
import './SelectChart.css';

//TODO - uncomment charts as implemented in backend

function SelectChart() {
    return (
        <div className='Select'>
            <Navbar />
            <h1>Select Visualization</h1>

            <h2>Pairwise</h2>
            <div className='grid-container-select'>
                <div className='grid-item-select'>
                    <h6>Plot</h6>
                    <a href="/plot"><img alt='A line plot' src='/Placeholder.png'></img></a>
                </div>
                <div className='grid-item-select'>
                    <h6>Scatter</h6>
                    <a href="/scatter"><img alt='A scatter plot' src='/Scatter.png'></img></a>
                </div>
                <div className='grid-item-select'>
                    <h6>Bar</h6>
                    <a href="/bar"><img alt='A bar chart' src='/bar.png'></img></a>
                </div>
                {/* <div className='grid-item'>
                    <h6>Stem</h6>
                    <a href="/stem"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Fill Between</h6>
                    <a href="/fill-between"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Stack Plot</h6>
                    <a href="/stack-plot"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Stairs</h6>
                    <a href="/stairs"><img alt='' src='/Placeholder.webp'></img></a>
                </div> */}
            </div>

            <h2 className="header-2-select">Statistical Distribution</h2>
            <div className='grid-container-select'>
                <div className='grid-item-select'>
                    <h6>Histogram</h6>
                    <a href="/histogram"><img alt='' src='/Histogram.png'></img></a>
                </div>
                <div className='grid-item-select'>
                    <h6>Box Plot</h6>
                    <a href="/box-plot"><img alt='' src='/Box.png'></img></a>
                </div>
                {/* <div className='grid-item'>
                    <h6>Error Bars</h6>
                    <a href="/error-bars"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Violin Plot</h6>
                    <a href="/violin-plot"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Event Plot</h6>
                    <a href="/event-plot"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>2D Histogram</h6>
                    <a href="/2d-histogram"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Hexbin</h6>
                    <a href="/hexbin"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>Pie Chart</h6>
                    <a href="/pie-chart"><img alt='' src='/Placeholder.webp'></img></a>
                </div>
                <div className='grid-item'>
                    <h6>ECDF</h6>
                    <a href="/ecdf"><img alt='' src='/Placeholder.webp'></img></a>
                </div> */}
            </div>
        </div>
    )
}

export default SelectChart;