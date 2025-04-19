import React from 'react'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FaUsers, FaUserTie, FaBox, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../assets/css/Communitydashboard.css"
function CommunityDashboard() {
    const orderRequests = [
        {
          packageName: "Rose Enchantment Package",
          clientName: "sreekuttan H",
          contactNumber: "8086411169",
          date: "30-04-2024",
        },
        {
          packageName: "flower garden",
          clientName: "Prasnath llll",
          contactNumber: "9087346733",
          date: "03-05-2024",
        },
        {
          packageName: "Rose Enchantment Package",
          clientName: "Nincy mol",
          contactNumber: "7598628022",
          date: "16-10-2024",
        },
        {
          packageName: "flower garden",
          clientName: "llll",
          contactNumber: "",
          date: "29-10-2024",
        },
      ];
    
    
  return (
    <div>
            <div className="admin-dashboard">
      <div className="sidebar">
        <div className="brand">
          <FaHome className="brand-icon" />
          <span>Community Garden</span>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active"><FaHome /> Dashboard</li>
            <li><FaBox /><Button variant="success" className="action-btn">Add  Package</Button></li>
            <li><FaBox /><Button  variant="danger" className="action-btn"> View Packages</Button></li>
            <li><FaUsers /> View Orders</li>
            <li><FaUserTie /> Add New Staff</li>
          </ul>
          <Button className="logout-btn">LOGOUT</Button>
        </nav>
      </div>

      <div className="main-content">
        <div className="breadcrumb">
          Admin / Dashboard
        </div>
        <h1>Dashboard</h1>

        {/* Stats Cards */}
        <Row className="stats-cards">
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h2>Staffs</h2>
                <div className="stat-number">7</div>
                <FaUserTie className="stat-icon" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h2>All Users</h2>
                <div className="stat-number">77</div>
                <FaUsers className="stat-icon" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h2>All</h2>
                <div className="stat-number">7</div>
                <FaUserTie className="stat-icon" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h2>Packages</h2>
                <div className="stat-number">4</div>
                <FaBox className="stat-icon" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Orders Table */}
        <div className="orders-section">
          <h2>Recent Order Requests</h2>
          <Table responsive>
            <thead>
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
                    <Button variant="success" className="action-btn">ACCEPT</Button>
                    <Button variant="danger" className="action-btn">REJECT</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
 

    </div>
  )
}

export default CommunityDashboard

