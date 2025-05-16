import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "../../assets/css/EventStyle.css";
import ManagerHomeNav from "../../components/Manager/ManagerHomeNav";
import axiosInstance from "../../BaseAPI/axiosInstance";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventType: "",
    venue: "",
    description: "",
    image: null,
    imagePreview: null,
    startDate: "",
    endDate: "",
  });
const navigate=useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({
        ...eventData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      eventName,
      eventType,
      venue,
      description,
      image,
      startDate,
      endDate,
    } = eventData;

    // Basic empty checks
    if (
      !eventName ||
      !eventType ||
      !venue ||
      !description ||
      !image ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill in all fields including the image.");
      return;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(0, 0, 0, 0);

    if (start <= today) {
      alert("Start date must be a future date.");
      return;
    }

    if (end <= start) {
      alert("End date must be after start date.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("eventType", eventType);
      formData.append("venue", venue);
      formData.append("description", description);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("image", image);
      formData.append("managerId", localStorage.getItem("managerId"));

      const res = await axiosInstance.post("/addevent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event created successfully!");
      console.log("Response:", res.data);
navigate("/manager/view/event")
      // Optionally reset the form
      setEventData({
        eventName: "",
        eventType: "",
        venue: "",
        description: "",
        image: null,
        imagePreview: null,
        startDate: "",
        endDate: "",
      });

    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <ManagerHomeNav />
      <div className="add-event-container">
        <Card className="add-event-card">
          <Card.Header className="text-center bg-success text-white">
            <h3>Create New Event</h3>
          </Card.Header>

          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <div className="image-upload-container mb-3">
                    {eventData.imagePreview ? (
                      <img
                        src={eventData.imagePreview}
                        alt="Event Preview"
                        className="image-preview"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <i className="bi bi-image"></i>
                        <p>Upload Event Image</p>
                      </div>
                    )}
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-input"
                      required
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter event name"
                      value={eventData.eventName}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          eventName: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Select
                      value={eventData.eventType}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          eventType: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Event Type</option>
                      <option value="Harvest Festival">Harvest Festival</option>
                      <option value="Training">Training</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Venue</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter venue"
                      value={eventData.venue}
                      onChange={(e) =>
                        setEventData({ ...eventData, venue: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      min={minDate}
                      value={eventData.startDate}
                      onChange={(e) =>
                        setEventData({ ...eventData, startDate: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      min={minDate}
                      value={eventData.endDate}
                      onChange={(e) =>
                        setEventData({ ...eventData, endDate: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter event description"
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="success" type="submit" className="submit-btn">
                  Create Event
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AddEvent;
