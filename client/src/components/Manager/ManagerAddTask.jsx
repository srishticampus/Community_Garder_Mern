import React, { useState, useEffect } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import axios from '../../BaseAPI/axiosInstance';
import "../../assets/css/TaskForm.css";
import ManagerHomeNav from './ManagerHomeNav';
import { useNavigate } from 'react-router-dom';

function ManagerAddTask() {
  const [taskData, setTaskData] = useState({
    title: '',
    taskType: '', // ✅ Added taskType
    description: '',
    dueDate: '',
    gardenerId: '',
    plotId: '',
    status: 'Pending',
  });

  const [plots, setPlots] = useState([]);
  const [gardeners, setGardeners] = useState([]);

  const managerId = localStorage.getItem("managerId");

  // ✅ Fetch Plots Assigned to This Manager
  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get(`/manager/${managerId}`);
        setPlots(res.data.data); // Make sure the API returns assigned plots
      } catch (error) {
        console.error("Failed to fetch plots:", error.message);
      }
    };
    fetchPlots();
  }, [managerId]);

  // ✅ Fetch Gardeners for Selected Plot
  useEffect(() => {
    const fetchGardeners = async () => {
      if (taskData.plotId) {
        try {
          const res = await axios.get(`/view/assignGardeners/${taskData.plotId}`);
          setGardeners(res.data.data);
        } catch (error) {
          console.error("Failed to fetch gardeners:", error.message);
        }
      }
    };
    fetchGardeners();
  }, [taskData.plotId]);
const navigate=useNavigate()
  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...taskData,
      createdBy: managerId,
    };
    try {
      const res = await axios.post("/createtask", finalData);
      alert("Task Created Successfully!");
      navigate("/manager/viewtask")
      console.log(res.data);
      // Optionally reset form
      setTaskData({
        title: '',
        taskType: '',
        description: '',
        dueDate: '',
        gardenerId: '',
        plotId: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error("Task creation failed:", error.response?.data || error.message);
      alert("Failed to create task");
    }
  };

  return (
    <div>
      <ManagerHomeNav />
      <Container className="task-form-container">
        <Card className="task-form-card">
          <Card.Header className="text-center bg-success" id='headding'>
            <h2>Create New Garden Task</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Task Type</Form.Label>
                <Form.Select
                  name="taskType"
                  value={taskData.taskType}
                  onChange={(e) => setTaskData({ ...taskData, taskType: e.target.value })}
                  required
                >
                  <option value="">Select Task Type</option>
                  <option value="planting">Planting</option>
                  <option value="watering">Watering</option>
                  <option value="pruning">Pruning</option>
                  <option value="fertilizing">Fertilizing</option>
                  <option value="weeding">Weeding</option>
                  <option value="maintenance">General Maintenance</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Plot</Form.Label>
                <Form.Select
                  value={taskData.plotId}
                  onChange={(e) => setTaskData({ ...taskData, plotId: e.target.value, gardenerId: '' })}
                  required
                >
                  <option value="">Select Plot</option>
                  {plots.map((plot) => (
                    <option key={plot._id} value={plot._id}>
                      {plot.plotName || `Plot ${plot._id}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Assign to Gardener</Form.Label>
                <Form.Select
                  value={taskData.gardenerId}
                  onChange={(e) => setTaskData({ ...taskData, gardenerId: e.target.value })}
                  required
                  disabled={!taskData.plotId}
                >
                  <option value="">Select Gardener</option>
                  {gardeners.map((gardener) => (
                    <option key={gardener._id} value={gardener._id}>
                      {gardener.fullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="success" type="submit" size="lg">
                  Create Task
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ManagerAddTask;
