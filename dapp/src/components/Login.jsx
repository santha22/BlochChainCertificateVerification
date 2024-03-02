// import React from "react";
// // import "../Styles/submitAnimation.css";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";

// function Login(props) {
//   const formik = useFormik({
//     initialValues: {
//       orgName: "",
//       email: "",
//       password: "",
//     },
//     onSubmit: (values) => {
//       console.log("form submit", values);
//     },
//     validate: (values) => {
//       let errors = {};

//       if (!values.orgName) {
//         errors.orgName = "Orgization Name Required";
//       }
//       if (!values.email) {
//         errors.email = "Email Required";
//       }

//       if (!values.password) {
//         errors.password = "Password Required";
//       }

//       return errors;
//     },
//   });

//   console.log("values => ", formik.values);
//   return (
//     <div className="cointainer">
//       <div className="row justify-content-center">
//         <div className="col-md-3">
//           <form
//             className="my-5 border p-4"
//             autoComplete="off"
//             onSubmit={formik.handleSubmit}
//           >
//             <div className="row mb-3">
//               <div className="col">
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control"
//                   placeholder="Organization Name"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.orgName}
//                 />
//                 {formik.touched.orgName && formik.errors.orgName ? <div className="errors" style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{formik.errors.orgName}</div> : null}

//               </div>
//             </div>

//             <div className="row mb-3">
//               <div className="col">
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   placeholder="Email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                 />
//                 {formik.touched.email && formik.errors.email ? <div className="errors" style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{formik.errors.email}</div> : null}

//               </div>
//             </div>

//             <div className="row mb-3">
//               <div className="col">
//                 <input
//                   type="password"
//                   name="password"
//                   autoComplete="off"
//                   className="form-control"
//                   placeholder="password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                 />
//                 {formik.touched.password && formik.errors.password ? <div className="errors" style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{formik.errors.password}</div> : null}
//               </div>
//             </div>

//             <div className="mt-3 text-center">
//               <button type="submit" name="submit" className="btn btn-primary">
//                 Login
//               </button>
//             </div>
//             <hr />

//             <div className="mt-3 text-center">
//               <Link to="/signup" style={{ textDecoration: "none" }}>
//                 <button type="submit" className="btn btn-success">
//                   SignUp
//                 </button>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

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
    // <div>
    //   <div className='cointainer'>
    //     <div className='rwo justify-content-center'>
    //       <div className='col-md-4'>
    //       <form onSubmit={handleSubmit}>
            

    //         <div className='form-group'>
    //           <label htmlFor='email'>Email</label>
    //           {/* <br /> */}
    //           <input 
    //             type="email"
    //             name="email"
    //             placeholder="Email"
    //             id="email"
    //             required
    //             autoComplete='off'
    //             value={user.email}
    //             onChange={handleInput}
    //           />
    //         </div>

    //         <div className='form-group'>
    //           <label htmlFor='password'>Password</label>
    //           {/* <br /> */}
    //           <input 
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             id="password"
    //             required
    //             autoComplete='off'
    //             value={user.password}
    //             onChange={handleInput}
    //           />
    //         </div>

    //         {/* <br /> */}
    //         <button type='submit' className='btn btn-primary'>Login</button>
    //       </form>

    //       </div>
    //     </div>
    //   </div>
      
    // </div>

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

