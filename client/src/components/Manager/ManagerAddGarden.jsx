import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "../../assets/css/GardenStyling.css";
import { Link } from "react-router-dom";
import ManagerHomeNav from "./ManagerHomeNav";

function ManagerAddGarden() {
  const [itemData, setItemData] = useState({
    image: null,
    imagePreview: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemData({
        ...itemData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div>
      <ManagerHomeNav />
      <div className="add-item-container ">
        <Card className="add-item-card">
          <Card.Header className="text-center bg-success text-white">
            <h3>Add New Garden</h3>
          </Card.Header>

          <Card.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <div className="image-upload-container mb-3">
                    {itemData.imagePreview ? (
                      <img
                        src={itemData.imagePreview}
                        alt="Item Preview"
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
                      placeholder="Enter Garden  name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Assigned Plot</Form.Label>
                    <Form.Select required>
                      <option value="">Select Category</option>
                      <option value="plants">Plants</option>
                      <option value="seeds">Seeds</option>
                      <option value="tools">Tools</option>
                      <option value="fertilizers">Fertilizers</option>
                      <option value="accessories">Accessories</option>
                    </Form.Select>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Days</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Days"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Reagion</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Reagion"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className="d-grid">
                <Link to={"/manager/view/garden"}>
                  <Button
                    variant="success"
                    type="submit"
                    className="submit-btn"
                  >
                    Add Item
                  </Button>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ManagerAddGarden;
