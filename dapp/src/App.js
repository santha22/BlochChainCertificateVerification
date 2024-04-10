import './App.css';
import React, { useState, useEffect } from 'react';
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
import Metamask from './components/Metamask';

function App() {
  const myStyle = {
    backgroundImage: `url(${logo2})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    checkMetamaskConnection();
  }, []);

  const checkMetamaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setMetamaskConnected(true);
          setAccounts(accounts);
          console.log("Connected account address:", accounts[0]);
        } else {
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error checking Metamask connection:', error);
      }
    } else {
      setShowPopup(true);
    }
  };
  

  const handleConnect = () => {
    setMetamaskConnected(true);
    setShowPopup(false);
    // console.log("Connected account address:", accounts[0]);
  };

  
    return (
      <div style={myStyle}>
        <Router>
        <NavBar />
        <div className='container rounder-5 d-flex justify-content-center align-items-center flex-column' style={{height: '89vh'}}>
          {/* <Homepage /> */}
          {/* <h1 className="text-white pt-5">Welcome to E-Certify</h1>
          <p className="text-white">Secure your certificates</p> 
          <Route path="/" element={<Homepage />} />
          */}
          <Routes>
            {metamaskConnected ? (
              <Route path="/" element={<Homepage />} />
            ) : (
              <Route path="/" element={<Metamask onConnect={handleConnect} />} />
            )}
            

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
