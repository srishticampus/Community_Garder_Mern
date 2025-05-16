import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Container, Card } from 'react-bootstrap';
import axios from '../../BaseAPI/axiosInstance';
import ManagerHomeNav from './ManagerHomeNav';
import "../../assets/css/Manager.css";
import "../../assets/css/Edittask.css";

function ManagerEditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const managerId = localStorage.getItem("managerId");

  const [taskData, setTaskData] = useState({
    taskType: '',
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    taskPlot: ''
  });

  const [plots, setPlots] = useState([]);
  const [gardeners, setGardeners] = useState([]);

  // ✅ Fetch all plots for the manager
  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get(`/manager/${managerId}`);
        setPlots(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch plots:", error.message);
      }
    };
    fetchPlots();
  }, [managerId]);

  // ✅ Fetch the existing task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/viewa/task/${taskId}`);
        const task = res.data.data;
        setTaskData({
          taskType: task.taskType || '',
          title: task.title || '',
          description: task.description || '',
          assignedTo: task.assignedTo?._id || task.assignedTo || '',
          dueDate: task.dueDate?.split("T")[0] || '',
          taskPlot: task.taskPlot?._id || task.taskPlot || ''
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  // ✅ Fetch gardeners when taskPlot changes
  useEffect(() => {
    const fetchGardeners = async () => {
      if (taskData.taskPlot) {
        try {
          const res = await axios.get(`/view/assignGardeners/${taskData.taskPlot}`);
          setGardeners(res.data.data || []);
        } catch (error) {
          console.error("Failed to fetch gardeners:", error.message);
        }
      }
    };
    fetchGardeners();
  }, [taskData.taskPlot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/task/edit/${taskId}`, taskData);
      alert("Task updated successfully!");
      navigate("/manager/viewtask");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update task.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`/task/delete/${taskId}`);
        alert("Task deleted successfully!");
        navigate("/manager/viewtask");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete task.");
      }
    }
  };

  return (
    <div className="view-task-page">
      <ManagerHomeNav />
      <Container className="task-form-container">
        <Card className="task-form-card">
          <Card.Header className="text-center bg-success text-white">
            <h2>Edit Garden Task</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Task Type</Form.Label>
                <Form.Select
                  name="taskType"
                  value={taskData.taskType}
                  onChange={handleChange}
                  required
                >
                  <option value={taskData.taskType}>Select Task Type</option>
                  {["planting", "watering", "pruning", "fertilizing", "weeding", "maintenance"].map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label>Task Plot</Form.Label>
                <Form.Select
                  name="taskPlot"
                  value={taskData.taskPlot}
                  onChange={(e) => {
                    handleChange(e);
                    setTaskData(prev => ({
                      ...prev,
                      assignedTo: '' // reset gardener if plot changes
                    }));
                  }}
                  required
                >
                  <option value="">Select Plot</option>
                  {plots.map((plot) => (
                    <option key={plot._id} value={plot._id}>
                      {plot.plotName || `Plot ${plot._id}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group> */}

              {/* <Form.Group className="mb-3">
                <Form.Label>Assign To (Gardener)</Form.Label>
                <Form.Select
                  name="assignedTo"
                  value={taskData.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gardener</option>
                  {gardeners.map((gardener) => (
                    <option key={gardener._id} value={gardener._id}>
                      {gardener.fullName || gardener.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="success" type="submit">
                  Update Task
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete Task
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ManagerEditTask;
