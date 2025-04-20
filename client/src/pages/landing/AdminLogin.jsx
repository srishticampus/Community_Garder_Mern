import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingNav from "./LandingNav";

function AdminLogin() {
  const navigate = useNavigate();

  const dummyEmail = "admin@gmail.com";
  const dummyPassword = "Admin@123";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email === dummyEmail && password === dummyPassword) {
      setSuccess("Login successful!");
      setError("");
      // Simulate successful login redirect
      setTimeout(() => {
        navigate("/admin/dashboard"); 
        localStorage.setItem("adminId","adminId123")
      }, 1000);
    } else {
      setError("Invalid email or password.");
      setSuccess("");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear messages while typing
    setError("");
    setSuccess("");
  };

  return (
    <div className="row justify-content-center">
      <LandingNav />
      <div className="col-md-6 mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Admin Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
