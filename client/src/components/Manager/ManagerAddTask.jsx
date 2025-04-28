import React, {useState} from 'react'
import { Card, Form, Container } from 'react-bootstrap'
import {  Button } from 'react-bootstrap';
import "../../assets/css/TaskForm.css"
import ManagerHomeNav from './ManagerHomeNav';

// import { useNavigate } from 'react-router-dom'

function ManagerAddTask() {
  const [taskData, setTaskData] = useState({
    taskType: '',
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task Data:', taskData);
    // Add your form submission logic here
  };

  return (
    <div>
    <ManagerHomeNav/>
          <Container className="task-form-container">
      <Card className="task-form-card">
        <Card.Header className="text-center bg-success " id='headding'>
          <h2  >Create New Garden Task</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Type</Form.Label>
              <Form.Select 
                value={taskData.taskType}
                onChange={(e) => setTaskData({...taskData, taskType: e.target.value})}
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
                placeholder="Enter task description"
                value={taskData.description}
                onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Select
                value={taskData.priority}
                onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control 
                type="date"
                value={taskData.dueDate}
                onChange={(e) => setTaskData({...taskData, dueDate: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Plot</Form.Label>
              <Form.Select
                value={taskData.priority}
                onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
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
  )
}

export default ManagerAddTask
