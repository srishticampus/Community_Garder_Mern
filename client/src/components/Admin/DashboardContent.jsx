import React from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FaUsers, FaUserTie, FaBox } from 'react-icons/fa';

const DashboardContent = () => {
  const orderRequests = [
    {
      packageName: "Rose Enchantment Package",
      clientName: "Sreekuttan H",
      contactNumber: "8086411169",
      date: "30-04-2024",
    },
    {
      packageName: "Flower Garden",
      clientName: "Prasnath L",
      contactNumber: "9087346733",
      date: "03-05-2024",
    },
    {
      packageName: "Rose Enchantment Package",
      clientName: "Nincy Mol",
      contactNumber: "7598628022",
      date: "16-10-2024",
    },
    {
      packageName: "Flower Garden",
      clientName: "LLLL",
      contactNumber: "",
      date: "29-10-2024",
    },
  ];

  const cardStyle = {
    backgroundColor: '#198754',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
  };

  return (
    <div className="p-3">
      <div className="text-muted mb-2">Admin / Dashboard</div>
      <h2 className="mb-4 text-success">Dashboard</h2>

      <Row className="mb-4">
        <Col md={6} lg={3} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Staffs</h5>
              <div className="display-6">7</div>
              <FaUserTie size={30} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>All Users</h5>
              <div className="display-6">77</div>
              <FaUsers size={30} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>All</h5>
              <div className="display-6">7</div>
              <FaUserTie size={30} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-3">
          <Card style={cardStyle} className="text-center shadow">
            <Card.Body>
              <h5>Packages</h5>
              <div className="display-6">4</div>
              <FaBox size={30} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div>
        <h4 className="text-success">Recent Order Requests</h4>
        <Table responsive bordered hover className="shadow">
          <thead style={{ backgroundColor: '#28a745', color: 'white' }}>
            <tr>
              <th>PACKAGE NAME</th>
              <th>CLIENT NAME</th>
              <th>CONTACT NUMBER</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orderRequests.map((order, index) => (
              <tr key={index}>
                <td>{order.packageName}</td>
                <td>{order.clientName}</td>
                <td>{order.contactNumber}</td>
                <td>{order.date}</td>
                <td>
                  <Button style={{ backgroundColor: '#198754', border: 'none' }} size="sm" className="me-2">
                    ACCEPT
                  </Button>
                  <Button variant="danger" size="sm">REJECT</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardContent;
