import { Link, NavLink, Outlet } from 'react-router-dom'

const sections = [
  ['Overview', '/candidate'],
  ['My profile', '/candidate/profile'],
  ['Market demand', '/candidate/market-demand'],
  ['Skill & evidence gap', '/candidate/skill-evidence-gap'],
  ['Experience Bridge', '/candidate/experience-bridge'],
  ['Training', '/candidate/training'],
  ['Competency Passport', '/candidate/passport'],
  ['Jobs', '/candidate/jobs'],
  ['Applications', '/candidate/applications'],
]

export default function DashboardLayout() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link to="/" className="app-brand">
          <b>SWA</b>MARGA
          <small>Candidate workspace</small>
        </Link>

        <nav className="workspace-nav" aria-label="Candidate workspace">
          {sections.map(([label, href]) => (
            <NavLink key={href} to={href} end={href === '/candidate'}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">Public site</Link>
          <Link to="/login">Sign out</Link>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <div>
            <span>Candidate workspace</span>
            <strong>Riddhi Naskari</strong>
          </div>
          <div className="app-role">Cloud Support Associate · Pune</div>
        </header>
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
