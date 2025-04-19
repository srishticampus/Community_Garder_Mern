import React from 'react'
import {
    Container,
    Navbar,
    Nav,
    Button,
    Row,
    Col,
    Card,
  } from "react-bootstrap";
  import { FaLeaf, FaTree, FaCut, FaMountain } from "react-icons/fa";
  import "../../assets/css/Admin.css";
  import ManagerHomeNav from "../Manager/ManagerHomeNav";
  import gardner from '../../assets/gardenimg1.jpg'
import Footer from '../../pages/landing/Footer';
  
function ManagerHomePage() {
  return (
      
        <div>
      <div className="landscaping-home">
        {/* Navigation */}
        <ManagerHomeNav/>

        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <div className="hero-content">
              <p className="subtitle">SUSTAINABLE FUTURE GARDEN</p>
              <h1>
                Landscaping & smart
                <br />
                green solutions
              </h1>
              <div className="hero-buttons">
                <Button variant="warning" className="me-3">
                  ABOUT US
                </Button>
                <Button variant="outline-light">PROJECTS</Button>
              </div>
              <div className="architect-info">
                
              </div>
            </div>
          </Container>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <Container>
            <h2>We build, maintain and manage temporary community gardens.</h2>
            <h3>Services</h3>
            <p className="section-description">
            We understand that managing a community garden is an administrative burden that takes time away from growing food and connecting with neighbours. That’s why we built Community Garden App! It’s a free, easy-to-use app that helps you manage your community garden, from planting to harvesting.
            </p>
            <p>Our secure web platform offers a suite of digital tools to community garden managers—online payment, data collection and information management in one easy-to-use dashboard.</p>
            <p>Our community garden management platform makes it easy to sign up gardeners, collect fees online and track who’s registered and paid.</p>
            <p></p>

            <Row className="g-4">
              <Col md={3}>
                <Card className="service-card">
                  <Card.Body>
                    <FaLeaf className="service-icon" />
                    <Card.Title>Maintenance</Card.Title>
                    <Card.Text>
                     
                    </Card.Text>
                    <Button variant="link">Read more →</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="service-card">
                  <Card.Body>
                    <FaTree className="service-icon" />
                    <Card.Title>Tree Care</Card.Title>
                    <Card.Text>
                      
                    </Card.Text>
                    <Button variant="link">Read more →</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="service-card">
                  <FaCut className="service-icon" />
                  <Card.Body>
                    <Card.Title>Pruning</Card.Title>
                    <Card.Text>
                      
                    </Card.Text>
                    <Button variant="link">Read more →</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="service-card">
                  <Card.Body>
                    <FaMountain className="service-icon" />
                    <Card.Title>Landscaping</Card.Title>
                    <Card.Text>
                     
                    </Card.Text>
                    <Button variant="link">Read more →</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button variant="outline-dark">SERVICES</Button>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <section className="about-section">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <h2>ABOUT US</h2>
                <h3>
                  A beautiful garden is
                  <br />a work of <span className="text-warning">Art.</span>
                </h3>
                <p>
                Community Garden Builders® is a Vancouver-based social enterprise with a mission to transform vacant property into temporary community gardens and growing spaces. Our projects represent a unique partnership between landowners and community members, providing much needed garden space for the community as well as interim property management for landowners. Using mobile garden beds set atop shipping pallets, we create accessible urban spaces for local community members to grow their own food and flowers.
                </p>
                <Button variant="warning">ABOUT US</Button>
              </Col>
              <Col md={6}>
                <img
                  src={gardner}
                  alt="Gardener"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <Container>
            <Row>
              <Col md={4}>
                <h2>
                  What we
                  <br />
                  did so far
                </h2>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <div className="stat-item">
                      <h3>350+</h3>
                      <p>COMPLETED PROJECTS</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="stat-item">
                      <h3>12+</h3>
                      <p>YEARS EXPERIENCE</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="stat-item">
                      <h3>5+</h3>
                      <p>TEAM MEMBERS</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <Container>
            <Row>
              <Col md={6}>
                <div className="project-grid">
                  <img
                    src={"https://i.pinimg.com/736x/2c/8b/25/2c8b25b72b029df0399e2637a2e6f8cb.jpg"}
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src={"https://i.pinimg.com/736x/96/32/25/963225fb3ec4ccf54648edd453076db4.jpg"}
                    alt="Project 2"
                    className="img-fluid"
                  />
                  <img
                    
                    alt="Project 3"
                    className="img-fluid"
                  />
                  <img
                    
                    alt="Project 4"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div className="project-content">
                  <strong><h4 style={{color: "green"}}>PROJECTS</h4></strong>
                  <h3>
                    A peak of our landscape{" "}
                    <span className="text-warning">creations</span>
                  </h3>
                  <p>
                  Decommissioned Temporary Community Garden Projects
                  </p>
                  <Button variant="outline-dark">PROJECTS</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
<Footer/>
      </div>


     

    
      


  )
}

export default ManagerHomePage
