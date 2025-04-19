import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function ManagerHomeNav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
                  <div className="container-fluid">
                      <Link className="navbar-brand" to="/manager/home">
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
                              <NavDropdown title="Gardens" id="basic-nav-dropdown" className="nav-link">
  <NavDropdown.Item as={Link} to="">View Gardens</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="">Add Gardens</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="">Edit Gardens</NavDropdown.Item>
  {/* <NavDropdown.Divider /> */}
</NavDropdown>

                              </li><li className="nav-item">
                              <NavDropdown title="Tasks" id="basic-nav-dropdown" className="nav-link">
  <NavDropdown.Item as={Link} to="/manager/viewtask">View Task</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/manager/addtask">Add Task</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/manager/edittask">Edit Task</NavDropdown.Item>
</NavDropdown>
      
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to="">
                                      Chat
                                  </Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to="">
                                      resources
                                  </Link>
                              </li><li className="nav-item">
                                  <Link className="nav-link" to="">
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
      
                          <Link to="/manager/profilepage" className='text-light me-3'> <FaUserCircle size={30} />
                          </Link>
      
                          <button className="btn btn-danger">
                              Logout
                          </button>
                      </div>
                  </div>
              </nav>
    </div>
  )
}

export default ManagerHomeNav
