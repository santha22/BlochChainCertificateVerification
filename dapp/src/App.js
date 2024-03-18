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
        <div className='container my-3'>
        
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/certificate" element={<GenerateForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="/certificate-generated" element={<CertificateGenerator />} />
            <Route path="/generate-certificate" element={<Certificate />} /> 
          </Routes>

        </div>
        </Router>
      </div>
    );
}

export default App;
