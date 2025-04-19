import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LandingNav from './LandingNav';


function ManagerForgetPassword() {
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login form submitted:", formData);
      };
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
  return (
    <div>
          <div className="row justify-content-center">
      <LandingNav/>
      <div className="col-md-6 mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Forgot Password</h2>
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
              

              <Link to={"/manager/Login"}><button type="submit" className="btn btn-success w-100">
                Send 
              </button></Link>
            </form>
           
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ManagerForgetPassword
