import React from "react";
// import {
//   Container,
//   Navbar,
//   Nav,
//   Button,
//   Row,
//   Col,
//   Card,
// } from "react-bootstrap";
// import { FaLeaf, FaTree, FaCut, FaMountain } from "react-icons/fa";
// import "../../assets/css/Admin.css";
// import ManagerHomeNav from "../Manager/ManagerHomeNav";
// import gardner from '../../assets/gardenimg1.jpg'
// import imagee1 from "../../assets/gardner2.jpg"
// import image3 from "../../assets/gardner3.jpg"
// import image4 from "../../assets/gardner4.jpg"
// import image5 from "../../assets/gardenig5.jpg"
// import 1mage6 from ""


function AdminHomePage() {
  return (
    <div></div>
    // <div>
    //   <div className="landscaping-home">
    //     {/* Navigation */}
    //     <ManagerHomeNav/>

    //     {/* Hero Section */}
    //     <section className="hero-section">
    //       <Container>
    //         <div className="hero-content">
    //           <p className="subtitle">SUSTAINABLE FUTURE GARDEN</p>
    //           <h1>
    //             Landscaping & smart
    //             <br />
    //             green solutions
    //           </h1>
    //           <div className="hero-buttons">
    //             <Button variant="warning" className="me-3">
    //               ABOUT US
    //             </Button>
    //             <Button variant="outline-light">PROJECTS</Button>
    //           </div>
    //           <div className="architect-info">
                
    //           </div>
    //         </div>
    //       </Container>
    //     </section>

    //     {/* Services Section */}
    //     <section className="services-section">
    //       <Container>
    //         <h2>LEADER IN LANDSCAPING</h2>
    //         <h3>Services</h3>
    //         <p className="section-description">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Super
    //           illud nemo non d est non deterrean labore.
    //         </p>

    //         <Row className="g-4">
    //           <Col md={3}>
    //             <Card className="service-card">
    //               <Card.Body>
    //                 <FaLeaf className="service-icon" />
    //                 <Card.Title>Maintenance</Card.Title>
    //                 <Card.Text>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //                 </Card.Text>
    //                 <Button variant="link">Read more →</Button>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //           <Col md={3}>
    //             <Card className="service-card">
    //               <Card.Body>
    //                 <FaTree className="service-icon" />
    //                 <Card.Title>Tree Care</Card.Title>
    //                 <Card.Text>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //                 </Card.Text>
    //                 <Button variant="link">Read more →</Button>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //           <Col md={3}>
    //             <Card className="service-card">
    //               <FaCut className="service-icon" />
    //               <Card.Body>
    //                 <Card.Title>Pruning</Card.Title>
    //                 <Card.Text>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //                 </Card.Text>
    //                 <Button variant="link">Read more →</Button>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //           <Col md={3}>
    //             <Card className="service-card">
    //               <Card.Body>
    //                 <FaMountain className="service-icon" />
    //                 <Card.Title>Landscaping</Card.Title>
    //                 <Card.Text>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //                 </Card.Text>
    //                 <Button variant="link">Read more →</Button>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //         </Row>
    //         <div className="text-center mt-4">
    //           <Button variant="outline-dark">SERVICES</Button>
    //         </div>
    //       </Container>
    //     </section>

    //     {/* About Section */}
    //     <section className="about-section">
    //       <Container>
    //         <Row className="align-items-center">
    //           <Col md={6}>
    //             <h2>ABOUT US</h2>
    //             <h3>
    //               A beautiful garden is
    //               <br />a work of <span className="text-warning">Art.</span>
    //             </h3>
    //             <p>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //               Suspendisse varius enim in eros elementum tristique.
    //             </p>
    //             <Button variant="warning">ABOUT US</Button>
    //           </Col>
    //           <Col md={6}>
    //             <img
    //               src={gardner}
    //               alt="Gardener"
    //               className="img-fluid rounded"
    //             />
    //           </Col>
    //         </Row>
    //       </Container>
    //     </section>

    //     {/* Stats Section */}
    //     <section className="stats-section">
    //       <Container>
    //         <Row>
    //           <Col md={4}>
    //             <h2>
    //               What we
    //               <br />
    //               did so far
    //             </h2>
    //           </Col>
    //           <Col md={8}>
    //             <Row>
    //               <Col md={4}>
    //                 <div className="stat-item">
    //                   <h3>350+</h3>
    //                   <p>COMPLETED PROJECTS</p>
    //                 </div>
    //               </Col>
    //               <Col md={4}>
    //                 <div className="stat-item">
    //                   <h3>12+</h3>
    //                   <p>YEARS EXPERIENCE</p>
    //                 </div>
    //               </Col>
    //               <Col md={4}>
    //                 <div className="stat-item">
    //                   <h3>5+</h3>
    //                   <p>TEAM MEMBERS</p>
    //                 </div>
    //               </Col>
    //             </Row>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </section>

    //     {/* Projects Section */}
    //     <section className="projects-section">
    //       <Container>
    //         <Row>
    //           <Col md={6}>
    //             <div className="project-grid">
    //               <img
    //                 src={}
                    
    //                 className="img-fluid"
    //               />
    //               <img
    //                 src={}
    //                 alt="Project 2"
    //                 className="img-fluid"
    //               />
    //               <img
    //                 src={}
    //                 alt="Project 3"
    //                 className="img-fluid"
    //               />
    //               <img
    //                 src={}
    //                 alt="Project 4"
    //                 className="img-fluid"
    //               />
    //             </div>
    //           </Col>
    //           <Col md={6} className="d-flex align-items-center">
    //             <div className="project-content">
    //               <p>PROJECTS</p>
    //               <h3>
    //                 A peak of our landscape{" "}
    //                 <span className="text-warning">creations</span>
    //               </h3>
    //               <p>
    //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //               </p>
    //               <Button variant="outline-dark">PROJECTS</Button>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Container>
    //     </section>
    //   </div>
    // </div>
  );
}

export default AdminHomePage;
