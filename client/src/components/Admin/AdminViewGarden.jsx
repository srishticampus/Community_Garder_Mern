import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, Button, Modal, Form } from 'react-bootstrap';
import "../../assets/css/GardenStyling.css";
import axios from '../../BaseAPI/axiosInstance';
import AdminNav from './AdminNav';


function AdminViewGarden({ url }) {
  const [plots, setPlots] = useState([]);
  const [gardeners, setGardeners] = useState([]);


  // const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plotRes = await axios.get(`/plot/viewallgarden`);
        if (plotRes.data.success) {
          setPlots(plotRes.data.data);
        }

        const gardenerRes = await axios.post('/gardner/viewallgardner');
        if (gardenerRes) {
          setGardeners(gardenerRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);


 

  return (
    <div>
      <AdminNav />
      <div className="view-items-container">
        <h2 className="headding-div text-center mb-4"> Garden Plots</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {plots.map((plot) => (
            <Col key={plot._id}>
              <Card className="item-card">
                <div className="item-image-container">
                  <Card.Img
                    variant="top"
                    src={plot.image ? `${url}/${plot.image.filename}` : "/images/placeholder.jpg"}
                    className="item-image"
                  />
                  <Badge bg="info" className="category-badge">
                    Assigned Gardeners: {plot.assignedGardeners.length}
                  </Badge>
                </div>

                <Card.Body>
                  <div className="item-header">
                    <Card.Title>{plot.plotName}</Card.Title>
                    <span className="price">Size: {plot.size}</span>
                  </div>
                  <Card.Text className="description">
                    📍 Location: {plot.location}
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>      
      
    </div>
  );
}

export default AdminViewGarden;
