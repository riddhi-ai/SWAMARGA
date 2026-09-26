import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

const nav = [
  ['About', '/about'],
  ['Services', '/#services'],
  ['Stakeholders', '/#stakeholders'],
  ['Resources', '/help'],
]

export default function PublicLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="site">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div className="utility-bar">
        <div className="site-width utility-inner">
          <span>Public workforce information service</span>
          <div>
            <button type="button">मराठी</button>
            <button type="button">हिंदी</button>
            <button type="button" className="utility-active">English</button>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="site-width brand-row">
          <Link to="/" className="brand" aria-label="SWAMARGA home">
            <span className="brand-swa">SWA</span><span>MARGA</span>
            <small>Skill & Workforce Alignment</small>
          </Link>

          <div className="header-context">
            <span>From Industry Demand</span>
            <span>to Job-Ready Talent</span>
          </div>

          <div className="header-actions">
            <Link to="/login" className="header-link">Sign in</Link>
            <Link to="/signup" className="header-button">Create account</Link>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>
        </div>

        <nav className={`main-nav ${open ? 'open' : ''}`} id="mobile-navigation">
          <div className="site-width nav-inner">
            <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
            {nav.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="nav-contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-width footer-grid">
          <div>
            <div className="footer-brand"><b>SWA</b>MARGA</div>
            <p>
              Skill & Workforce Alignment through Market Analysis,
              Readiness, Guidance & Advancement.
            </p>
          </div>

          <div>
            <h2>Platform</h2>
            <Link to="/about">About SWAMARGA</Link>
            <Link to="/help">Help & FAQs</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h2>Workspaces</h2>
            <Link to="/login">Candidate</Link>
            <Link to="/login">Training institute</Link>
            <Link to="/login">Employer</Link>
            <Link to="/login">Government</Link>
          </div>

          <div>
            <h2>Information</h2>
            <span>Prototype platform</span>
            <span>Illustrative data is labelled</span>
            <span>Accessibility first</span>
          </div>
        </div>

        <div className="site-width footer-bottom">
          <span>© 2026 SWAMARGA</span>
          <span>Public digital service prototype</span>
        </div>
      </footer>
    </div>
  )
}
