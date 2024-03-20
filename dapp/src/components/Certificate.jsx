import React from "react";
import { generateKeyPair, signWithPrivateKey } from "./elliptic";
// const { calculateSHA256Hash } = require('./sha256');
import { calculateSHA256Hash } from "./sha256";

function Certificate({ certificate }) {
  const { firstname, lastname, orgName, courseName, assignDate, duration, email } = certificate;
  const certificateData = `${firstname}, ${lastname}, ${orgName}, ${courseName}, ${assignDate}, ${duration}, ${email}`;

  // Calculate SHA256 hash
  const sha256Hash = calculateSHA256Hash(certificateData);
  // 708006f10f0476bf15d95b02be1e894c5ffd0ad3a22ad7f7ef62566758ad6234

  // Generate key pair
  const keyPair = generateKeyPair();

  // Sign the SHA256 hash with the private key
  const signature = signWithPrivateKey(keyPair.getPrivate('hex'), sha256Hash);

  // Log the results
  console.log("SHA256 Hash:", sha256Hash);
  console.log("Signature:", signature);

  return (

    <div className="container mt-5">


      <div className="card rounded-5 mx-auto" style={{ width: "600px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="card-body p-5">
          <h4 className="card-title text-center mb-4">Certificate of Completion</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Recipient:</strong> {firstname} {lastname}</li>
            <li className="list-group-item"><strong>Organization:</strong> {orgName}</li>
            <li className="list-group-item"><strong>Course:</strong> {courseName}</li>
            <li className="list-group-item"><strong>AssignDate:</strong> {assignDate}</li>
            <li className="list-group-item"><strong>Duration:</strong> {duration}</li>
          </ul>
        </div>

        <div className="text-center pb-4">
          <p className="mb-0 font-weight-bold">ID: {sha256Hash}</p>
        </div>
        {/* <div className="card-footer rounded-5 text-center p-3" style={{ background: "#f8f9fa" }}>
          <p className="mb-0">This certificate is issued to {firstname} {lastname} for successfully completing the course.</p> 
          <p className="mb-0">Signature: {signature}</p>
          <p className="mb-0">ID: {sha256Hash}</p>
        </div> */}
      </div>
    </div>
  );

 

}


export default Certificate;