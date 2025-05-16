import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, Button, Modal, Form } from 'react-bootstrap';
import "../../assets/css/GardenStyling.css";
import axios from '../../BaseAPI/axiosInstance';
import ManagerHomeNav from './ManagerHomeNav';


function ManagerViewGarden({ url }) {
  const [plots, setPlots] = useState([]);
  const [gardeners, setGardeners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGardener, setSelectedGardener] = useState('');
  const [selectedPlot, setSelectedPlot] = useState(null);

  const [editData, setEditData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plotRes = await axios.get(`/manager/${managerId}`);
        if (plotRes.data.success) {
          setPlots(plotRes.data.data);
        }

        const gardenerRes = await axios.post('/gardner/viewallgardner');
        if (gardenerRes) {
          setGardeners(gardenerRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, [managerId]);

  const handleAssignClick = (plot) => {
    setSelectedPlot(plot);
    setShowModal(true);
  };

  const handleAssignGardener = async () => {
    try {
      const res = await axios.put(`/assignGardeners/${selectedPlot._id}`, {
        gardenerId: selectedGardener
      });
      if (res.data.success) {
        setShowModal(false);
        setPlots(plots.map((plot) =>
          plot._id === selectedPlot._id
            ? { ...plot, assignedGardeners: [...plot.assignedGardeners, res.data.data] }
            : plot
        ));
      } else {
        alert("Failed to assign gardener");
      }
    } catch (err) {
      console.error("Error assigning gardener", err);
    }
  };

  const handleEditClick = (plot) => {
    setEditData({ ...plot });
    setShowEditModal(true);
  };

  const handleUpdatePlot = async () => {
    try {
      const formData = new FormData();
      formData.append('plotName', editData.plotName);
      formData.append('size', editData.size);
      formData.append('location', editData.location);
      if (editData.imageFile) {
        formData.append('image', editData.imageFile);
      }

      // ✅ Add headers for multipart/form-data
      const res = await axios.put(`/manager/edit/${editData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });

      if (res.data.success) {
        alert("Plot updated successfully");
        window.location.reload()
        setShowEditModal(false);
        setPlots(plots.map(plot =>
          plot._id === editData._id ? res.data.updatedPlot : plot
        ));
      }
    } catch (err) {
      console.error("Error updating plot:", err);
    }
  };

  const handleDeletePlot = async (plotId) => {
    if (window.confirm("Are you sure you want to delete this plot?")) {
      try {
        const res = await axios.delete(`/manager/delete/${plotId}`);
        if (res.data.success) {
          alert("Plot deleted successfully");
          setPlots(plots.filter(plot => plot._id !== plotId));
        }
      } catch (err) {
        console.error("Error deleting plot:", err);
      }
    }
  };

  return (
    <div>
      <ManagerHomeNav />
      <div className="view-items-container">
        <h2 className="headding-div text-center mb-4">Your Garden Plots</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {plots.map((plot) => (
            <Col key={plot._id}>
              <Card className="item-card">
                <div className="item-image-container">
                  <Card.Img
                    variant="top"
                    src={plot.image ? `${url}/${plot.image.filename}` : "/images/placeholder.jpg"}
                    className="item-image"
                  />
                  <Badge bg="info" className="category-badge">
                    Assigned Gardeners: {plot.assignedGardeners.length}
                  </Badge>
                </div>

                <Card.Body>
                  <div className="item-header">
                    <Card.Title>{plot.plotName}</Card.Title>
                    <span className="price">Size: {plot.size}</span>
                  </div>
                  <Card.Text className="description">
                    📍 Location: {plot.location}
                  </Card.Text>
                  <div className="d-flex justify-content-between flex-wrap gap-2 mt-2">
                    <Button variant="primary" onClick={() => handleAssignClick(plot)}>+ Assign Gardener</Button>
                    <Button variant="warning" onClick={() => handleEditClick(plot)}>✏️ Edit</Button>
                    <Button variant="danger" onClick={() => handleDeletePlot(plot._id)}>🗑️ Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal: Assign Gardener */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Gardener to Plot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="gardenerSelect">
              <Form.Label>Select Gardener</Form.Label>
              <Form.Control
                as="select"
                value={selectedGardener}
                onChange={(e) => setSelectedGardener(e.target.value)}
                required
              >
                <option value="">Select Gardener</option>
                {gardeners.map((gardener) => (
                  <option key={gardener._id} value={gardener._id}>
                    {gardener.fullName} - {gardener.skills} ({gardener.availabletime})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAssignGardener}>Assign</Button>
        </Modal.Footer>
      </Modal>
      {/* Modal: Edit Plot */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Garden Plot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Plot Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.plotName || ""}
                onChange={(e) => setEditData({ ...editData, plotName: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                value={editData.size || ""}
                onChange={(e) => setEditData({ ...editData, size: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={editData.location || ""}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image (optional)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setEditData({ ...editData, imageFile: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleUpdatePlot}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManagerViewGarden;
