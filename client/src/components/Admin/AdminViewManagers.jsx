import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import axios from '../../BaseAPI/axiosInstance'; // Adjust to your axios setup
import '../../assets/css/AdminDashCompStyle.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarker, FaBriefcase } from 'react-icons/fa';

function AdminViewManagers({ url }) {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    axios.post('/manager/viewall')
      .then((res) => {
        setManagers(res.data); // Ensure it matches your backend response
      })
      .catch((err) => {
        console.error('Error fetching managers:', err);
      });
  }, []);

  return (
    <div>
      <AdminNav />
      <Container className="manager-container">
        <h2 className="text-center mb-4">Organization Managers</h2>
        <Row>
          {managers.map((manager) => (
            <Col lg={4} md={6} className="mb-4" key={manager._id}>
              <Card className="manager-card">
                <div className="manager-image-container">
                  <img
                    src={`${url}/${manager.profilePic?.filename}`} // Ensure backend returns image correctly
                    alt={manager.fullName}
                    className="manager-image"
                  />
                </div>

                <Card.Body>
                  <div className="organization-info">
                    <span className="org-type">
                      <FaBriefcase className="icon-small" />year of experience  &nbsp;
                      {manager.yearofexperience}
                    </span>
                  </div>

                  <div className="manager-details">
                    <div className="detail-item">
                      <FaUser className="icon" />
                      <span>{manager.fullName}</span>
                    </div>

                    <div className="detail-item">
                      <FaEnvelope className="icon" />
                      <span>{manager.emailId}</span>
                    </div>

                    <div className="detail-item">
                      <FaPhone className="icon" />
                      <span>{manager.mobileNo}</span>
                    </div>

                    <div className="detail-item">
                      <FaMapMarker className="icon" />
                      <span>{manager.city},{manager.district}</span>
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

export default AdminViewManagers;
