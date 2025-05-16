import { useState ,useEffect } from "react";
import "../../assets/css/Manager.css";
import ManagerHomeNav from './ManagerHomeNav';
import axiosInstance from "../../BaseAPI/axiosInstance";

const ManagerProfilePage = ({url}) => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    emailId: '',
    mobileNo: '',
    district: '',
    city: '',
    pincode: '',
    yearofexperience: '',
    profilePic: null
  });

  const id = localStorage.getItem("managerId");

  useEffect(() => {
    axiosInstance.post(`/manager/viewone/${id}`)
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
          profilePic: res.data.profilePic || null
        });
      })
      .catch((err) => console.log(err));
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
    const {
      fullName, gender, emailId, mobileNo, district, city,
      pincode, yearofexperience
    } = formData;

    if (!fullName || !gender || !emailId || !mobileNo || !district || !city || !pincode || !yearofexperience) {
      return "Please fill in all fields.";
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      return "Mobile number must be exactly 10 digits.";
    }

    if (!/^\d{6}$/.test(pincode)) {
      return "Pincode must be exactly 6 digits.";
    }

    if (isNaN(yearofexperience) || yearofexperience < 0) {
      return "Experience must be a valid number.";
    }

    return null;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const updatedForm = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "profilePic") {
          if (value instanceof File) {
            updatedForm.append("profilePic", value);
          } else if (typeof value === "string") {
            updatedForm.append("existingImage", value);
          }
        } else {
          updatedForm.append(key, value);
        }
      });

      const res = await axiosInstance.post(`/manager/profileupdate/${id}`, updatedForm);
      if (res.data.success == true) {
        alert('Profile updated!');
        setProfile(res.data.data);
        setEditMode(false);
        setError("");
      }
    } catch (err) {
      console.error('Update Error:', err);
      setError("Error updating profile.");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <ManagerHomeNav />
      <div className="profile-card shadow-lg p-4 bg-white rounded">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={`http://localhost:8080/${profile?.profilePic?.path?.replace(/\\/g, "/")}`}
              alt="Manager"
              className="profile-img rounded-circle"
              style={{ width: '180px', height: '180px', objectFit: 'cover' }}
            />
            <h4 className="mt-3">{profile.fullName}</h4>
            <p className="text-muted">{profile.gender}</p>
          </div>

          <div className="col-md-8">
            <h5 className="mb-3">🌿 Manager Details</h5>

            {editMode ? (
              <form onSubmit={handleUpdate} encType="multipart/form-data">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Email ID</label>
                    <input type="email" className="form-control" name="emailId" value={formData.emailId} onChange={handleChange} readOnly />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">District</label>
                    <input type="text" className="form-control" name="district" value={formData.district} onChange={handleChange} />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Experience (in years)</label>
                    <input type="text" className="form-control" name="yearofexperience" value={formData.yearofexperience} onChange={handleChange} />
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

export default ManagerProfilePage;
