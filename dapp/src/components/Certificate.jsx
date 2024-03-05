import React from "react";

function Certificate({ certificate }) {
  const { firstname, lastname, orgName, courseName, assignDate, duration, email } = certificate;
  return (

    <div className="container mt-5">


      <div className="card mx-auto" style={{ width: "600px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="card-body p-5">
          <h4 className="card-title text-center mb-4">Certificate of Completion</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Recipient:</strong> {firstname} {lastname}</li>
            <li className="list-group-item"><strong>Organization:</strong> {orgName}</li>
            <li className="list-group-item"><strong>Course:</strong> {courseName}</li>
            <li className="list-group-item"><strong>Assignment Date:</strong> {assignDate}</li>
            <li className="list-group-item"><strong>Duration:</strong> {duration}</li>
          </ul>
        </div>
        <div className="card-footer text-muted text-center p-3" style={{ background: "#f8f9fa" }}>
          <p className="mb-0">This certificate is issued to {firstname} {lastname} for successfully completing the course.</p>
          <p className="mb-0">Email: {email}</p>
        </div>
      </div>
    </div>
  );

 

}


export default Certificate;