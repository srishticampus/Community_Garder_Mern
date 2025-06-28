import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "../../BaseAPI/axiosInstance"; // Adjust to your axios setup
import "../../assets/css/AdminDashCompStyle.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaBriefcase,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminViewManagers({ url }) {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    axios
      .get("/manager/viewall")
      .then((res) => {
const activeManagers = res.data.filter((manager) => manager.activestatus === true);
      setManagers(activeManagers);      })
      .catch((err) => {
        console.error("Error fetching managers:", err);
      });
  }, []);

  return (
    <div>
      <AdminNav />
      <Container className="manager-container">
        <h2 className="text-center mb-4">Organization Managers</h2>
        <Link to="/admin/view/managerrequest" className="btn btn-success">
          View Request
        </Link>
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
                      <FaBriefcase className="icon-small" />
                      year of experience &nbsp;
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
                      <span>
                        {manager.city},{manager.district}
                      </span>
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
