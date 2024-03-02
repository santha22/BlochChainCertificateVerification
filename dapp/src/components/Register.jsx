// import React from "react";
// import { useFormik } from "formik";

// function Login(props) {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//     onSubmit: (values) => {
//       console.log("form submit", values);
//     },
//     validate: (values) => {
//       let errors = {};

//       if (!values.name) {
//         errors.name = "Name Required";
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
//                   value={formik.values.name}

//                 />
//                 {formik.touched.name && formik.errors.name ? <div className="errors" style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{formik.errors.name}</div> : null}

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
//                 SinUp
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

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
    <div>
      <div className='cointainer'>
        <div className='row justify-content-center'>
          <div className='col-md-4 my-5'>
            <form className="my-5 border p-4" onSubmit={handleSubmit}>

              <h1 className="h3 mb-3 text-center font-weight-normal">Please Sign in</h1>
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
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register;
