import React, { useState, useEffect } from 'react';
import axios from '../BaseAPI/axiosInstance';
import '../assets/css/garderner.css';
import GardenerHomeNav from './GardenerHomeNav';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function GardenerViewGarden({url}) {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gardenerId = localStorage.getItem("gardenerId");

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const response = await axios.get('/gardener/'+gardenerId);
      setPlots(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch plots');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="garden-plot-view">
      <GardenerHomeNav />

      <div className="gardenergardenhero-section">
        <div className="hero-content text-white text-center">
          <h1>🌿 Garden Plot Overview</h1>
          <p>Explore available and active plots in your community garden</p>
        </div>
      </div>

      <div className="container my-5" style={{minHeight:'80vh'}}>
        <div className="row">
          {plots.map((plot) => (
            <div className="col-md-6 col-lg-4 mb-4" key={plot._id || plot.id}>
              <Card className="plot-card shadow-sm">
                <Card.Img
                  src={`${url}/${plot.image.filename}`}
                  alt={plot.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{plot.name}</Card.Title>
                  <div className="plot-info">
                    <p><strong>Size: </strong> {plot.size}</p>
                    <p><strong>Plot Name: </strong> {plot.plotName}</p>
                    <p><strong>Location: </strong> {plot.location}</p>
                  </div>

                  <div className="garden-details">
                    <div className="detail-item">
                      <i className="bi bi-geo-alt"></i>
                      <span>{plot.region}</span>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-rulers"></i>
                      <span>{plot.assignedPlot}</span>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-person"></i>
                      <span>{plot.mainGardener}</span>
                    </div>
                    <div className="detail-item">
                     <Link to="/gardener/chat">Chat</Link>
                    </div>
                  </div>

                  <Card.Text className="garden-description">
                    {plot.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
          {plots.length === 0 && (
            <div className="col-12 text-center">
              <p>No plots found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GardenerViewGarden;