import React from 'react';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
import './Home.css'

function Home() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-body">
        <div className='grid-item-1'>
          <h1>Chartify</h1>
        </div>
        <div className='grid-item-2'>
          <p>Quicky generate beautiful visualizations from csv data, without any of the fuss</p>
        </div>
        <div className='grid-item-3'>
          <FileUpload />
        </div>
        <div className='grid-item-4'>
          <img src='home-img.jpg' alt='A computer screen displaying a chart' className='img'/>
        </div>
      </div>
    </div>
  )
}

export default Home;