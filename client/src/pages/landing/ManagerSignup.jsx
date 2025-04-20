import React, { useState } from 'react';
import LandingNav from './LandingNav';
import { Link, useNavigate } from 'react-router-dom';
import gardenImg from "../../assets/gardener.jpg";
import "../../assets/css/managersignup.css";
import axiosInstance from '../../BaseAPI/axiosInstance';

function ManagerSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    profilePic: null,
    mobileNo: '',
    emailId: '',
    district: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    yearofexperience: '',
    agreeTerms: false
  });
const nav=useNavigate()
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    const newValue = type === 'checkbox'
      ? checked
      : type === 'file'
      ? files[0]
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Field-specific validation
    const newErrors = { ...errors };

    if (name === "mobileNo") {
      const phonePattern = /^\d{0,10}$/;
      if (phonePattern.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, mobileNo: value.length === 10 ? "" : "Phone number must be exactly 10 digits." }));
      }
      return;
    }
    
    if (name === "pincode") {
      const pincodePattern = /^\d{0,6}$/;
      if (pincodePattern.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, pincode: value.length === 6 ? "" : "Pincode must be exactly 6 digits." }));
      }
      return;
    }
    
    if (name === "password") {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      newErrors.password = passwordPattern.test(value)
        ? ""
        : "Must be 6+ characters, include capital letter, number, and special character.";
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword = value === formData.password ? "" : "Passwords do not match.";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Phone number must be exactly 10 digits.";
    }
    
    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }
    
    // Required fields check
    for (const key in formData) {
      if (
        (formData[key] === '' || formData[key] === null) &&
        key !== "profilePic" // profilePic is file type
      ) {
        newErrors[key] = `Please fill the ${key} field.`;
      }
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword" && key !== "agreeTerms") {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.post('/manager/register', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
      if (response.data.success == true) {
        alert("Registration successful!");
        nav("/manager/login")
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error registering manager:", error);
    
      if (error.response && error.response.status === 409) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailId: "Email already exists. Please use a different email.",
        }));
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
    
  };

  return (
    <div>
      <LandingNav />
      <div className="container mt-5">
        <div className="row shadow rounded overflow-hidden">
          <div className="col-md-6 p-0">
            <img
              src={gardenImg}
              alt="Garden"
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>
          <div className="col-md-6 p-4 bg-light">
            <h2 className="text-center mb-4 text-success">Manager Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Each form field */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
                  {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label><br />
                  {["Male", "Female", "Other"].map((g) => (
                    <div key={g} className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="gender" value={g} onChange={handleChange} checked={formData.gender === g} />
                      <label className="form-check-label">{g}</label>
                    </div>
                  ))}
                  {errors.gender && <small className="text-danger d-block">{errors.gender}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="emailId" value={formData.emailId} onChange={handleChange} />
                  {errors.emailId && <small className="text-danger">{errors.emailId}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="number" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
                  {errors.mobileNo && <small className="text-danger">{errors.mobileNo}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">District</label>
                  <input type="text" className="form-control" name="district" value={formData.district} onChange={handleChange} />
                  {errors.district && <small className="text-danger">{errors.district}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                  {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Pincode</label>
                  <input type="number" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} />
                  {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" name="profilePic" accept="image/*" onChange={handleChange} />
                  {errors.profilePic && <small className="text-danger">{errors.profilePic}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Year of Experience</label>
                  <input type="number" className="form-control" name="yearofexperience" value={formData.yearofexperience} onChange={handleChange} />
                  {errors.yearofexperience && <small className="text-danger">{errors.yearofexperience}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>

                <div className="col-md-12 mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                    <label className="form-check-label">
                      I agree to the terms and conditions
                    </label>
                  </div>
                  {errors.agreeTerms && <small className="text-danger">{errors.agreeTerms}</small>}
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">Register</button>
              <p className="text-center mt-3">
                Already have an account? <Link to="/manager/Login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerSignup;
