import React from 'react'
import ManagerHomeNav from './ManagerHomeNav'
import { Link } from 'react-router-dom'

function ManagerEditProfile() {
    const profile = {
        name: 'Ravi Kumar',
        gender: 'Male',
        address: 'Green Valley, Kochi, Kerala',
        email: 'ravi.gardener@example.com',
        phone: '9876543210',
        experience: '5 Years',
        availability: 'Full Time',
        preferredCrops: 'Tomatoes, Spinach, Herbs',
        skills: 'Composting, Organic Farming, Pest Control',
        photo: '/profile-sample.jpg' // put your own image path
      }
    
  return (
    <div>
            <div className="profile-container">
              <ManagerHomeNav/>
            <div className="profile-card shadow-lg p-4 bg-white rounded">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={profile.photo}
                    alt="Gardener"
                    className="profile-img rounded-circle"
                  />
                  <h4 className="mt-3">{profile.name}</h4>
                  <p className="text-muted">{profile.gender}</p>
                </div>
      
                <div className="col-md-8">
                  <h5 className="mb-3">🌿 Manager Details</h5>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <strong>Email:</strong>
                      <p> <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    
                    /></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Phone:</strong>
                      <p><input type="number" className="form-control" name="phone" required  /></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Address:</strong>
                      <p> <textarea className="form-control" name="address" rows="2" required></textarea></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Experience:</strong>
                      <p><input type="text" className="form-control" name="experience"  /></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Availability:</strong>
                      <p>  <select className="form-select" name="availability" required >
                    <option value="">Select availability</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Weekends">Weekends</option>
                  </select></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Preferred Crops:</strong>
                      <p> <input type="text" className="form-control" name="preferredCrops" /></p>
                    </div>
                    <div className="col-12 mb-3">
                      <strong>Skills:</strong>
                      <p> <input type="text" className="form-control" name="skills"  /></p>
                    </div>
                  </div>
      
                  <Link to={"/manager/edit/profile"}><button className="btn btn-outline-success mt-2">Edit Profile</button></Link>
                </div>
              </div>
            </div>
          </div>
      
    </div>
  )
}

export default ManagerEditProfile
