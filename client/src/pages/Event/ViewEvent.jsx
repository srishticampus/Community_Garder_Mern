import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import "../../assets/css/EventView.css";
import ManagerHomeNav from '../../components/Manager/ManagerHomeNav';
import axiosInstance from '../../BaseAPI/axiosInstance';

function ViewEvent({url}) {
  const [events, setEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState("");
  const managerId = localStorage.getItem("managerId");

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get(`/event/manager/${managerId}`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    if (managerId) fetchEvents();
  }, [managerId]);

  const handleDelete = async (eventId) => {
    try {
      await axiosInstance.post(`/event/delete/${eventId}`);
      fetchEvents(); // Refresh events after delete
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const openEditModal = (event) => {
    setEditData(event);
    setShowEditModal(true);
    setError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const validateEditForm = () => {
    const { eventName, startDate, endDate, venue, description, eventType } = editData;
    if (!eventName || !startDate || !endDate || !venue || !description || !eventType) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleEditSubmit = async () => {
    if (!validateEditForm()) return;
    try {
      await axiosInstance.put(`/event/edit/${editData._id}`, editData);
      setShowEditModal(false);
      fetchEvents();
    } catch (err) {
      console.error("Edit error:", err);
      setError("Failed to update event.");
    }
  };

  return (
    <div>
      <ManagerHomeNav />
      <div className="container mt-5 pt-4">
        <h2 className="text-success text-center mb-4">🌿 Upcoming Events</h2>
        <div className="row">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="col-md-4 mb-4">
                <Card className="shadow-sm h-100 event-card">
                  <Card.Img
                  style={{height:"250px"}}
                    variant="top"
                    src={`${url}/${event.image.filename}`}
                    alt={event.eventName}
                  />
                  <Card.Body>
                    <Card.Title>{event.eventName}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <ul className="list-unstyled mb-2">
                      <li><strong>📅 Start Date:</strong> {event.startDate?.slice(0, 10)}</li>
                      <li><strong>📅 End Date:</strong> {event.endDate?.slice(0, 10)}</li>
                      <li><strong>📍 Venue:</strong> {event.venue}</li>
                      <li><strong>📌 Type:</strong> {event.eventType}</li>
                    </ul>
                    <Button variant="outline-primary" className="me-2" onClick={() => openEditModal(event)}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(event._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No events found.</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" name="eventName" value={editData.eventName || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={editData.startDate?.slice(0, 10) || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={editData.endDate?.slice(0, 10) || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control type="text" name="venue" value={editData.venue || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Type</Form.Label>
              <Form.Control type="text" name="eventType" value={editData.eventType || ''} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={editData.description || ''} onChange={handleEditChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="success" onClick={handleEditSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewEvent;
