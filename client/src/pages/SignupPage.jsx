import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingNav from './landing/LandingNav';
import gardenImg from '../assets/gardenabout.jpg'; // Place an image in /src/assets folder

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    address: '',
    email: '',
    phone: '',
    photo: null,
    experience: '',
    availability: '',
    crops: '',
    skills: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    // Submit logic here
    console.log('Submitted Data:', formData);
  };

  return (
    <div>
      <LandingNav />
      <div className="container mt-5">
        <div className="row shadow rounded overflow-hidden">
          {/* Image Side */}
          <div className="col-md-6 p-0">
            <img
              src={gardenImg}
              alt="Garden"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ height: '100%' }}
            />
          </div>

          {/* Form Side */}
          <div className="col-md-6 p-4 bg-light">
            <h2 className="text-center mb-4 text-success">Gardener's Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label><br />
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="Male" onChange={handleChange} />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="Female" onChange={handleChange} />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" name="address" rows="2" required onChange={handleChange}></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="number" className="form-control" name="phone" required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Photo</label>
                  <input type="file" className="form-control" name="photo" accept="image/*" required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Year of Experience</label>
                  <input type="text" className="form-control" name="experience" required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Availability</label>
                  <select className="form-select" name="availability" required onChange={handleChange}>
                    <option value="">Select availability</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Weekends">Weekends</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Preferred Crops</label>
                  <input type="text" className="form-control" name="crops" onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">List of Skills</label>
                  <input type="text" className="form-control" name="skills" onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name="confirmPassword" required onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="agreeTerms" onChange={handleChange} />
                    <label className="form-check-label">
                      I agree to the terms and conditions
                    </label>
                  </div>
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
