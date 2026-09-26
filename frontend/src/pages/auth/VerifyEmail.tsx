import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setVerified(true)
  }

  return (
    <section className="auth-page">
      <div className="auth-intro">
        <p className="eyebrow">Email verification</p>
        <h1>Verify your email address</h1>
        <p>
          Enter the verification code sent to your email address to continue.
        </p>
      </div>

      {verified ? (
        <div className="verification-success" role="status">
          <strong>Email verified.</strong>
          <p>Your prototype account is ready to continue.</p>
          <button
            type="button"
            className="button button-primary button-full"
            onClick={() => navigate('/candidate')}
          >
            Continue
          </button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="verification-code">
              Verification code
            </label>
            <input
              id="verification-code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="button button-primary button-full">
            Verify email
          </button>

          <button type="button" className="plain-button">
            Resend code
          </button>
        </form>
      )}

      <Link to="/login" className="auth-secondary-link">
        Return to sign in
      </Link>
    </section>
  )
}
