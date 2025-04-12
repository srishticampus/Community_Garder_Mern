import React from 'react'
import '../../assets/css/garderner.css'
import GardenerHomeNav from '../../components/GardenerHomeNav'

const gardenPlots = [
  {
    id: 1,
    name: 'Plot A1',
    size: '10x10 ft',
    crop: 'Tomatoes',
    status: 'Active',
    image: '/images/plot1.jpg',
  },
  {
    id: 2,
    name: 'Plot B2',
    size: '8x12 ft',
    crop: 'Spinach',
    status: 'In Progress',
    image: '/images/plot2.jpg',
  },
  {
    id: 3,
    name: 'Plot C3',
    size: '12x12 ft',
    crop: 'Carrots',
    status: 'Harvested',
    image: '/images/plot3.jpg',
  },
  {
    id: 4,
    name: 'Plot D4',
    size: '15x10 ft',
    crop: 'Peppers',
    status: 'Available',
    image: '/images/plot4.jpg',
  },
]

function ViewResource() {
  return (
    <div className="garden-plot-view">
        <GardenerHomeNav/>

      {/* Plot Cards */}
      <div className="container my-5">
      <h2 className="text-success text-center my-5 pt-5">🌿 Resources </h2>
        <div className="row">
          {gardenPlots.map((plot) => (
            <div className="col-md-6 col-lg-4 mb-4" key={plot.id}>
              <div className="card plot-card shadow-sm">
                <img
                  src={plot.image}
                  className="card-img-top"
                  alt={plot.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{plot.name}</h5>
                  <p className="card-text">
                    <strong>Size:</strong> {plot.size} <br />
                    <strong>Crop:</strong> {plot.crop} <br />
                    <strong>Status:</strong>{' '}
                    <span
                      className={`badge ${
                        plot.status === 'Active'
                          ? 'bg-success'
                          : plot.status === 'Available'
                          ? 'bg-primary'
                          : plot.status === 'Harvested'
                          ? 'bg-secondary'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {plot.status}
                    </span>
                  </p>
                  <button className="btn btn-outline-success w-100 mt-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewResource
