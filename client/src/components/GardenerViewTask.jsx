import React from 'react'
import '../assets/css/garderner.css'
import GardenerHomeNav from './GardenerHomeNav'

const taskData = [
  {
    id: 1,
    gardenerName: 'Ravi Kumar',
    task: 'Water all tomato plants',
    date: '2025-04-10',
    status: 'Completed',
  },
  {
    id: 2,
    gardenerName: 'Priya Sharma',
    task: 'Add compost to Plot A1',
    date: '2025-04-11',
    status: 'Pending',
  },
  {
    id: 3,
    gardenerName: 'Arun Das',
    task: 'Weed Plot C3',
    date: '2025-04-09',
    status: 'In Progress',
  },
]

function GardenerViewTask() {
  return (
    <div className="view-task-page">
        <GardenerHomeNav/>
      {/* Header */}
      <div className="task-hero-section text-white text-center">
        <h1 className="mb-2">🌱 Assigned Gardening Tasks</h1>
        <p>Keep track of all assigned tasks for each gardener</p>
      </div>

      {/* Task Table */}
      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Gardener Name</th>
                <th>Task Description</th>
                <th>Date Assigned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.gardenerName}</td>
                  <td>{task.task}</td>
                  <td>{task.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.status === 'Completed'
                          ? 'bg-success'
                          : task.status === 'Pending'
                          ? 'bg-warning text-dark'
                          : 'bg-info'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
              {taskData.length === 0 && (
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
  )
}

export default GardenerViewTask
