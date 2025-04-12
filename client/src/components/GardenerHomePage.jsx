import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/garderner.css'
import GardenerHomeNav from './GardenerHomeNav'
import compost from '../assets/compost.jpg'
import Watering from '../assets/watering.jpg'
import soil from '../assets/soil.jpg'
import Footer from '../pages/landing/Footer'

function GardenerHome() {
  return (
    <div className="gardener-home">
        <GardenerHomeNav/>
      {/* Hero Banner */}
      <section className="gardenerhomehero-section  text-white text-center d-flex align-items-center justify-content-center">
        <div className="overlay"></div>
        <div className="content">
          <h1>Welcome Back, Gardener!</h1>
          <p>Let’s grow something beautiful together.</p>
          <Link to="/gardening-details" className="btn btn-light mt-3">Explore Your Garden</Link>
        </div>
      </section>

      {/* Scrolling Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">🌱 Gardening Tips</h2>
        <div className="row overflow-auto scroll-section">
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img id='gardnercardimgs' src={compost} className="card-img-top" alt="Tip 1" />
              <div className="card-body">
                <h5 className="card-title">Compost Like a Pro</h5>
                <p className="card-text">Turn kitchen scraps into gold for your soil using home composting methods.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img id='gardnercardimgs' src={Watering} className="card-img-top" alt="Tip 2" />
              <div className="card-body">
                <h5 className="card-title">Watering Wisdom</h5>
                <p className="card-text">Water early in the morning to keep plants healthy and reduce evaporation.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img id='gardnercardimgs' src={soil} className="card-img-top" alt="Tip 3" />
              <div className="card-body">
                <h5 className="card-title">Know Your Soil</h5>
                <p className="card-text">Understanding your soil type can drastically improve your harvest quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">🌼 Upcoming Garden Events</h2>
          <div className="row overflow-auto scroll-section">
            <div className="col-md-6 mb-3">
              <div className="card">
                <img src="/images/event1.jpg" className="card-img-top" alt="Event 1" />
                <div className="card-body">
                  <h5 className="card-title">Spring Planting Festival</h5>
                  <p className="card-text">Join the community in planting new seedlings for the season.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <img src="/images/event2.jpg" className="card-img-top" alt="Event 2" />
                <div className="card-body">
                  <h5 className="card-title">Organic Gardening Workshop</h5>
                  <p className="card-text">Learn the basics of sustainable, chemical-free gardening from experts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default GardenerHome
