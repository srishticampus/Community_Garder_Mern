import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

import "../../assets/css/landingnav.css";
function LandingNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Community Garden Connect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <NavDropdown
                title="Login"
                id="basic-nav-dropdown"
                className="nav-link"
              >
                <NavDropdown.Item as={Link} to="/login">
                  Gardner
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manager/Login">
                  Manager
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Cammunity/Login">
                  Community
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/login">
                  Admin
                </NavDropdown.Item>

                <NavDropdown.Divider />
              </NavDropdown>
            </li>
            <li>
              <NavDropdown
                title="Sign up"
                id="basic-nav-dropdown"
                className="nav-link"
              >
                <NavDropdown.Item as={Link} to="/signup">
                  Gardner
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manager/Signup">
                  Manager
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Community/Signup">
                  Community
                </NavDropdown.Item>

                <NavDropdown.Divider />
              </NavDropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
