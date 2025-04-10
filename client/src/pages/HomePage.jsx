import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-12 text-center">
          <h1 className="display-4">Welcome to Community Garden Connect</h1>
          <p className="lead">
            Join our thriving community of gardeners and grow together!
          </p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-success btn-lg mx-2">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-success btn-lg mx-2">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Gardeners</h3>
              <ul className="list-unstyled">
                <li>✓ Manage your garden plot</li>
                <li>✓ Track planting schedules</li>
                <li>✓ Connect with other gardeners</li>
                <li>✓ Access gardening resources</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Managers</h3>
              <ul className="list-unstyled">
                <li>✓ Oversee garden operations</li>
                <li>✓ Manage plot assignments</li>
                <li>✓ Coordinate events</li>
                <li>✓ Track maintenance tasks</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Community Features</h3>
              <ul className="list-unstyled">
                <li>✓ Share gardening tips</li>
                <li>✓ Participate in events</li>
                <li>✓ Exchange resources</li>
                <li>✓ Build connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Upcoming Community Events</h3>
              <div className="list-group">
                <div className="list-group-item">
                  <h5>Spring Planting Workshop</h5>
                  <p className="mb-1">Learn essential tips for spring planting</p>
                  <small>March 15, 2024 | 10:00 AM</small>
                </div>
                <div className="list-group-item">
                  <h5>Community Harvest Festival</h5>
                  <p className="mb-1">Celebrate our community's harvest</p>
                  <small>March 30, 2024 | 2:00 PM</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage