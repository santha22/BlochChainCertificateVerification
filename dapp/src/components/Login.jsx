import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import logo1 from "../Images/blockwallpaper.png";
import { Link } from 'react-router-dom';


const URL = "http://localhost:5000/api/auth/login";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value
    })
  }


  // handiling form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token", res_data.token);
        setUser({ email: "", password: "" });
        navigate("/");
      }

      else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid Credential");
      }


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='row border rounder-5 p-3 bg-white shadow box-area' style={{ width: '930px' }}>
        {/* left box */}
        {/* #0066ff */}
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#1b2837" }}> 
          <div className="featured-image mb-3">
            <img src={logo1} className='img-fluid rounded-4' style={{ width: "350px" }} alt="logo" />
          </div>
          <p className='text-white fs-2' style={{ fontFamily: 'monospace' }}>Be Verified</p>
        </div>

        {/* right box */}
        <div className='col-md-6 my-5 right-box'>
          <div className='row align-items-center'>
            <div className="header-text mb-4">
              <h1>Please Login</h1>
            </div>
            {/* Add onSubmit event to the form element */}
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='form-control form-control-md bg-light fs-6'
                  id='email'
                  required
                  autoComplete='off'
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
              <div className='form-group my-2'>

                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='form-control form-control-lg bg-light fs-6'
                  id='password'
                  required
                  autoComplete='off'
                  value={user.password}
                  onChange={handleInput}
                />
              </div>

              <div className='my-3 text-center' >
                <button type='submit' className='btn btn-primary mx-auto' style={{width: '100%'}}>
                  Login
                </button>
              </div>
            </form>
            <div className="row">
              <small>Don't have an account? <Link to="/register">Register</Link></small>
            </div>
          </div>
        </div>


      </div>

    </div >
  )
}

export default Login

