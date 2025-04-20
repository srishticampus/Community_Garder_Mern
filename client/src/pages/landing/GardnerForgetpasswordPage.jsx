import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingNav from "./LandingNav";
import axios from "axios";
import axiosInstance from "../../BaseAPI/axiosInstance";

function GardnerForgetpasswordPage() {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/gardner/forgotpassword", formData);
      if (res.data.message === "Password updated successfully") {
        alert("Password updated! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Failed to reset password. Make sure your email is correct.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row justify-content-center">
      <LandingNav />
      <div className="col-md-6 mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email address
                </label>
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
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
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
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GardnerForgetpasswordPage;
