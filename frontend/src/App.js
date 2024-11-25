import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SelectChart from './pages/SelectChart';
import Plot from './pages/ChartSelect/Plot';
import ScatterPlot from './pages/ChartSelect/ScatterPlot';
import BarChart from './pages/ChartSelect/Bar';
import Histogram from './pages/ChartSelect/Histogram'
import Box from './pages/ChartSelect/Box'
import ViewChart from './pages/ViewChart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path='select/:fileId' element={<SelectChart />} />
          <Route path='select/test' element={<SelectChart />} />
          <Route path='plot/:fileId' element={<Plot />} />
          <Route path='scatter/:fileId' element={<ScatterPlot />} />
          <Route path='bar/:fileId' element={<BarChart />} />
          <Route path='histogram/:fileId' element={<Histogram />} />
          <Route path='box/:fileId' element={<Box />} />
          <Route path='view_chart/:fileId' element={<ViewChart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}


export default App;
