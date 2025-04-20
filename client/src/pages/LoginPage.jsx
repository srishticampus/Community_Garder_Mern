import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingNav from './landing/LandingNav'
import axiosInstance from '../BaseAPI/axiosInstance'

function LoginPage() {
  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  })
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('') // Clear previous errors

    try {
      const response = await axiosInstance.post('/gardner/login', formData)

      if (response.data.message === 'Login successful') {
        localStorage.setItem('gardenerId', response.data.user.id)
        alert('Login successful')
        navigate('/gardener/home')
      } else {
        setErrorMsg(response.data.message)
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="row justify-content-center">
      <LandingNav />
      <div className="col-md-6 mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Login</h2>

            {errorMsg && (
              <div className="alert alert-danger text-center">{errorMsg}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="emailId"
                  className="form-control"
                  id="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-center mt-3">
                <Link to={"/gardener/forgetpassword"}>Forgot Your Password ?</Link>
              </p>

              <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
