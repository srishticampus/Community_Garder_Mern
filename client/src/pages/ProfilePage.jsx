import { useState } from 'react'

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    gardeningExperience: 'intermediate',
    interests: 'Vegetables, Herbs',
    plotNumber: 'A-12',
    joinDate: '2024-01-15'
  })

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Profile Information</h3>
            <div className="mb-3">
              <strong>Name:</strong> {profile.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {profile.email}
            </div>
            <div className="mb-3">
              <strong>Experience Level:</strong> {profile.gardeningExperience}
            </div>
            <div className="mb-3">
              <strong>Interests:</strong> {profile.interests}
            </div>
            <button className="btn btn-success">Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">My Garden Plot</h3>
            <div className="mb-3">
              <strong>Plot Number:</strong> {profile.plotNumber}
            </div>
            <div className="mb-3">
              <strong>Member Since:</strong> {profile.joinDate}
            </div>
            <div className="mb-3">
              <h4>Current Plants</h4>
              <ul className="list-group">
                <li className="list-group-item">Tomatoes</li>
                <li className="list-group-item">Basil</li>
                <li className="list-group-item">Bell Peppers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Upcoming Events</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <h5>Spring Planting Workshop</h5>
                <p className="mb-1">Date: March 15, 2024</p>
                <p className="mb-0">Location: Community Garden - Main Area</p>
              </li>
              <li className="list-group-item">
                <h5>Tool Sharing Day</h5>
                <p className="mb-1">Date: March 20, 2024</p>
                <p className="mb-0">Location: Garden Tool Shed</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage