import React, { useState }  from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import ManagerHomeNav from './ManagerHomeNav';
import "../../assets/css/Manager.css"
import "../../assets/css/Edittask.css"
import { Container, Card, Table, Badge  } from 'react-bootstrap';


function ManagerEditTask() {
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
          <div className="view-task-page">
      <ManagerHomeNav/>
                <Container className="task-form-container">
            <Card className="task-form-card">
              <Card.Header className="text-center bg-success text-white">
                <h2>Create New Garden Task</h2>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Task Type</Form.Label>
                    <Form.Select 
                      
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
                      
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-3">
                    <Form.Label>Assign To</Form.Label>
                    <Form.Select
                     
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
                     
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-3">
                    <Form.Label>Task Plot</Form.Label>
                    <Form.Select
                     
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </Form.Group>
      
                  <div className="d-grid gap-2">
                    <Button variant="success" type="submit" size="lg">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
      
      
     
</div>
    </div>
  )
}

export default ManagerEditTask
