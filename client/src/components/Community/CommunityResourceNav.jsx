import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaChevronDown,
  FaSeedling,
  FaCalendarAlt,
  FaUsers,
  FaUserTie,
  FaBox,
  FaHome,
  FaLeaf,
  FaTools,
} from "react-icons/fa";
import "../../assets/css/CommunityResourceNav.css";
import { MdManageAccounts } from "react-icons/md";

function CommunityResourceNav() {
  return (
    <div>
      <Navbar
        bg="success"
        variant="dark"
        expand="lg"
        fixed="top"
        className="community-navbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/community/dashboard">
            Community Garden
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="community-navbar-nav" />
          <Navbar.Collapse id="community-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/community/resource/add">
                Add Resourses
              </Nav.Link>
              <li className="nav-item mb-2">
                <span className="nav-link active text-white d-flex align-items-center">
                  <Link
                    className="text-decoration-none text-light"
                    to="/community/profileview"
                  >
                    <FaUserTie className="me-2" /> Profile
                  </Link>
                </span>
              </li>
              <li className="nav-item mb-2">
                <span className="nav-link active text-white d-flex align-items-center">
                  <Link
                    className="text-decoration-none text-light"
                    to="/community/resourseview"
                  >
                    {" "}
                    <FaBook className="me-2" />
                    Resourse{" "}
                  </Link>
                </span>
              </li>
              <Nav.Link as={Link} to="/community/managers">
                <MdManageAccounts className="nav-icon" /> Managers
              </Nav.Link>
              <Nav.Link as={Link} to="/community/gardners">
                <FaUsers className="nav-icon" /> Gardeners
              </Nav.Link>
              <Nav.Link as={Link} to="/community/garden">
                <FaLeaf className="nav-icon" /> Gardens
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CommunityResourceNav;
