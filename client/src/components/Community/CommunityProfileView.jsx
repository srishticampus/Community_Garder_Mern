import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommunitySidebar from "./CommunitySideBar"; // Ensure path is correct
import axiosInstance from "../../BaseAPI/axiosInstance";

function CommunityProfileView({url}) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const id = localStorage.getItem("orgId");
        const response = await axiosInstance.post(
          `/organization/viewone/${id}`
        );
        console.log(response);
        
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching organization profile:", error);
      }
    };

    fetchOrganization();
  }, []);

  
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <CommunitySidebar />
        </div>

        {/* Profile Content */}
        <div className="col-md-9 p-4">
          <div className="text-muted mb-2">Community / Profile</div>
          <h2 className="mb-4 text-success">Profile View</h2>

          <div className="profile-card shadow-lg p-4 bg-white rounded">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={`${url}/${profile?.photo.filename}`}
                  alt="Organization"
                  className="profile-img rounded-circle"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <h4 className="mt-3">{profile?.fullName}</h4>
                <p className="text-muted">{profile?.gender}</p>
              </div>

              <div className="col-md-8">
                <h5 className="mb-3 text-success">🌿 Community Details</h5>
                <div className="row">
                  {/* <div className="col-sm-6 mb-3">
                    <strong>Full Name:</strong>
                    <p>{profile?.fullName}</p>
                  </div> */}
                  <div className="col-sm-6 mb-3">
                    <strong>Organization Name:</strong>
                    <p>{profile?.organizationName}</p>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <strong>Organization Type:</strong>
                    <p>{profile?.organizationtype}</p>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <strong>Email:</strong>
                    <p>{profile?.emailId}</p>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <strong>Phone:</strong>
                    <p>{profile?.phoneNo}</p>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <strong>Address:</strong>
                    <p>{profile?.address}</p>
                  </div>
                  
                </div>
                <Link to={"/community/editprofile"}>
                  <button className="btn btn-outline-success mt-3">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityProfileView;
