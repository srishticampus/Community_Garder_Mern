import LandingNav from '../../components/landing/LandingNav'
import Footer from '../../components/landing/Footer'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        {/* Hero Section */}
        <section className="hero bg-success text-white text-center py-5 mt-5">
          <div className="container py-5">
            <h1 className="display-3 fw-bold">Welcome to Community Garden Connect</h1>
            <p className="lead fs-4 mb-4">
              Join our thriving community of gardeners and grow together
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/signup" className="btn btn-light btn-lg">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose Community Garden Connect?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-plant display-4 text-success mb-3"></i>
                    <h3>Garden Management</h3>
                    <p>Easily manage your garden plots and track your growing progress</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-people display-4 text-success mb-3"></i>
                    <h3>Community Building</h3>
                    <p>Connect with fellow gardeners and share knowledge</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-calendar-event display-4 text-success mb-3"></i>
                    <h3>Events & Workshops</h3>
                    <p>Participate in community events and learning opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta bg-light py-5">
          <div className="container text-center">
            <h2 className="mb-4">Ready to Start Growing?</h2>
            <p className="lead mb-4">
              Join our community today and start your gardening journey
            </p>
            <Link to="/signup" className="btn btn-success btn-lg">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LandingPage