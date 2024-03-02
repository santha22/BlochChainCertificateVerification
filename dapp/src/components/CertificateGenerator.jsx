import React from "react";
import Certificate from "./Certificate"; // Import your Certificate component

function CertificateGenerator({ certificate }) {
  const { firstname, lastname, assignDate } = certificate; // Use the details from the form

  // You can format the date if needed
  // const formattedDate = // Format the date using your desired logic

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
            {firstname}, {lastname}, {assignDate}
          <Certificate
            title="Certificate of Completion"
            name={`${firstname} ${lastname}`}
            date={assignDate}
            // hash="your_hash_here" // Replace with the actual hash
            // logo="path/to/your/logo.png" // Replace with the actual logo path
          />
        </div>
      </div>
    </div>
  );
}

export default CertificateGenerator;
