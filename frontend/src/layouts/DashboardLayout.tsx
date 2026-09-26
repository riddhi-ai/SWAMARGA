import { Outlet, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  ['Overview', '/candidate'],
  ['My Profile', '/candidate/profile'],
  ['Market Demand', '/candidate/market-demand'],
  ['Skill & Evidence Gap', '/candidate/skill-evidence-gap'],
  ['Experience Bridge', '/candidate/experience-bridge'],
  ['Training', '/candidate/training'],
  ['Competency Passport', '/candidate/passport'],
  ['Jobs', '/candidate/jobs'],
  ['Applications', '/candidate/applications'],
]

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="service-header">
        <div className="service-header-inner">
          <NavLink to="/candidate" className="brand">
            <img src="/swamarga_eng_logo.png" alt="SWAMARGA" />
          </NavLink>

          <div className="service-title">
            <span>Candidate Services</span>
            <strong>Skill & Workforce Alignment</strong>
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="candidate-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className="portal-layout">
        <aside
          id="candidate-navigation"
          className={`service-sidebar ${open ? 'is-open' : ''}`}
        >
          <div className="sidebar-heading">My Services</div>

          <nav aria-label="Candidate services">
            {navigation.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/candidate'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `service-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <span>Signed in as</span>
            <strong>Riddhi Naskari</strong>
            <span>Candidate</span>
          </div>
        </aside>

        <main id="main-content" className="service-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
