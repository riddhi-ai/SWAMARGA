import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('candidate')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/verify-email')
  }

  return (
    <div className="auth-container">
      <div className="auth-panel auth-panel-wide">
        <p className="auth-section-label">SWAMARGA services</p>
        <h1>Create an account</h1>
        <p className="auth-intro">
          Select the service area that corresponds to your role.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="gov-form-field">
            <label htmlFor="signup-name">Full name</label>
            <input
              id="signup-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="gov-form-field">
            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="gov-form-field">
            <label htmlFor="signup-role">Service area</label>
            <select
              id="signup-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="candidate">Candidate</option>
              <option value="institute">Training institute</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <button type="submit" className="gov-primary-button auth-submit">
            Continue
          </button>
        </form>

        <p className="auth-secondary">
          Already registered? <Link to="/login">Sign in</Link>
        </p>

        <p className="auth-prototype-note">
          Government and district authority accounts are provisioned
          separately in the current prototype.
        </p>
      </div>
    </div>
  )
}



