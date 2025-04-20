import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gardenImg from "../../assets/gardener.jpg";
import LandingNav from "./LandingNav";
import axiosInstance from "../../BaseAPI/axiosInstance";

function CommunitySignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationtype: "",
    address: "",
    emailId: "",
    phoneNo: "",
    password: "",
    confirmPass: "",
    photo: null,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "organizationName":
      case "organizationtype":
      case "address":
        if (!value.trim()) error = "This field is required";
        break;
      case "emailId":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email address";
        break;
      case "phoneNo":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPass":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData({ ...formData, [name]: fieldValue });
    const fieldError = validateField(name, fieldValue);
    setErrors({ ...errors, [name]: fieldError });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
  
    if (!formData.photo) {
      newErrors.photo = "Photo is required";
    }
  
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
  
    try {
      const res = await axiosInstance.post("/organization/register", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful!");
      navigate("/Cammunity/Login");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage("Email already exists. Please use a different email.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };
  

  return (
    <div>
      <LandingNav />
      <div className="container mt-5">
        <div className="row shadow rounded overflow-hidden">
          <div className="col-md-6 p-0">
            <img src={gardenImg} alt="Garden" className="img-fluid h-100 w-100 object-fit-cover" />
          </div>
          <div className="col-md-6 p-4 bg-light">
            <h2 className="text-center mb-4 text-success">Community Organization</h2>
            {message && <p className="text-danger text-center">{message}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Organization Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.organizationName && "is-invalid"}`}
                    name="organizationName"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.organizationName}</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Organization Type</label>
                  <input
                    type="text"
                    className={`form-control ${errors.organizationtype && "is-invalid"}`}
                    name="organizationtype"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.organizationtype}</div>
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className={`form-control ${errors.address && "is-invalid"}`}
                    name="address"
                    rows="2"
                    onChange={handleChange}
                  ></textarea>
                  <div className="invalid-feedback">{errors.address}</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.emailId && "is-invalid"}`}
                    name="emailId"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.emailId}</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="number"
                    className={`form-control ${errors.phoneNo && "is-invalid"}`}
                    name="phoneNo"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.phoneNo}</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    className={`form-control ${errors.photo && "is-invalid"}`}
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.photo}</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password && "is-invalid"}`}
                    name="password"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPass && "is-invalid"}`}
                    name="confirmPass"
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.confirmPass}</div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${errors.agreeTerms && "is-invalid"}`}
                      type="checkbox"
                      name="agreeTerms"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      I agree to the terms and conditions
                    </label>
                    <div className="invalid-feedback">{errors.agreeTerms}</div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Register
              </button>

              <p className="text-center mt-3">
                Already have an account? <Link to="/Cammunity/Login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunitySignupPage;
