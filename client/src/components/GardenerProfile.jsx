import React from 'react'
import '../assets/css/garderner.css'
import GardenerHomeNav from './GardenerHomeNav'

const GardenerProfile = () => {
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
    <div className="profile-container">
        <GardenerHomeNav/>
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
            <h5 className="mb-3">🌿 Gardener Details</h5>
            <div className="row">
              <div className="col-sm-6 mb-3">
                <strong>Email:</strong>
                <p>{profile.email}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <strong>Phone:</strong>
                <p>{profile.phone}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <strong>Address:</strong>
                <p>{profile.address}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <strong>Experience:</strong>
                <p>{profile.experience}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <strong>Availability:</strong>
                <p>{profile.availability}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <strong>Preferred Crops:</strong>
                <p>{profile.preferredCrops}</p>
              </div>
              <div className="col-12 mb-3">
                <strong>Skills:</strong>
                <p>{profile.skills}</p>
              </div>
            </div>

            <button className="btn btn-outline-success mt-2">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GardenerProfile
