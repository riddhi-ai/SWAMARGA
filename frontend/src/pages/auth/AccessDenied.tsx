import { Link } from 'react-router-dom'

export default function AccessDenied() {
  return (
    <section className="auth-page">
      <div className="auth-intro">
        <p className="eyebrow">Access</p>
        <h1>This workspace is not available for this account.</h1>
        <p>
          Your account does not currently have permission to access this
          section of SWAMARGA.
        </p>
      </div>

      <div className="access-denied-box">
        <strong>Need access?</strong>
        <p>
          Contact your organisation administrator or use the appropriate
          account type.
        </p>
      </div>

      <Link to="/" className="button button-primary button-full">
        Return to SWAMARGA
      </Link>

      <Link to="/help" className="auth-secondary-link">
        Visit Help
      </Link>
    </section>
  )
}
