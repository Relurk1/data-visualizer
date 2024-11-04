import React from 'react';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
import './Home.css'

function Home() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-body">
        <div className='grid-item-1-home'>
          <h1>Chartify</h1>
        </div>
        <div className='grid-item-2-home'>
          <h3 className='usp-text'>Quicky generate beautiful visualizations from csv data, without any of the fuss</h3>
        </div>
        <div className='grid-item-3-home'>
          <FileUpload />
        </div>
        <div className='grid-item-4-home'>
          <img src='home-img.jpg' alt='A computer screen displaying a chart' className='img'/>
        </div>
      </div>
    </div>
  )
}

export default Home;