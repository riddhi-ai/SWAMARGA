import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  UserCheck,
  TrendingUp,
  GitCompare,
  Briefcase,
  Award,
  GraduationCap,
  FileCheck,
  FolderKanban,
  Building2,
  Sliders,
  Users,
  Building,
  Activity,
  Layers,
  CheckCircle,
  FileText,
  AlertTriangle,
  Settings,
  Database,
  Shield,
  ArrowLeft,
} from 'lucide-react'

export interface DashboardSidebarProps {
  currentRole: 'candidate' | 'institute' | 'employer' | 'government' | 'admin'
  isOpen?: boolean
  onClose?: () => void
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ currentRole, onClose }) => {
  const { t, i18n } = useTranslation()

  // Candidate Navigation Items
  const candidateNav = [
    { to: '/candidate', end: true, label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/candidate/profile', label: t('nav.profile'), icon: UserCheck },
    { to: '/candidate/market-demand', label: t('nav.marketDemand'), icon: TrendingUp },
    { to: '/candidate/skill-evidence-gap', label: t('nav.skillEvidenceGap'), icon: GitCompare },
    { to: '/candidate/experience-bridge', label: t('nav.experienceBridge'), icon: FolderKanban },
    { to: '/candidate/training', label: t('nav.training'), icon: GraduationCap },
    { to: '/candidate/passport', label: t('nav.passport'), icon: Award },
    { to: '/candidate/jobs', label: t('nav.jobs'), icon: Briefcase },
    { to: '/candidate/applications', label: t('nav.applications'), icon: FileCheck },
  ]

  // Institute Navigation Items
  const instituteNav = [
    { to: '/institute', end: true, label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/institute/industry-demand', label: t('nav.marketDemand'), icon: TrendingUp },
    { to: '/institute/courses', label: t('nav.courses'), icon: GraduationCap },
    { to: '/institute/course-health', label: t('nav.courseHealth'), icon: Activity },
    { to: '/institute/curriculum', label: t('nav.curriculum'), icon: FileText },
    { to: '/institute/trainers', label: t('nav.trainers'), icon: Users },
    { to: '/institute/labs', label: t('nav.labs'), icon: Layers },
    { to: '/institute/capacity', label: t('nav.capacity'), icon: Building },
    { to: '/institute/placements', label: t('nav.placements'), icon: Briefcase },
    { to: '/institute/employer-feedback', label: t('nav.employerFeedback'), icon: CheckCircle },
    { to: '/institute/simulator', label: t('nav.simulator'), icon: Sliders },
  ]

  // Employer Navigation Items
  const employerNav = [
    { to: '/employer', end: true, label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/employer/hiring-demand', label: t('nav.hiringDemand'), icon: TrendingUp },
    { to: '/employer/required-skills', label: t('nav.requiredSkills'), icon: GitCompare },
    { to: '/employer/competency-framework', label: t('nav.competencyFramework'), icon: Layers },
    { to: '/employer/candidates', label: t('nav.candidates'), icon: Users },
    { to: '/employer/validate', label: t('nav.validate'), icon: CheckCircle },
    { to: '/employer/jobs', label: t('nav.jobs'), icon: Briefcase },
    { to: '/employer/outcomes', label: t('nav.outcomes'), icon: Activity },
    { to: '/employer/feedback', label: t('nav.employerFeedback'), icon: FileText },
  ]

  // Government Navigation Items
  const governmentNav = [
    { to: '/government', end: true, label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/government/district-intelligence', label: t('nav.districtIntelligence'), icon: Building2 },
    { to: '/government/labour-market', label: t('nav.labourMarket'), icon: TrendingUp },
    { to: '/government/course-intelligence', label: t('nav.courseIntelligence'), icon: Activity },
    { to: '/government/ecosystem', label: t('nav.ecosystem'), icon: Layers },
    { to: '/government/capacity', label: t('nav.capacity'), icon: Building },
    { to: '/government/simulator', label: t('nav.simulator'), icon: Sliders },
    { to: '/government/plans', label: t('nav.plans'), icon: FileText },
    { to: '/government/outcomes', label: t('nav.outcomes'), icon: CheckCircle },
    { to: '/government/alerts', label: t('nav.alerts'), icon: AlertTriangle },
  ]

  // Admin Navigation Items
  const adminNav = [
    { to: '/admin', end: true, label: t('nav.overview'), icon: LayoutDashboard },
    { to: '/admin/users', label: t('nav.users'), icon: Users },
    { to: '/admin/verification', label: t('nav.validate'), icon: CheckCircle },
    { to: '/admin/organisations', label: t('nav.organisations'), icon: Building },
    { to: '/admin/data', label: t('nav.data'), icon: Database },
    { to: '/admin/content', label: t('nav.content'), icon: FileText },
    { to: '/admin/audit', label: t('nav.audit'), icon: Shield },
    { to: '/admin/settings', label: t('nav.settings'), icon: Settings },
  ]

  const items = {
    candidate: candidateNav,
    institute: instituteNav,
    employer: employerNav,
    government: governmentNav,
    admin: adminNav,
  }[currentRole]

  return (
    <aside className="w-64 bg-white border-r border-[#d9dde1] flex flex-col shrink-0 min-h-[calc(100vh-80px)]">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#eef1f3]">
        <Link to="/" className="flex items-center gap-2 text-inherit no-underline">
          <img
            src={i18n.language.startsWith('en') ? '/swamarga_eng_logo.png' : '/swamarga_hin_mar_logo.png'}
            alt="SWAMARGA"
            className="h-8 w-auto"
            onError={(e) => {
              ;(e.target as HTMLElement).style.display = 'none'
            }}
          />
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Workspace Navigation">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded transition-colors no-underline ${
                  isActive
                    ? 'bg-[var(--navy)] text-white'
                    : 'text-[#2d3748] hover:bg-[#f1f3f5] hover:text-[var(--navy)]'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Footer Return Link */}
      <div className="p-3 border-t border-[#eef1f3] bg-[#f8fafc]">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#5a6578] hover:text-[var(--navy)] transition-colors rounded hover:bg-[#eef1f3] no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Service Portal</span>
        </Link>
      </div>
    </aside>
  )
}
