import React, { useEffect, useState } from 'react';
import axios from '../../BaseAPI/axiosInstance';
import '../../assets/css/garderner.css';
import GardenerHomeNav from '../../components/GardenerHomeNav';

function ViewResource({url}) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get('/resource/all') // ✅ Update with your actual backend URL
      .then((response) => {
        setResources(response.data.data); // adjust if the data is nested
      })
      .catch((error) => {
        console.error('Error fetching resources:', error);
      });
  }, []);

  return (
    <div className="garden-plot-view">
      <GardenerHomeNav />

      <div className="container my-5">
        <h2 className="text-success text-center my-5 pt-5">🌿 Resources</h2>
        <div className="row">
          {resources.length === 0 ? (
            <p className="text-center">No resources available.</p>
          ) : (
            resources.map((item) => (
              <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
                <div className="card plot-card shadow-sm">
                  <img
                    src={`${url}/${item.photo.filename}`} // Adjust path based on backend
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.resourceName}</h5>
                    <p className="card-text">
                      <strong>Description:</strong> {item.description}<br />
                      <strong>Type:</strong> {item.resourceType}<br />
                      <strong>Quantity:</strong> {item.quantity}<br />
                      <span className="badge bg-success">Available</span>
                    </p>
                    {/* <button className="btn btn-outline-success w-100 mt-2">
                      View Details
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewResource;
