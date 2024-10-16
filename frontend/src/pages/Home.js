import React from 'react';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css'

function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="App-body d-flex justify-content-center align-items-center vh-90 bg-light p-5 m-0">
        <div className='col-md-6 grid-item-1 vh-50'>
          <div className='grid-item-1'>
              <h1>Chartify</h1>
            </div>
            <div className='grid-item-2 py-5'>
              <h3>Quicky generate beautiful visualizations from csv data, without any of the fuss</h3>
            </div>
            <div className='grid-item-3'>
              <FileUpload />
            </div>
        </div>
        <div className='col-md-6 grid-item-2'>
          <img src='home-img.jpg' alt='A computer screen displaying a chart' className='img'/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;