import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="auth-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="auth-header">
        <Link to="/" className="auth-brand" aria-label="SWAMARGA home">
          <img src="/swamarga_eng_logo.png" alt="SWAMARGA" />
        </Link>

        <Link to="/" className="auth-home-link">
          Return to SWAMARGA
        </Link>
      </header>

      <main id="main-content" className="auth-main">
        <Outlet />
      </main>

      <footer className="auth-footer">
        <span>SWAMARGA · SIH 2026 · PS 26134</span>
        <Link to="/help#accessibility">Accessibility</Link>
      </footer>
    </div>
  )
}
