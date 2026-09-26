import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="auth-site">
      <header className="auth-header">
        <div className="gov-container auth-header-inner">
          <Link to="/" className="auth-brand">
            <img src="/swamarga_eng_logo.png" alt="SWAMARGA" />
          </Link>
          <Link to="/" className="auth-back">
            Return to SWAMARGA
          </Link>
        </div>
      </header>

      <main className="auth-main">
        <Outlet />
      </main>

      <footer className="auth-footer">
        <div className="gov-container">
          SWAMARGA prototype &nbsp;|&nbsp; SIH 2026 &nbsp;|&nbsp; PS 26134
        </div>
      </footer>
    </div>
  )
}



