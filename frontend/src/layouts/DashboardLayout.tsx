import { NavLink, Outlet } from "react-router-dom"
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react"

const navigation = [
  { label: "Overview", path: "/candidate", icon: LayoutDashboard },
  { label: "Market demand", path: "/candidate/market-demand", icon: BarChart3 },
  { label: "Skill & evidence gap", path: "/candidate/skill-evidence-gap", icon: ClipboardCheck },
  { label: "Experience Bridge", path: "/candidate/experience-bridge", icon: GraduationCap },
  { label: "Jobs", path: "/candidate/jobs", icon: BriefcaseBusiness },
  { label: "Profile", path: "/candidate/profile", icon: UserRound },
  { label: "Settings", path: "/candidate/settings", icon: Settings },
]

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img
            src="/swamarga_eng_logo.png"
            alt="SWAMARGA"
            className="sidebar-logo"
          />
        </div>

        <nav aria-label="Candidate navigation" className="sidebar-nav">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/candidate"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="role-label">Candidate workspace</span>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Candidate workspace</p>
            <h1>Career readiness</h1>
          </div>

          <div className="user-summary">
            <span className="user-avatar" aria-hidden="true">RN</span>
            <div>
              <strong>Riddhi Naskari</strong>
              <span>Cloud Support Associate</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
