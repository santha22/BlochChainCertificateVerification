import React from "react";
import PropTypes from "prop-types";

function Certificate({ certificate }) {
  const { firstname, lastname, orgName, courseName, assignDate, duration, email } = certificate;
  return (

    <div className="container mt-5">
      {/* <div className="card mx-auto" style={{ width: "50rem" }}>
        <div className="card-body">
          <h5 className="card-title">Certificate Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>First Name:</strong> {firstname}</li>
            <li className="list-group-item"><strong>Last Name:</strong> {lastname}</li>
            <li className="list-group-item"><strong>Organization:</strong> {orgName}</li>
            <li className="list-group-item"><strong>Course Name:</strong> {courseName}</li>
            <li className="list-group-item"><strong>Assign Date:</strong> {assignDate}</li>
            <li className="list-group-item"><strong>Duration:</strong> {duration}</li>
            <li className="list-group-item"><strong>Email:</strong> {email}</li>
          </ul>
        </div>
      </div> */}

      {/* <div className="card mx-auto" style={{ width: "600px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Certificate of Completion</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Recipient:</strong> {firstname} {lastname}</li>
            <li className="list-group-item"><strong>Organization:</strong> {orgName}</li>
            <li className="list-group-item"><strong>Course:</strong> {courseName}</li>
            <li className="list-group-item"><strong>Assignment Date:</strong> {assignDate}</li>
            <li className="list-group-item"><strong>Duration:</strong> {duration}</li>
          </ul>
        </div>
        <div className="card-footer text-muted text-center">
          <p className="mb-0">This certificate is issued to {firstname} {lastname} for successfully completing the course.</p>
          <p className="mb-0">Email: {email}</p>
        </div>
      </div> */}


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

  {/* <div class="card" style={{width: "40rem"}}>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            <h1>{firstname}</h1>
            <h1>{lastname}</h1>
            <h1>{orgName}</h1>
            <h1>{courseName}</h1>
            <h1>{assignDate}</h1>
            <h1>{duration}</h1>
            <h1>{email}</h1>
          </div>
      </div> */}


  {/* d-flex justify-content-center align-items-center */ }



  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="1000"
  //   height="700"
  //   id="certificate"
  // >
  //   <rect
  //     x="50"
  //     y="25"
  //     rx="20"
  //     ry="20"
  //     width="900"
  //     height="600"
  //     id="border"
  //   />
  //   <text x="500" y="100" text-anchor="middle" fill="black" id="bodyTitle">
  //     Certificate
  //   </text>
  //   <text x="500" y="125" text-anchor="middle" fill="black" id="bodySubTitle">
  //     of
  //   </text>
  //   <line x1="250" y1="260" x2="750" y2="260" id="titleUnderLine" />
  //   <text x="500" y="250" text-anchor="middle" fill="black" id="title">
  //     {title}
  //   </text>
  //   <text
  //     x="500"
  //     y="300"
  //     text-anchor="middle"
  //     fill="black"
  //     id="subTitleHeader"
  //   >
  //     awarded to
  //   </text>
  //   <text x="500" y="400" text-anchor="middle" fill="black" id="name">
  //     {name}
  //   </text>
  //   <line x1="200" y1="410" x2="800" y2="410" id="titleUnderLine" />
  //   <text x="500" y="440" text-anchor="middle" fill="black" id="bodySubTitle">
  //     on
  //   </text>
  //   <text x="500" y="500" text-anchor="middle" fill="black" id="date">
  //     {date}
  //   </text>
  //   <line x1="400" y1="510" x2="600" y2="510" id="titleUnderLine" />
  //   <text x="100" y="575" text-anchor="start" fill="black" id="hash">
  //     ID: {hash}
  //   </text>
  //   <image
  //     x="725"
  //     y="500"
  //     height="80px"
  //     width="120px"
  //     id="logo"
  //     href={logo}
  //   />
  //   Sorry, your browser does not support inline SVG.
  // </svg>

}

// Certificate.propTypes = {
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     logo: PropTypes.string.isRequired,
//     hash: PropTypes.string.isRequired,
// }

export default Certificate;