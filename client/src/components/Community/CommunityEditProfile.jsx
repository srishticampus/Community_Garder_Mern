import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommunitySidebar from "./CommunitySideBar";
import axiosInstance from "../../BaseAPI/axiosInstance";

function CommunityEditProfile({ url }) {
  const [profile, setProfile] = useState({
    organizationName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    organizationtype: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Fetch organization data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("orgId");
        const response = await axiosInstance.post(`/organization/viewone/${id}`);
        const data = response.data;

        setProfile({
          organizationName: data.organizationName,
          emailId: data.emailId,
          phoneNo: data.phoneNo,
          address: data.address,
          organizationtype: data.organizationtype,
          photo: data.photo,
        });

        if (data.photo?.filename) {
          setPreview(`${url}/${data.photo.filename}`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [url]);

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile((prev) => ({ ...prev, photo: file }));
    setPreview(URL.createObjectURL(file));
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("orgId");
      const formData = new FormData();
      formData.append("organizationName", profile.organizationName);
      formData.append("emailId", profile.emailId);
      formData.append("phoneNo", profile.phoneNo);
      formData.append("address", profile.address);
      formData.append("organizationtype", profile.organizationtype);
      if (profile.photo instanceof File) {
        formData.append("photo", profile.photo);
      }

      await axiosInstance.post(`/organization/profileedit/${id}`, formData);
      alert("Profile updated successfully!");
      navigate("/community/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <CommunitySidebar />
        </div>

        {/* Edit Profile Form */}
        <div className="col-md-9 p-4">
          <div className="text-muted mb-2">Community / Edit Profile</div>
          <h2 className="mb-4 text-success">Edit Profile</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="profile-card shadow-lg p-4 bg-white rounded">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src={preview || "/default.jpg"}
                    alt="Profile"
                    className="profile-img rounded-circle"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-8">
                  <h5 className="mb-3 text-success">🌿 Community Details</h5>
                  <div className="row">
                    
                    <div className="col-sm-6 mb-3">
                      <strong>Organization Name:</strong>
                      <input
                        type="text"
                        className="form-control"
                        name="organizationName"
                        value={profile.organizationName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Email:</strong>
                      <input
                        type="email"
                        className="form-control"
                        name="emailId"
                        value={profile.emailId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Phone:</strong>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNo"
                        value={profile.phoneNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Address:</strong>
                      <textarea
                        className="form-control"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        rows="2"
                        required
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <strong>Organization Type:</strong>
                      <input
                        type="text"
                        className="form-control"
                        name="organizationtype"
                        value={profile.organizationtype}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success mt-3">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommunityEditProfile;
