import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use axios directly unless you customized axiosInstance
import LandingNav from './landing/LandingNav';
import gardenImg from '../assets/gardenabout.jpg';

function SignupPage() {
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
    availabletime: '',
    preferedcrops: '',
    skills: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'emailId':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
        break;
      case 'mobileNo':
        error = /^\d{10}$/.test(value) ? '' : 'Mobile number must be 10 digits';
        break;
      case 'password':
        error = value.length >= 6 ? '' : 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        error = value === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        if (!value) error = 'This field is required';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'profilePic' ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in formData) {
      if (!formData[key] && key !== 'profilePic') {
        newErrors[key] = 'This field is required';
      }
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formPayload = new FormData();
    for (const key in formData) {
      if (key !== 'confirmPassword') {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8080/gardner/register', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert('Gardner registered successfully!');
        navigate("/login")
      } else {
        alert(response.data.message || 'Registration failed');
        if (response.data.message === 'Email already exists') {
          setErrors((prev) => ({ ...prev, emailId: 'Email already exists' }));
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
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
            <h2 className="text-center mb-4 text-success">Gardener's Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Fields matching backend */}
                <div className="col-md-6 mb-3">
                  <label>Full Name</label>
                  <input className="form-control" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                  {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input className="form-control" type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
                  {errors.emailId && <small className="text-danger">{errors.emailId}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Mobile Number</label>
                  <input className="form-control" type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
                  {errors.mobileNo && <small className="text-danger">{errors.mobileNo}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>District</label>
                  <input className="form-control" type="text" name="district" value={formData.district} onChange={handleChange} />
                  {errors.district && <small className="text-danger">{errors.district}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <input className="form-control" type="text" name="city" value={formData.city} onChange={handleChange} />
                  {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pincode</label>
                  <input className="form-control" type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                  {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Password</label>
                  <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Confirm Password</label>
                  <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Year of Experience</label>
                  <input className="form-control" type="text" name="yearofexperience" value={formData.yearofexperience} onChange={handleChange} />
                  {errors.yearofexperience && <small className="text-danger">{errors.yearofexperience}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Preferred Crops</label>
                  <input className="form-control" type="text" name="preferedcrops" value={formData.preferedcrops} onChange={handleChange} />
                  {errors.preferedcrops && <small className="text-danger">{errors.preferedcrops}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Skills</label>
                  <input className="form-control" type="text" name="skills" value={formData.skills} onChange={handleChange} />
                  {errors.skills && <small className="text-danger">{errors.skills}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Availability</label>
                  <select className="form-select" name="availabletime" value={formData.availabletime} onChange={handleChange}>
                    <option value="">Select availability</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Weekends">Weekends</option>
                  </select>
                  {errors.availabletime && <small className="text-danger">{errors.availabletime}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Gender</label><br />
                  {['Male', 'Female'].map((g) => (
                    <div className="form-check form-check-inline" key={g}>
                      <input className="form-check-input" type="radio" name="gender" value={g} onChange={handleChange} />
                      <label className="form-check-label">{g}</label>
                    </div>
                  ))}
                  {errors.gender && <small className="text-danger d-block">{errors.gender}</small>}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Profile Picture</label>
                  <input className="form-control" type="file" name="profilePic" onChange={handleChange} />
                  {errors.profilePic && <small className="text-danger">{errors.profilePic}</small>}
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">Register</button>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
