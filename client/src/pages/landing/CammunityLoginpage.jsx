import React, { useState } from "react";
import LandingNav from "./LandingNav";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseAPI/axiosInstance"; // Use your configured Axios instance

function CammunityLoginpage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axiosInstance.post("/organization/login", formData);

      if (res.data.success) {
        localStorage.setItem("orgId", res.data.data.id); // optional

        // Redirect after successful login
        navigate("/Community/Dashboard");
      } else {
        setErrorMessage(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="row justify-content-center">
        <LandingNav />
        <div className="col-md-6 mt-5 pt-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
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
                  <label htmlFor="password" className="form-label">Password</label>
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

                <p className="text-center mt-3">
                  <Link to={"/Community/Forgotpassword"}>Forgot Your Password?</Link>
                </p>

                <button type="submit" className="btn btn-success w-100">
                  Login
                </button>
              </form>

              <p className="text-center mt-3">
                New User? <Link to={"/Community/Signup"}>Register Now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CammunityLoginpage;
