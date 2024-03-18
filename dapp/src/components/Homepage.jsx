import React from "react";
import logo from "../Images/chain.png";
import Metamask from "./Metamask";

function Homepage(props) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="my-3">
        This is the homepage of Certification webpage.
        <br />
      </p>
      {/* <Metamask /> */}
    </header>
  );
}

export default Homepage;