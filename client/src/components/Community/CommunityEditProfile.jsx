import React from "react";
import { Link } from "react-router-dom";

function CommunityEditProfile() {
  const profile = {
    name: "Ravi Kumar",
    gender: "Male",
    address: "Green Valley, Kochi, Kerala",
    email: "ravi.gardener@example.com",
    phone: "9876543210",
    experience: "5 Years",
    availability: "Full Time",
    preferredCrops: "Tomatoes, Spinach, Herbs",
    skills: "Composting, Organic Farming, Pest Control",
    photo: "/profile-sample.jpg", // put your own image path
  };

  return (
    <div>
      <div className="profile-container">
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
              <h5 className="mb-3">🌿 Community Details</h5>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <strong>Full Name:</strong>
                  <p>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                  </p>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Organization Name:</strong>
                  <p>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                  </p>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Email:</strong>
                  <p>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                  </p>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Phone:</strong>
                  <p>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      required
                    />
                  </p>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Address:</strong>
                  <p>
                    {" "}
                    <textarea
                      className="form-control"
                      name="address"
                      rows="2"
                      required
                    ></textarea>
                  </p>
                </div>

                <div className="col-sm-6 mb-3">
                  <strong>Organization Type:</strong>
                  <p>
                    {" "}
                    <input
                      type="text"
                      className="form-control"
                      name="preferredCrops"
                    />
                  </p>
                </div>
              </div>

              <Link to={"/community/profileview"}>
                <button className="btn btn-outline-success mt-2">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityEditProfile;
