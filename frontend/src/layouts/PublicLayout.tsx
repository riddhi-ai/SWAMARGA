import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'How it works', to: '/about#how-it-works' },
  { label: 'Help', to: '/help' },
  { label: 'Contact', to: '/contact' },
]

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="public-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="public-header">
        <div className="public-header-inner">
          <Link
            to="/"
            className="brand"
            aria-label="SWAMARGA home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/swamarga_eng_logo.png"
              alt="SWAMARGA"
              className="brand-logo"
            />
            <span className="brand-fallback">SWAMARGA</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `public-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="language-button"
              aria-label="Current language: English"
            >
              EN
              <span aria-hidden="true">⌄</span>
            </button>

            <Link to="/login" className="header-login">
              Sign in
            </Link>

            <Link to="/signup" className="header-signup">
              Create account
            </Link>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mobile-nav-divider" />

            <Link
              to="/login"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="mobile-nav-primary"
              onClick={() => setMenuOpen(false)}
            >
              Create account
            </Link>
          </nav>
        )}
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/swamarga_eng_logo.png" alt="SWAMARGA" />
            </Link>

            <p>
              Skill &amp; Workforce Alignment through Market Analysis,
              Readiness, Guidance &amp; Advancement.
            </p>

            <p className="footer-tagline">
              From Industry Demand to Job-Ready Talent
            </p>
          </div>

          <div className="footer-column">
            <h2>Platform</h2>
            <Link to="/about">About</Link>
            <Link to="/about#how-it-works">How it works</Link>
            <Link to="/help">Help</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h2>Services</h2>
            <Link to="/signup">Candidate</Link>
            <Link to="/signup">Training institute</Link>
            <Link to="/signup">Employer</Link>
            <Link to="/login">Government</Link>
          </div>

          <div className="footer-column">
            <h2>Information</h2>
            <Link to="/help#accessibility">Accessibility</Link>
            <Link to="/help#privacy">Privacy</Link>
            <Link to="/help#data">Data &amp; methodology</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            SWAMARGA is a prototype developed for SIH 2026, PS 26134.
          </p>
          <p>
            Demonstration and seeded data are labelled where applicable and
            should not be interpreted as official Maharashtra statistics.
          </p>
        </div>
      </footer>
    </div>
  )
}
