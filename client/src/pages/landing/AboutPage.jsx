import LandingNav from '../../components/landing/LandingNav'
import Footer from '../../components/landing/Footer'

function AboutPage() {
  return (
    <>
      <LandingNav />
      <main className="mt-5 pt-5">
        <div className="container">
          <h1 className="text-center mb-5">About Community Garden Connect</h1>
          
          <div className="row mb-5">
            <div className="col-md-6">
              <h2>Our Mission</h2>
              <p className="lead">
                To create sustainable communities through shared gardening spaces and foster
                connections between local gardeners.
              </p>
              <p>
                Community Garden Connect was founded with the vision of making community
                gardening more accessible, organized, and enjoyable for everyone. We believe
                in the power of growing together and sharing knowledge.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1622383563227-04c6f69b3523?w=500&auto=format"
                alt="Community Garden"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-12">
              <h2 className="text-center mb-4">Our Values</h2>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title">Sustainability</h3>
                      <p className="card-text">
                        We promote environmentally friendly gardening practices and sustainable
                        community development.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title">Community</h3>
                      <p className="card-text">
                        Building strong connections between gardeners and fostering a
                        supportive environment.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h3 className="card-title">Education</h3>
                      <p className="card-text">
                        Sharing knowledge and promoting learning through workshops and
                        community events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-12">
              <h2 className="text-center mb-4">Our Impact</h2>
              <div className="row text-center">
                <div className="col-md-4">
                  <h3 className="display-4 text-success">500+</h3>
                  <p className="lead">Active Gardeners</p>
                </div>
                <div className="col-md-4">
                  <h3 className="display-4 text-success">50+</h3>
                  <p className="lead">Community Gardens</p>
                </div>
                <div className="col-md-4">
                  <h3 className="display-4 text-success">1000+</h3>
                  <p className="lead">Garden Plots</p>
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

export default AboutPage