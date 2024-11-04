import React from 'react';
import Navbar from '../components/Navbar';
import './SelectChart.css';
import { useParams } from 'react-router-dom';   
import { Link } from 'react-router-dom';

//TODO - uncomment charts as implemented in backend

function SelectChart() {
    const { fileId } = useParams();

    return (
        <div className='Select'>
            <Navbar />
            <h1>Select Visualization</h1>

            <h2>Pairwise</h2>
            <div className='grid-container-select'>
                <div className='grid-item-select'>
                    <h6>Plot</h6>
                    <Link to={`/plot/${fileId}`}>
                        <img alt='A line plot' src='/Placeholder.png' />
                    </Link>
                </div>
                <div className='grid-item-select'>
                    <h6>Scatter</h6>
                    <Link to={`/scatter/${fileId}`}>
                        <img alt='A scatter plot' src='/Scatter.png' />
                    </Link>
                </div>
                <div className='grid-item-select'>
                    <h6>Bar</h6>
                    <Link to={`/bar/${fileId}`}>
                        <img alt='A bar chart' src='/bar.png' />
                    </Link>
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
                    <Link to={`/histogram/${fileId}`}>
                        <img alt='A histogram plot' src='/Histogram.png' />
                    </Link>
                </div>
                <div className='grid-item-select'>
                    <h6>Box Plot</h6>
                    <Link to={`/box/${fileId}`}>
                        <img alt='A box plot' src='/Box.png' />
                    </Link>
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