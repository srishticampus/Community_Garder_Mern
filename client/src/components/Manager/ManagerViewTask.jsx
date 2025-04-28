import React from 'react'
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { useState } from 'react';
import "../../assets/css/TaskForm.css"
import ManagerHomeNav from './ManagerHomeNav';
import { Link } from 'react-router-dom';

function ManagerViewTask() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskType: 'planting',
      title: 'Plant Spring Flowers',
      description: 'Plant new seasonal flowers in the front garden',
      assignedTo: 'John Smith',
      dueDate: '2024-04-15',
      priority: 'high',
      status: 'pending'
    }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setShowEditModal(false);
  };


  return (
    <div>
          <div className="view-task-page">
      <ManagerHomeNav/>
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
                  <th>Task Type</th>
                  
                  <th>Description</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                 
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.taskType}</td>
                    
                    <td>{task.description}</td>
                    <td>{task.assignedTo}</td>
                    <td>{task.dueDate}</td>
                   
                    <td>
                      <Badge bg={task.status === 'completed' ? 'success' : 
                        task.status === 'pending' ? 'warning' : 'info'}>
                        {task.status}
                      </Badge>
                    </td>
                    <td>
                      <Link to={"/manager/edittask"} ><Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </Button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Task Modal */}
    </Container>


</div>
    </div>
  )
}

export default ManagerViewTask
