import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import CommunityResourceNav from './CommunityResourceNav';
import axios from '../../BaseAPI/axiosInstance';
import '../../assets/css/ResourseStyling.css';
import { useNavigate } from 'react-router-dom';

function CommunityResourseAdd() {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate=useNavigate()
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('resourceName', resourceName);
      formData.append('resourceType', resourceType);
      formData.append('quantity', quantity);
      formData.append('photo', image);

      const response = await axios.post('/resource/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
navigate("/community/resourseview")
      alert('Resource added successfully!');
      // Optionally, reset form
      setResourceName('');
      setResourceType('');
      setQuantity('');
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error('Error adding resource:', error);
      alert('Failed to add resource');
    }
  };

  return (
    <div>
      <CommunityResourceNav />
      <Container className="add-resource-container">
        <Card className="resource-card">
          <Card.Header className="bg-success text-white">
            <h3 className="text-center mb-0">Add New Resource</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div
                  className="image-preview-container"
                  onClick={() => document.getElementById('resourceImage').click()}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="preview-image" />
                  ) : (
                    <div className="upload-placeholder">
                      <FaUpload className="upload-icon" />
                      <p>Click to Upload Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="resourceImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Resource Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter resource title"
                  value={resourceName}
                  onChange={(e) => setResourceName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resource Type</Form.Label>
                <Form.Select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="gardening">Gardening Tips</option>
                  <option value="tools">Tools Guide</option>
                  <option value="seasonal">Seasonal Guide</option>
                  <option value="plants">Plant Care</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resource Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter resource quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 submit-btn"
              >
                Add Resource
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CommunityResourseAdd;
