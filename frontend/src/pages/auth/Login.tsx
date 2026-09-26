import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/candidate')
  }

  return (
    <section className="auth-page">
      <div className="auth-intro">
        <p className="eyebrow">SWAMARGA workspace</p>
        <h1>Sign in</h1>
        <p>
          Access your role-specific workspace for skills, training, demand
          and employment information.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-field">
          <div className="field-label-row">
            <label htmlFor="login-password">Password</label>
            <button
              type="button"
              className="field-action"
              onClick={() => setShowPassword((show) => !show)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="button button-primary button-full">
          Sign in
        </button>

        <Link to="/help" className="auth-secondary-link">
          Need help accessing your account?
        </Link>
      </form>

      <div className="auth-divider">
        <span>New to SWAMARGA?</span>
      </div>

      <Link to="/signup" className="button button-secondary button-full">
        Create an account
      </Link>

      <p className="auth-note">
        Government and administrator access is provided through authorised
        accounts.
      </p>
    </section>
  )
}
