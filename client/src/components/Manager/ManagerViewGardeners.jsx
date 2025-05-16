import React, { useEffect, useState } from 'react';
import axios from '../../BaseAPI/axiosInstance';
import '../../assets/css/AdminDashCompStyle.css';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarker, FaSeedling,
  FaClock, FaCheck
} from 'react-icons/fa';
import ManagerHomeNav from './ManagerHomeNav';

function ManagerViewGardeners({ url }) {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    axios.post('/gardner/viewallgardner')
      .then((res) => {
        setGardeners(res.data || []); // Adjust according to actual structure
      })
      .catch((err) => {
        console.error('Error fetching gardeners:', err);
      });
  }, []);

  return (
    <div>
      <ManagerHomeNav />
      <Container className="gardener-container">
        <h2 className="text-center mb-4">Registered Gardeners</h2>
        <Row>
          {gardeners.map((gardener) => (
            <Col lg={4} md={6} className="mb-4" key={gardener._id}>
              <Card className="gardener-card">
                <div className="gardener-image-container">
                  <img
                    src={ `${url}/${gardener?.profilePic?.filename}`}
                    alt={gardener.fullName}
                    className="gardener-image"
                  />
                </div>

                <Card.Body>
                  <Card.Title className="gardener-name">
                    <FaUser className="icon" /> {gardener.fullName}
                  </Card.Title>

                  <div className="gardener-details">
                    <p><FaEnvelope className="icon" /> {gardener.emailId}</p>
                    <p><FaPhone className="icon" /> {gardener.mobileNo}</p>
                    <p>
                      <FaMapMarker className="icon" />
                      {`${gardener.city}, ${gardener.district}, ${gardener.pincode}`}
                    </p>
                    <p><FaClock className="icon" /> {gardener.yearofexperience} years experience</p>
                    <p><FaCheck className="icon" /> {gardener.availabletime}</p>
                  </div>

                  <div className="crops-section">
                    <h6>Preferred Crops</h6>
                    <div className="crops-list">
                      {gardener.preferedcrops?.split(',').map((crop, index) => (
                        <Badge bg="success" key={index} className="crop-badge">
                          {crop.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="skills-section">
                    <h6>Skills</h6>
                    <div className="skills-list">
                      {gardener.skills?.split(',').map((skill, index) => (
                        <Badge bg="primary" key={index} className="skill-badge">
                          <FaSeedling className="skill-icon" /> {skill.trim()}
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
  );
}

export default ManagerViewGardeners;
