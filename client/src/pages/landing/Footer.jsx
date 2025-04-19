import { Link } from 'react-router-dom'
import "../../assets/css/footer.css"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer-dark">
    <Container>
      <Row className="py-5">
        <Col md={3}>
          <div className="footer-section">
            <h5>Contact Us</h5>
            <p>+1234567819</p>
            <p>communitygarden@ggmail.com</p>
            <p>890, Green Lane, India</p>
          </div>
        </Col>

        <Col md={3}>
          <div className="footer-section">
            <h5>Our Services</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Features</a></li>
            </ul>
          </div>
        </Col>

        <Col md={3}>
          <div className="footer-section">
            <h5>Quick Link</h5>
            <ul className="list-unstyled">
              <li><a href="#">Knowledge Base</a></li>
              <li><a href="#">Hire An Expert</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </Col>

        <Col md={3}>
          <div className="footer-section">
            <h5>Garden Footer</h5>
            <p>Gardening is an activity that is quite physical. It includes weeding, plant watering, mulching, trellising, and harvesting–all of which involve the gardener's physical labor. It, therefore, becomes a great complement to your workout routine. Gardening is a very practical activity as well.</p>
          </div>
        </Col>
      </Row>

      <Row className="footer-bottom">
        <Col className="text-center py-3">
          <div className="social-icons mb-3">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
          </div>
          <p className="copyright">
            Copyright ©2020 All rights reserved | Block is made with by 
            <a href="#" className="text-info"> Mudassar Chaudhry</a>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
  )
}

export default Footer