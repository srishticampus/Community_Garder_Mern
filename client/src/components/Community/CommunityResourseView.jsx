import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col, Badge } from "react-bootstrap";
import { FaList, FaHashtag } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from "../../BaseAPI/axiosInstance";

import "../../assets/css/ResourseStyling.css";
import CommunityResourceNav from "./CommunityResourceNav";

function CommunityResourseView({ url }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("/resource/all");
      setResources(response.data.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`/resource/delete/${id}`);
        setResources(resources.filter(resource => resource._id !== id));
      } catch (error) {
        console.error("Error deleting resource:", error);
      }
    }
  };

  return (
    <div>
      <CommunityResourceNav />
      <Container className="resource-view-container">
        <h2 className="text-center mb-4">Available Resources</h2>
        <Row>
          {resources.map((resource) => (
            <Col md={6} lg={4} key={resource._id} className="mb-4">
              <Card className="resource-card h-100">
                <div className="resource-image-wrapper">
                  <img 
                    src={`${url}/${resource.photo.filename}`} 
                    alt={resource.resourceName}
                    className="resource-image"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="resource-title">{resource.resourceName}</Card.Title>
                  <div className="resource-info">
                    <div className="info-item">
                      <FaList className="info-icon" />
                      <Badge bg="success">{resource.resourceType}</Badge>
                    </div>
                    <div className="info-item">
                      <FaHashtag className="info-icon" />
                      <span>Quantity: {resource.quantity}</span>
                    </div>
                  </div>
                  <div className="resource-actions mt-3">
                    <Link to={`/community/resource/edit/${resource._id}`}>
                      <Button variant="success" className="me-2 w-100 submit-btn">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="w-100 submit-btn"
                      onClick={() => handleDelete(resource._id)}
                    >
                      Delete
                    </Button>
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

export default CommunityResourseView;
