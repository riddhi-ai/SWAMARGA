import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const roles = [
  {
    id: 'candidate',
    title: 'Candidate',
    description: 'Build your skills profile and explore career pathways.',
  },
  {
    id: 'institute',
    title: 'Training institute',
    description: 'Connect training programmes with industry requirements.',
  },
  {
    id: 'employer',
    title: 'Employer organisation',
    description: 'Define competencies and validate practical evidence.',
  },
]

export default function Signup() {
  const navigate = useNavigate()
  const [role, setRole] = useState('candidate')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/verify-email')
  }

  return (
    <section className="auth-page auth-page-wide">
      <div className="auth-intro">
        <p className="eyebrow">Account registration</p>
        <h1>Create your SWAMARGA account</h1>
        <p>
          Choose the workspace that matches how you participate in the skills
          ecosystem.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <fieldset className="role-fieldset">
          <legend>Register as</legend>

          <div className="role-choice-list">
            {roles.map((item) => (
              <label
                className={`role-choice ${
                  role === item.id ? 'selected' : ''
                }`}
                key={item.id}
              >
                <input
                  type="radio"
                  name="role"
                  value={item.id}
                  checked={role === item.id}
                  onChange={(event) => setRole(event.target.value)}
                />

                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-field">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            name="name"
            autoComplete="name"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        {role !== 'candidate' && (
          <div className="form-field">
            <label htmlFor="signup-organisation">
              Organisation name
            </label>
            <input
              id="signup-organisation"
              name="organisation"
              autoComplete="organization"
              required
            />
          </div>
        )}

        <div className="form-field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <span className="field-help">
            Use at least 8 characters.
          </span>
        </div>

        <button type="submit" className="button button-primary button-full">
          Continue to email verification
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

      <p className="auth-note">
        Government and administrator accounts are provisioned separately and
        are not available through public registration.
      </p>
    </section>
  )
}
