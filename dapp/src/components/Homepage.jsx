import React from "react";
import logo from "../Images/chain.png";
import Metamask from "./Metamask";

function Homepage(props) {
  return (
    <div className="container-fuild my-3 d-flex justify-content-center align-items-center flex-column">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <p className="my-5">
        This is the homepage of Certification webpage.
        <br />
      </p> */}
      <h1 className="text-white pt-5">Welcome to E-Certify</h1>
      <p className="text-white">Secure your certificates</p>
      {/* <Metamask /> */}
    </div>
  );
}

export default Homepage;