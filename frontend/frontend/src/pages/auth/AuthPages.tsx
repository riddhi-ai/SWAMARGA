import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Login() {
  const navigate = useNavigate()

  return (
    <div className="auth-card">
      <div className="auth-title">
        <span>SWAMARGA access</span>
        <h1>Sign in</h1>
        <p>Access the workspace associated with your account.</p>
      </div>

      <form className="service-form" onSubmit={(e) => { e.preventDefault(); navigate('/candidate') }}>
        <label>Email<input type="email" required autoComplete="email" /></label>
        <label>Password<input type="password" required autoComplete="current-password" /></label>
        <button className="primary-button" type="submit">Sign in</button>
      </form>

      <p className="auth-foot">New to SWAMARGA? <Link to="/signup">Create an account</Link></p>
    </div>
  )
}

export function Signup() {
  const [role, setRole] = useState('candidate')

  return (
    <div className="auth-card auth-card-wide">
      <div className="auth-title">
        <span>Create an account</span>
        <h1>Choose your workspace</h1>
        <p>Your workspace determines the information and actions available to you.</p>
      </div>

      <form className="service-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          I am a
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="candidate">Candidate</option>
            <option value="institute">Training institute</option>
            <option value="employer">Employer organisation</option>
          </select>
        </label>

        <label>Full name<input required autoComplete="name" /></label>
        <label>Email<input required type="email" autoComplete="email" /></label>

        {role !== 'candidate' && (
          <label>Organisation name<input required /></label>
        )}

        <button className="primary-button" type="submit">Continue</button>
      </form>
    </div>
  )
}

export function VerifyEmail() {
  return (
    <div className="auth-card">
      <div className="auth-title">
        <span>Account verification</span>
        <h1>Verify your email</h1>
        <p>Enter the verification code sent to your email address.</p>
      </div>
      <form className="service-form" onSubmit={(e) => e.preventDefault()}>
        <label>Verification code<input inputMode="numeric" maxLength={6} /></label>
        <button className="primary-button" type="submit">Verify account</button>
      </form>
    </div>
  )
}

export function AccessDenied() {
  return (
    <div className="auth-card">
      <div className="auth-title">
        <span>Access</span>
        <h1>This workspace is restricted.</h1>
        <p>Your current account does not have permission to access this area.</p>
      </div>
      <Link className="secondary-button" to="/">Return to SWAMARGA</Link>
    </div>
  )
}
