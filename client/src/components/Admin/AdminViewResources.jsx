import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import '../../assets/css/AdminDashCompStyle.css';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBox, FaLeaf, FaHashtag } from 'react-icons/fa';
import axios from '../../BaseAPI/axiosInstance';

function AdminViewResources({url}) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get('/resource/all') // 🔁 Replace with your actual backend URL
      .then((res) => {
        setResources(res.data.data);
      })
      .catch((err) => {
        console.error('Failed to fetch resources:', err);
      });
  }, []);

  return (
    <div>
      <AdminNav />
      <Container className="resource-container">
        <h2 className="text-center">Available Resources</h2>
        <Row>
          {resources.length === 0 ? (
            <p className="text-center">No resources found.</p>
          ) : (
            resources.map((resource) => (
              <Col lg={3} md={4} sm={6} className="" key={resource._id}>
                <Card className="resource-card">
                  <div className="resource-image-wrapper">
                    <img
                      src={`${url}/${resource.photo.filename}`} // ⚠️ Adjust if path is different
                      alt={resource.name}
                      className="resource-image"
                    />
                  </div>

                  <Card.Body>
                    <div className="resource-name d-flex align-items-center">
                      <FaBox className="icon me-2" />
                      <h5 className="mb-0">{resource.resourceName}</h5>
                    </div>

                    <div className="resource-info">
                      <Badge bg="success" className="type-badge me-2">
                        <FaLeaf className="badge-icon me-1" />
                        {resource.resourceType}
                      </Badge>

                      <div className="quantity-info d-flex align-items-center">
                        <FaHashtag className="icon me-2" />
                        <span>Quantity: {resource.quantity}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminViewResources;
