import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LandingNav from './LandingNav';

function ManagerForgetPassword() {
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/manager/forgot-password', formData);
      console.log('Response:', response.data);
      setSuccess('Password updated successfully!');
      setError('');
      setTimeout(() => {
        navigate('/manager/login');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong.');
      setSuccess('');
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
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
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
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerForgetPassword;
