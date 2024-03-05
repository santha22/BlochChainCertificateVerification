import React from "react";
import Certificate from "./Certificate"; // Import your Certificate component

function CertificateGenerator({ certificate }) {
  const { firstname, lastname, assignDate } = certificate; // Use the details from the form
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
            {firstname}, {lastname}, {assignDate}
          <Certificate
            title="Certificate of Completion"
            name={`${firstname} ${lastname}`}
            date={assignDate}
          
          />
        </div>
      </div>
    </div>
  );
}

export default CertificateGenerator;
