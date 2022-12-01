import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './component/Home';
import Flight from './component/Flight';
import Hotel from './component/Hotel';
import Navbar from './navigations/Navbar';
import Sidebar from './navigations/Sidebar';
import Bus from './component/Bus';
import Login from "./auth/login";

export default function App() {
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="flight" element={<Flight />} />
            <Route path="hotel" element={<Hotel />} />
            <Route path="bus" element={<Bus />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// export default App;
