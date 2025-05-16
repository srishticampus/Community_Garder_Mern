import React from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaMapMarker, FaSeedling, FaClock, FaCheck } from 'react-icons/fa';


function ManagerViewGardeners() {

    const gardeners = [
    {
      id: 1,
      image: "/path-to-image.jpg",
      fullName: "John Doe",
      gender: "Male",
      address: "123 Garden Street",
      email: "john@example.com",
      phone: "+1234567890",
      experience: 5,
      availability: "Weekdays",
      preferredCrops: ["Vegetables", "Herbs", "Flowers"],
      skills: ["Organic Farming", "Pest Control", "Soil Management", "Irrigation"]
    },
    // Add more gardeners as needed
  ];

  return (
    <div>
          <Container className="gardener-container">
      <h2 className="text-center mb-4">Registered Gardeners</h2>
      <Row>
        {gardeners.map((gardener) => (
          <Col lg={4} md={6} className="mb-4" key={gardener.id}>
            <Card className="gardener-card">
              <div className="gardener-image-container">
                <img
                  src={gardener.image}
                  alt={gardener.fullName}
                  className="gardener-image"
                />
              </div>
              
              <Card.Body>
                <Card.Title className="gardener-name">
                  <FaUser className="icon" /> {gardener.fullName}
                </Card.Title>
                
                <div className="gardener-details">
                  <p><FaEnvelope className="icon" /> {gardener.email}</p>
                  <p><FaPhone className="icon" /> {gardener.phone}</p>
                  <p><FaMapMarker className="icon" /> {gardener.address}</p>
                  <p><FaClock className="icon" /> {gardener.experience} years experience</p>
                  <p><FaCheck className="icon" /> {gardener.availability}</p>
                </div>

                <div className="crops-section">
                  <h6>Preferred Crops</h6>
                  <div className="crops-list">
                    {gardener.preferredCrops.map((crop, index) => (
                      <Badge bg="success" key={index} className="crop-badge">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="skills-section">
                  <h6>Skills</h6>
                  <div className="skills-list">
                    {gardener.skills.map((skill, index) => (
                      <Badge bg="primary" key={index} className="skill-badge">
                        <FaSeedling className="skill-icon" /> {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    </div>
  )
}

export default ManagerViewGardeners