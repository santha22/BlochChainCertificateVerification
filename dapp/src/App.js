import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage";
import NavBar  from './components/NavBar';
import GenerateForm from './components/GenerateForm';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Certificate from './components/Certificate';
import CertificateGenerator from './components/CertificateGenerator';
import logo2 from './Images/wallpaper.png';
import Verify from './components/Verify';

function App() {
    const myStyle = {
      backgroundImage: `url(${logo2})`,
      height: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
  };
  
    return (
      <div style={myStyle}>
        <Router>
        <NavBar />
        <div className='container rounder-5 d-flex justify-content-center align-items-center flex-column' style={{height: '89vh'}}>
          {/* <Homepage /> */}
          {/* <h1 className="text-white pt-5">Welcome to E-Certify</h1>
          <p className="text-white">Secure your certificates</p> */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/certificate" element={<GenerateForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="/certificate-generated" element={<CertificateGenerator />} />
            <Route path="/generate-certificate" element={<Certificate />} /> 
            <Route path="/verify" element={<Verify />} />
          </Routes>

        </div>
        </Router>
      </div>
    );
}

export default App;
