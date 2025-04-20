import React, { useState, useEffect } from 'react';
import '../assets/css/garderner.css';
import GardenerHomeNav from './GardenerHomeNav';
import axiosInstance from '../BaseAPI/axiosInstance';

const GardenerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    emailId: '',
    mobileNo: '',
    district: '',
    city: '',
    pincode: '',
    yearofexperience: '',
    availabletime: '',
    preferedcrops: '',
    skills: '',
    profilePic: null
  });
  const [errors, setErrors] = useState({}); // To store validation errors

  const id = localStorage.getItem("gardenerId");

  const fetchProfile = () => {
    axiosInstance.post(`/gardner/viewone/${id}`)
      .then((res) => {
        setProfile(res.data);
        setFormData({
          fullName: res.data.fullName || '',
          gender: res.data.gender || '',
          emailId: res.data.emailId || '',
          mobileNo: res.data.mobileNo || '',
          district: res.data.district || '',
          city: res.data.city || '',
          pincode: res.data.pincode || '',
          yearofexperience: res.data.yearofexperience || '',
          availabletime: res.data.availabletime || '',
          preferedcrops: res.data.preferedcrops || '',
          skills: res.data.skills || '',
          profilePic: null
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate all fields are filled
    Object.keys(formData).forEach(key => {
      if (formData[key] === '' && key !== 'profilePic') {
        newErrors[key] = `${key} is required`;
      }
    });

    // Validate mobile number (must be 10 digits)
    if (formData.mobileNo && !/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be 10 digits';
    }

    // Validate pincode (must be 6 digits)
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    return newErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedForm = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          updatedForm.append(key, formData[key]);
        }
      }

      const res = await axiosInstance.post(`/gardner/profileupdate/${id}`, updatedForm);

      if (res.data.message === 'Gardner updated successfully') {
        alert('Profile updated!');
        setEditMode(false);
        fetchProfile(); // Refresh the profile data
      } else {
        alert('Update failed: ' + res.data.message);
      }
    } catch (err) {
      console.error('Update Error:', err);
      alert('Error updating profile');
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <GardenerHomeNav />

      <div className="profile-card shadow-lg p-4 bg-white rounded">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={`http://localhost:8080/${profile?.profilePic?.path?.replace(/\\/g, "/")}`}
              alt="Gardener"
              className="profile-img rounded-circle"
              style={{ width: '180px', height: '180px', objectFit: 'cover' }}
            />
            <h4 className="mt-3">{profile.fullName}</h4>
            <p className="text-muted">{profile.gender}</p>
          </div>

          <div className="col-md-8">
            <h5 className="mb-3">🌿 Gardener Details</h5>

            {editMode ? (
              <form onSubmit={handleUpdate} encType="multipart/form-data">
                <div className="row">
                  {[ 
                    { label: 'Full Name', key: 'fullName' },
                    { label: 'Email ID', key: 'emailId' },
                    { label: 'Mobile Number', key: 'mobileNo' },
                    { label: 'District', key: 'district' },
                    { label: 'City', key: 'city' },
                    { label: 'Pincode', key: 'pincode' },
                    { label: 'Experience (in years)', key: 'yearofexperience' },
                    { label: 'Preferred Crops', key: 'preferedcrops' },
                    { label: 'Skills', key: 'skills' },
                  ].map(({ label, key }) => (
                    <div className="col-sm-6 mb-3" key={key}>
                      <label className="form-label">{label}</label>
                      <input
                        type="text"
                        className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                      {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                    </div>
                  ))}

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Available Time</label>
                    <select
                      name="availabletime"
                      className={`form-select ${errors.availabletime ? 'is-invalid' : ''}`}
                      value={formData.availabletime}
                      onChange={handleChange}
                    >
                      <option value="">Select Availability</option>
                      <option value="fulltime">Full Time</option>
                      <option value="parttime">Part Time</option>
                    </select>
                    {errors.availabletime && <div className="invalid-feedback">{errors.availabletime}</div>}
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-sm-6 mb-3"><strong>Email:</strong><p>{profile.emailId}</p></div>
                <div className="col-sm-6 mb-3"><strong>Mobile:</strong><p>{profile.mobileNo}</p></div>
                <div className="col-sm-6 mb-3"><strong>District:</strong><p>{profile.district}</p></div>
                <div className="col-sm-6 mb-3"><strong>City:</strong><p>{profile.city}</p></div>
                <div className="col-sm-6 mb-3"><strong>Pincode:</strong><p>{profile.pincode}</p></div>
                <div className="col-sm-6 mb-3"><strong>Experience:</strong><p>{profile.yearofexperience} years</p></div>
                <div className="col-sm-6 mb-3"><strong>Availability:</strong><p>{profile.availabletime}</p></div>
                <div className="col-sm-6 mb-3"><strong>Preferred Crops:</strong><p>{profile.preferedcrops}</p></div>
                <div className="col-sm-6 mb-3"><strong>Skills:</strong><p>{profile.skills}</p></div>

                <button className="btn btn-outline-success mt-2" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenerProfile;
