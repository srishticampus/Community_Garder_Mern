import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaLeaf, FaTools, FaSignOutAlt } from 'react-icons/fa';
import { GoOrganization } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";

import '../../assets/css/AdminNav.css';
function AdminNav() {
  return (
    <div>
            <Navbar bg="success" variant="dark" expand="lg" className="admin-navbar fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/admin/dashboard">
          <FaLeaf className="brand-icon" /> Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/dashboard">
              <FaHome className="nav-icon" /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/view/managers">
              <MdManageAccounts className="nav-icon" /> Managers
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/view/gardeners">
              <FaUsers className="nav-icon" /> Gardeners
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/view/garden">
              <FaLeaf className="nav-icon" /> Gardens
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/view/resource">
              <FaTools className="nav-icon" /> Resources
            </Nav.Link>
             <Nav.Link as={Link} to="/admin/view/organization">
              <GoOrganization className="nav-icon" /> Organizations
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" className="logout-btn">
            <FaSignOutAlt className="nav-icon" /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default AdminNav