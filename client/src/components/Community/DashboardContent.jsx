import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaUserTie, FaBox } from 'react-icons/fa';
import axios from '../../BaseAPI/axiosInstance'; // Adjust path based on your structure

const DashboardContent = () => {
  const [counts, setCounts] = useState({
    managers: 0,
    users: 0,
    gardens: 0,
    events: 0,
    resources: 0,
    organizations: 0,
  });

  const cardStyle = {
    backgroundColor: '#198754',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
  };

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      const [managerRes, userRes, orgRes, gardenRes, eventRes, resourceRes] = await Promise.all([
        axios.post("/manager/viewall"),
        axios.post("/gardner/viewallgardner"),
        axios.post("/organization/viewall"),
        axios.get("/plot/viewallgarden"),
        axios.get("/event/upcoming"),
        axios.get("/resource/all"),
      ]);

      setCounts({
        managers: managerRes.data?.length || 0,
        users: userRes.data?.length || 0,
        organizations: orgRes.data?.data?.length || 0,
        gardens: gardenRes.data?.data?.length || 0,
        events: eventRes.data?.length || 0,
        resources: resourceRes.data?.data?.length || 0,
      });
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    }
  };

  return (
    <div className="p-3">
      <div className="text-muted mb-2">Community / Dashboard</div>
      <h2 className="mb-4 text-success">Dashboard</h2>

      <Row className="mb-4">
        <Col md={6} lg={4} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Managers</h5>
              <div className="display-6">{counts.managers}</div>
              <FaUserTie size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>All Users</h5>
              <div className="display-6">{counts.users}</div>
              <FaUsers size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Organizations</h5>
              <div className="display-6">{counts.organizations}</div>
              <FaUserTie size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Gardens</h5>
              <div className="display-6">{counts.gardens}</div>
              <FaUserTie size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Events</h5>
              <div className="display-6">{counts.events}</div>
              <FaBox size={30} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Resources</h5>
              <div className="display-6">{counts.resources}</div>
              <FaBox size={30} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
