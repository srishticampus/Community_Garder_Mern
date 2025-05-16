import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FaEdit, FaImage } from "react-icons/fa";
import "../../assets/css/ResourseStyling.css";
import CommunityResourceNav from "./CommunityResourceNav";
import axios from "../../BaseAPI/axiosInstance";

function CommunityEditResource({ url }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resourceName: "",
    resourceType: "",
    quantity: ""
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fetch existing resource data
  useEffect(() => {
    fetchResourceData();
  }, []);

  const fetchResourceData = async () => {
    try {
      const response = await axios.get(`/resource/${id}`);
      const data = response.data.data;

      setFormData({
        resourceName: data.resourceName,
        resourceType: data.resourceType,
        quantity: data.quantity
      });

      if (data.photo?.filename) {
        setPreview(`${url}/${data.photo.filename}`);
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      const updateForm = new FormData();
      updateForm.append("resourceName", formData.resourceName);
      updateForm.append("resourceType", formData.resourceType);
      updateForm.append("quantity", formData.quantity);

      // Append only if new image selected
      if (image) {
        updateForm.append("photo", image); // must match multer field name
      }

      const res = await axios.put(`/resource/update/${id}`, updateForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Resource updated successfully!");
        navigate("/community/resourseview");
      }
    } catch (error) {
      console.error("Update failed:", error.response || error);
      alert("Failed to update resource.");
    }
  };

  return (
    <div>
      <CommunityResourceNav />
      <Container className="edit-resource-container">
        <Card className="edit-card">
          <Card.Header className="bg-success text-white">
            <h3 className="text-center mb-0">
              <FaEdit className="me-2" />
              Edit Resource
            </h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="image-edit-section">
                <div className="current-image-container">
                  <img
                    src={preview}
                    alt="Resource"
                    className="current-image"
                  />
                  <div className="image-overlay">
                    <label htmlFor="resourceImage" className="change-image-btn">
                      <FaImage className="me-2" />
                      Change Image
                    </label>
                    <input
                      type="file"
                      id="resourceImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  </div>
                </div>
              </div>

              <Form.Group className="">
                <Form.Label>Resource Name</Form.Label>
                <Form.Control
                  type="text"
                  name="resourceName"
                  value={formData.resourceName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="">
                <Form.Label>Resource Type</Form.Label>
                <Form.Select
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="gardening">Gardening Tips</option>
                  <option value="tools">Tools Guide</option>
                  <option value="seasonal">Seasonal Guide</option>
                  <option value="plants">Plant Care</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="">
                <Form.Label>Resource Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="button-group text-center">
                <Button variant="success" type="submit">
                  Update Resource
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CommunityEditResource;
