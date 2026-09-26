import { Link } from 'react-router-dom'

export default function AccessDenied() {
  return (
    <div className="auth-container">
      <div className="auth-panel">
        <p className="auth-section-label">Access information</p>
        <h1>Access not available</h1>
        <p className="auth-intro">
          This service requires an authorised account or the appropriate
          service role.
        </p>

        <div className="auth-actions">
          <Link to="/login" className="gov-primary-button">
            Sign in
          </Link>
          <Link to="/" className="gov-secondary-button">
            Return to home
          </Link>
        </div>
      </div>
    </div>
  )
}

