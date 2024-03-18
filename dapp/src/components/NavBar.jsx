import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

// import SearchIcon from '@mui/icons-material/Search';


const NavBar = () => {
  const { isLoggedIn } = useAuth();


    return (

      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <FontAwesomeIcon icon={faHouse} size="lg" style={{ cursor: "pointer" }} />
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active text-light" aria-current="page" to="/">E-Certify</NavLink>
                </li>

                {/* <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}

              </ul>

              {isLoggedIn ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link text-light" style={{ textDecoration: 'none' }}>
                      Logout
                    </Link>
                  </li> 

                  <li className="nav-item">
                    <Link to="/certificate" className="nav-link text-light" style={{ textDecoration: 'none' }}>
                      Generate
                    </Link>
                  </li>
                </ul>


              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item" >
                    <Link to="/login" className="nav-link text-light" style={{ textDecoration: 'none' }}>
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-light" style={{ textDecoration: 'none' }}>
                      Register
                    </Link>
                  </li>
                </ul>
            )}

            </div>

          </div>

        </nav>
      </div>
    );
}


export default NavBar;