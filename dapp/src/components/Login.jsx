import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

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
        setUser({ email: "", password: ""});
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
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-4 my-5'>
          <form className="my-5 border p-4" onSubmit={handleSubmit}>

          <h1 className="h3 mb-3 text-center font-weight-normal">Please Login</h1>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='form-control'
                id='email'
                required
                autoComplete='off'
                value={user.email}
                onChange={handleInput}
              />
            </div>

            <div className='form-group my-3'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                className='form-control'
                id='password'
                required
                autoComplete='off'
                value={user.password}
                onChange={handleInput}
              />
            </div>

            <div className='my-3 text-center'>
              <button type='submit' className='btn btn-primary mx-auto'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

