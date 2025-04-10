import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>Community Garden Connect</h5>
            <p className="text-muted">
              Connecting gardeners and building sustainable communities through shared spaces.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-muted">About Us</Link></li>
              <li><Link to="/contact" className="text-muted">Contact</Link></li>
              <li><Link to="/login" className="text-muted">Login</Link></li>
              <li><Link to="/signup" className="text-muted">Sign Up</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <address className="text-muted">
              <p>Email: info@communitygarden.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Garden Street<br />Green City, GC 12345</p>
            </address>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center text-muted">
          <p>&copy; 2024 Community Garden Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer