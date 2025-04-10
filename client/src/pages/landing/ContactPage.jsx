import { useState } from 'react'
import LandingNav from '../../components/landing/LandingNav'
import Footer from '../../components/landing/Footer'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Contact form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <LandingNav />
      <main className="mt-5 pt-5">
        <div className="container">
          <h1 className="text-center mb-5">Contact Us</h1>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <h2>Get in Touch</h2>
              <p className="lead">
                Have questions about Community Garden Connect? We're here to help!
              </p>
              
              <div className="mt-4">
                <h3>Visit Us</h3>
                <address>
                  <p>123 Garden Street<br />Green City, GC 12345</p>
                </address>
                
                <h3>Contact Information</h3>
                <p>
                  <strong>Email:</strong> info@communitygarden.com<br />
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                
                <h3>Office Hours</h3>
                <p>
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title mb-4">Send us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-success w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-5">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title mb-4">Frequently Asked Questions</h2>
                  <div className="accordion" id="faqAccordion">
                    <div className="accordion-item">
                      <h3 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                          How do I join a community garden?
                        </button>
                      </h3>
                      <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          Sign up for an account and browse available garden plots in your area. Once you find a suitable plot, you can request to join the garden community.
                        </div>
                      </div>
                    </div>
                    
                    <div className="accordion-item">
                      <h3 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                          What resources are available to gardeners?
                        </button>
                      </h3>
                      <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          We provide access to gardening tools, educational resources, workshops, and a community of experienced gardeners willing to share their knowledge.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage