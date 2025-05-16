import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "../../assets/css/GardenStyling.css";
import axiosInstance from "../../BaseAPI/axiosInstance";
import { useNavigate } from "react-router-dom";
import ManagerHomeNav from "./ManagerHomeNav";

function ManagerAddGarden() {
  let a=localStorage.getItem("managerId")
  const [formData, setFormData] = useState({
    plotName: "",
    location: "",
    size: "",
    managerId: a, // Replace with actual managerId from context or auth
  });

  const [itemData, setItemData] = useState({
    image: null,
    imagePreview: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemData({
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("plotName", formData.plotName);
    form.append("location", formData.location);
    form.append("size", formData.size);
    form.append("managerId", formData.managerId);
    if (itemData.image) {
      form.append("image", itemData.image);
    }

    try {
      const res = await axiosInstance.post("/createploat", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Garden added successfully!");
        navigate("/manager/view/garden");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add garden");
    }
  };

  return (
    <div>
      <ManagerHomeNav />
      <div className="add-item-container">
        <Card className="add-item-card">
          <Card.Header className="text-center bg-success text-white">
            <h3>Add New Garden</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <div className="image-upload-container mb-3">
                    {itemData.imagePreview ? (
                      <img
                        src={itemData.imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <i className="bi bi-cloud-upload"></i>
                        <p>Click to upload image</p>
                      </div>
                    )}
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-input"
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Garden Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="plotName"
                      placeholder="Enter Garden Name"
                      value={formData.plotName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Enter Location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      type="text"
                      name="size"
                      placeholder="Enter Size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid">

                <Button variant="success" type="submit" className="submit-btn">
                  Add Garden
                </Button>

              </div>
              
               
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ManagerAddGarden;
