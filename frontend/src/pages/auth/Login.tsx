import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/candidate')
  }

  return (
    <div className="auth-container">
      <div className="auth-panel">
        <p className="auth-section-label">SWAMARGA services</p>
        <h1>Sign in</h1>
        <p className="auth-intro">
          Sign in to access services for candidates, training institutions,
          employers and authorised government users.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="gov-form-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="gov-form-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="gov-primary-button auth-submit">
            Sign in
          </button>
        </form>

        <p className="auth-secondary">
          Do not have an account? <Link to="/signup">Create an account</Link>
        </p>

        <p className="auth-prototype-note">
          Prototype authentication: this demonstration currently routes a
          successful sign-in to the candidate workspace.
        </p>
      </div>
    </div>
  )
}



