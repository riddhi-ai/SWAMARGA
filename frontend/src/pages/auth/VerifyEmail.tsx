import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/candidate')
  }

  return (
    <div className="auth-container">
      <div className="auth-panel">
        <p className="auth-section-label">Account verification</p>
        <h1>Verify your email</h1>
        <p className="auth-intro">
          Enter the verification code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="gov-form-field">
            <label htmlFor="verification-code">Verification code</label>
            <input
              id="verification-code"
              inputMode="numeric"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="gov-primary-button auth-submit">
            Verify email
          </button>
        </form>

        <p className="auth-secondary">
          Need to start again? <Link to="/signup">Return to registration</Link>
        </p>
      </div>
    </div>
  )
}



