
import React, { useEffect, useState } from 'react';
import axios from '../BaseAPI/axiosInstance';
import '../assets/css/garderner.css';
import GardenerHomeNav from './GardenerHomeNav';
import { Row } from 'react-bootstrap';

function GardenerViewTask() {
  const gardenerId = localStorage.getItem("gardenerId"); // ✅ from login
  const [taskData, setTaskData] = useState([]);

  // ✅ Fetch tasks for the logged-in gardener
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/task/gardener/${gardenerId}`);
        setTaskData(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchTasks();
  }, [gardenerId]);

  // ✅ Handle status update
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`/task/status/${taskId}`, { status: newStatus });
      // ✅ Refresh task list after update
      setTaskData(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      alert("Task status updated!");
    } catch (err) {
      console.error("Failed to update task status:", err);
      alert("Error updating status");
    }
  };

  return (
    <div className="view-task-page">
      <GardenerHomeNav />
      {/* Header */}
      <div className="task-hero-section text-white text-center">
        <h1 className="mb-2">🌱 Assigned Gardening Tasks</h1>
        <p>Keep track of all assigned tasks and update your progress</p>
      </div>

      {/* Task Table */}
      <div className="container mt-4" style={{minHeight:'80vh'}}>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskData.length > 0 ? (
                taskData.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate?.split("T")[0]}</td>
                    <td>
                      <select
                        className="form-select"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No tasks assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      
    </div>
  );

}

export default GardenerViewTask;
