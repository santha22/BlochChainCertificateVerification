import React, { useState } from "react";
import CertificateGenerator from "./CertificateGenerator";
import { useAuth } from "../store/auth";
import Certificate from "./Certificate";


const URL = "http://localhost:5000/api/auth/certificate";

function GenerateForm(props) {
  
  const [certificate, setCertificate] = useState({
    firstname: "",
    lastname: "",
    orgName: "",
    courseName: "",
    assignDate: "",
    duration: "",
    email: "",
    sha256Hash: "",

  });

  const [submitted, setSubmitted] = useState(false);
 
  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      
      setCertificate({
        ...certificate,
        [name]: value,
      });
      
    };

  console.log("CERTIGICARTEs",certificate);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(URL, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(certificate),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setCertificate({...certificate, sha256Hash: data.sha256Hash}); // Update sha256Hash state with response value
        
  //       setSubmitted(true);
  //       console.log("certificate details ", certificate);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  // }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(certificate),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("DATA",data);
          setCertificate(prevCertificate => ({
            ...prevCertificate,
            sha256Hash: data.sha256Hash
          })); // Update certificate state
          setSubmitted(true);

        }
        console.log("certificate", certificate);
      } catch (error) {
        console.log(error);
      }
    }
  

    return (
      <>
        {submitted ? (
          <Certificate 
            certificate={certificate}  
          />

        ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="my-5 border  rounded-4 p-4" onSubmit={handleSubmit} autoComplete="off">

                  <h1 className="text-white">Certificate Details</h1>

                  <div className="row mb-3">
                    <div className="col">
                      <input
                        required
                        id="firstname"
                        name="firstname"
                        label="firstname"
                        type="text"
                        autoComplete="off"
                        value={certificate.firstname}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col">
                      <input
                        required
                        id="lastname"
                        name="lastname"
                        label="lastname"
                        value={certificate.lastname}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <input
                        required
                        id="orgName"
                        name="orgName"
                        label="orgName"
                        value={certificate.orgName}
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Organization"
                      />
                    </div>
                    <div className="col">
                      <input
                        required
                        name="courseName"
                        id="courseName"
                        label="courseName"
                        type="text"
                        className="form-control"
                        placeholder="Degree, skill or award.."
                        value={certificate.courseName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <input
                        required
                        id="assignDate"
                        name="assignDate"
                        label="assignDate"
                        type="date"
                        className="form-control"
                        value={certificate.assignDate}
                        onChange={handleChange}
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                    <div className="col">
                      <input
                        required
                        id="duration"
                        name="duration"
                        label="duration"
                        value={certificate.duration}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Duration"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <input
                        required
                        id="email"
                        name="email"
                        label="email"
                        autoComplete="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={certificate.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>

                  </div>
              </form>
            </div>
          </div>

        </div>
      )}

      </>
    );

}

export default GenerateForm;
