import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About SWAMARGA', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Stakeholders', to: '/#stakeholders' },
  { label: 'Resources', to: '/help#resources' },
  { label: 'Help', to: '/help' },
]

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="gov-site">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="gov-utility">
        <div className="gov-container gov-utility-inner">
          <span>Government-oriented workforce intelligence platform</span>
          <div className="gov-utility-links">
            <a href="#main-content">Skip to main content</a>
            <button type="button" aria-label="Change language">English</button>
            <button type="button" aria-label="Change language">मराठी</button>
            <button type="button" aria-label="Increase text size">A+</button>
          </div>
        </div>
      </div>

      <header className="gov-header">
        <div className="gov-container gov-brand-row">
          <Link to="/" className="gov-brand" onClick={() => setMenuOpen(false)}>
            <img
              src="/swamarga_eng_logo.png"
              alt="SWAMARGA"
              className="gov-logo"
            />
            <div className="gov-brand-text">
              <strong>SWAMARGA</strong>
              <span>
                Skill &amp; Workforce Alignment through Market Analysis,
                Readiness, Guidance &amp; Advancement
              </span>
            </div>
          </Link>

          <div className="gov-header-meta">
            <span>Skill Development &amp; Workforce Intelligence</span>
            <span>Government of Maharashtra context</span>
          </div>
        </div>

        <div className="gov-nav-border">
          <div className="gov-container gov-nav-row">
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
              <span>Menu</span>
            </button>

            <nav
              id="main-navigation"
              className={`gov-main-nav ${menuOpen ? 'is-open' : ''}`}
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `gov-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="gov-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            <div className="gov-nav-actions">
              <Link to="/login" className="gov-signin">
                Sign in
              </Link>
              <Link to="/signup" className="gov-account">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="gov-footer">
        <div className="gov-container gov-footer-main">
          <div className="gov-footer-identity">
            <img src="/swamarga_eng_logo.png" alt="SWAMARGA" />
            <p>
              From Industry Demand to Job-Ready Talent.
            </p>
            <p className="gov-footer-note">
              Prototype developed for SIH 2026, PS 26134.
            </p>
          </div>

          <div>
            <h2>Platform</h2>
            <Link to="/about">About SWAMARGA</Link>
            <Link to="/help">Help</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h2>Services</h2>
            <Link to="/signup">Candidate services</Link>
            <Link to="/signup">Training institute</Link>
            <Link to="/signup">Employer services</Link>
            <Link to="/login">Government / district</Link>
          </div>

          <div>
            <h2>Information</h2>
            <Link to="/help#accessibility">Accessibility</Link>
            <Link to="/help#privacy">Privacy</Link>
            <Link to="/help#resources">Resources</Link>
            <Link to="/contact">Feedback &amp; contact</Link>
          </div>
        </div>

        <div className="gov-footer-bottom">
          <div className="gov-container">
            <p>
              Demonstration and seeded data are labelled where applicable and
              should not be interpreted as official Maharashtra statistics.
            </p>
            <p>
              Accessibility &nbsp;|&nbsp; Privacy &nbsp;|&nbsp; Disclaimer
              &nbsp;|&nbsp; Sitemap
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}



