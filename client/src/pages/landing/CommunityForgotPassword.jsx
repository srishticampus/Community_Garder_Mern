import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../BaseAPI/axiosInstance"; // Adjust path as needed
import LandingNav from "./LandingNav";

function CommunityForgotPassword() {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/organization/forgot-password", formData);
      if (res.data.message === "Password updated successfully") {
        alert("Password has been updated!");
        navigate("/Cammunity/Login"); // navigate to login
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      alert(err?.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <LandingNav />
        <div className="col-md-6 mt-5 pt-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityForgotPassword;
