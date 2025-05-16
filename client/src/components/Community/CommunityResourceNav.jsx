import React from 'react'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBell, FaUser, FaEnvelope } from 'react-icons/fa';
import '../../assets/css/CommunityResourceNav.css';

function CommunityResourceNav() {
  return (
    <div>
            <Navbar bg="success" variant="dark" expand="lg" fixed="top" className="community-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/community/dashboard">
         
          Community Resources
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="community-navbar-nav" />
        <Navbar.Collapse id="community-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/community/resource/add">Add Resourses</Nav.Link>
            
          </Nav>
          
         
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}

export default CommunityResourceNav