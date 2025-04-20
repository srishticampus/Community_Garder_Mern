import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

function GardenerHomeNav() {
    const nav=useNavigate()
    const handlelogout=()=>{
        localStorage.removeItem("gardenerId")
        nav("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/gardener/home">
                    Community Garden Connect
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
              <Link className="nav-link" to="/gardening-details">
                Gardening Details
              </Link>
            </li> */}
                        {/* <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li> */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/gardener/viewgarden">
                                Garden
                            </Link>
                        </li><li className="nav-item">
                            <Link className="nav-link" to="/gardener/viewtask">
                                Task
                            </Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gardener/chat">
                                Chat
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gardener/viewresource">
                                resources
                            </Link>
                        </li><li className="nav-item">
                            <Link className="nav-link" to="/gardener/viewevent">
                                Events
                            </Link>
                        </li>
                        {/* <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li> */}

                    </ul>

                    {/* <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form> */}

                    <Link to="/gardener/profile" className='text-light me-3'> <FaUserCircle size={30} />
                    </Link>

                    <button className="btn btn-danger" onClick={handlelogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default GardenerHomeNav
