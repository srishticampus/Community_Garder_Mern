import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../BaseAPI/axiosInstance'
import LandingNav from './LandingNav'
import "../../assets/css/managerlogin.css"

function ManagerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axiosInstance.post("/manager/login", formData);

      if (res.data.success== true) {
        // Store manager token/ID in localStorage (if needed)
        localStorage.setItem("managerId", res.data.user.id);

        // Redirect to manager dashboard or homepage
        navigate("/manager/home");
      } else {
        setErrorMessage(res.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Something went wrong during login."
      );
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
                  <Link to={"/manager/Forgotpassword"}>Forgot Your Password?</Link>
                </p>

                <button type="submit" className="btn btn-success w-100">Login</button>
              </form>

              <p className="text-center mt-3">
                New User? <Link to={"/manager/Signup"}>Register Now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerLogin;
