import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="auth-shell">
      <header className="auth-header">
        <Link to="/" className="brand">
          <span className="brand-swa">SWA</span><span>MARGA</span>
          <small>Skill & Workforce Alignment</small>
        </Link>
        <Link to="/" className="back-link">← Back to SWAMARGA</Link>
      </header>
      <main className="auth-main">
        <Outlet />
      </main>
    </div>
  )
}
