import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import "../../assets/css/TaskForm.css";
import ManagerHomeNav from './ManagerHomeNav';
import { Link } from 'react-router-dom';
import axios from '../../BaseAPI/axiosInstance';

function ManagerViewTask() {
  const [tasks, setTasks] = useState([]);
  const managerId = localStorage.getItem("managerId"); // assuming you're storing it here

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/task/manager/${managerId}`);
        setTasks(response.data.data); // make sure the backend returns `data`
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [managerId]);

  return (
    <div className="view-task-page">
      <ManagerHomeNav />
      <Container className="view-tasks-container">
        <Card className="tasks-card">
          <Card.Header className="text-center bg-success text-white">
            <h2>Garden Tasks Overview</h2>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover className="tasks-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Assigned To</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.gardenerId.fullName || "Unknown"}</td> {/* update based on your data */}
                      <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td>
                        <Badge bg={
                          task.status === 'completed' ? 'success' :
                          task.status === 'pending' ? 'warning' : 'info'
                        }>
                          {task.status}
                        </Badge>
                      </td>
                      <td>
                        <Link to={`/manager/edittask/${task._id}`}>
                          <Button variant="outline-primary" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ManagerViewTask;
