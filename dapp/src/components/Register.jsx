import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import logo1 from "../Images/blockwallpaper.png";

const URL = "http://localhost:5000/api/auth/register";

const Register = () => {

  const [user, setUser] = useState({
    orgName: "",
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
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);

      if (response.ok) {
        // store toke in localhost
        toast.success("Registration Successful");
        storeTokenInLS(res_data.token);
        // localStorage.setItem("token", res_data);
        setUser({ orgName: "", email: "", password: "" });

        navigate("/login");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }

      console.log(response);

    } catch (error) {
      console.log("register", error);
    }

  }

  return (
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='row border rounder-5 p-3 bg-white shadow box-area' style={{ width: '930px' }}>
          {/* left box  */}

          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#1b2837" }}>
            <div className="featured-image mb-3">
              <img src={logo1} className='img-fluid rounded-4 my-3' style={{ width: "350px" }} alt="logo" />
            </div>
            <p className='text-white fs-2' style={{ fontFamily: 'monospace' }}>Be Verified</p>
          </div>

          {/* right box  */}
          <div className="col-md-6 my-5 right box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h1>Please Sign in</h1>

              </div>

              <form onSubmit={handleSubmit}>

                <div className='form-group'>
                  <input
                    type="text"
                    name="orgName"
                    placeholder="Organization Name"
                    className='form-control form-control-md bg-light fs-6'
                    id="orgName"
                    required
                    autoComplete='off'
                    value={user.orgName}
                    onChange={handleInput}
                  />
                </div>

                <div className='form-group my-2'>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className='form-control form-control-md bg-light fs-6'
                    id="email"
                    required
                    autoComplete='off'
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>

                <div className='form-group my-2'>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className='form-control form-control-md bg-light fs-6'
                    id="password"
                    required
                    autoComplete='off'
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>


                <div className='my-3 text-center'>
                  <button type='submit' className='btn btn-primary mx-auto'>Register</button>
                </div>
              </form>
            </div>

          </div>
          {/* <div className='col-md-4 my-5'>
            <form className="my-5 border p-4" onSubmit={handleSubmit}>

              <div className='form-group'>
                <label htmlFor='orgName'>Organization Name</label>
                <input
                  type="text"
                  name="orgName"
                  placeholder="Organization Name"
                  className='form-control'
                  id="orgName"
                  required
                  autoComplete='off'
                  value={user.orgName}
                  onChange={handleInput}
                />
              </div>

              <div className='form-group my-3'>
                <label htmlFor='email'>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className='form-control'
                  id="email"
                  required
                  autoComplete='off'
                  value={user.email}
                  onChange={handleInput}
                />
              </div>

              <div className='form-group my-3'>
                <label htmlFor='password'>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className='form-control'
                  id="password"
                  required
                  autoComplete='off'
                  value={user.password}
                  onChange={handleInput}
                />
              </div>


              <div className='my-3 text-center'>
                <button type='submit' className='btn btn-primary mx-auto'>Register</button>
              </div>
            </form>
          </div> */}
        </div>
      </div>

  )
}

export default Register;
