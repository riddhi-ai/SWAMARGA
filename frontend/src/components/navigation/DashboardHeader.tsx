import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogOut, ChevronDown } from 'lucide-react'

export interface DashboardHeaderProps {
  currentRole: 'candidate' | 'institute' | 'employer' | 'government' | 'admin'
  onMenuToggle?: () => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentRole }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const roleLabels = {
    candidate: t('common.candidate'),
    institute: t('common.institute'),
    employer: t('common.employer'),
    government: t('common.government'),
    admin: t('common.admin'),
  }

  const roleDetails = {
    candidate: 'Riddhi Naskari · Cloud Support Associate (Pune)',
    institute: 'Government Polytechnic, Pune · Dept of Computer Tech',
    employer: 'TechCloud Solutions Pvt Ltd · Pune Hub',
    government: 'Directorate of Vocational Education & Training, Maharashtra',
    admin: 'Platform Operations & Verification Console',
  }[currentRole]

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value
    navigate(`/${newRole}`)
  }

  return (
    <header className="bg-white border-b border-[#d9dde1] sticky top-0 z-30 shadow-2xs">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Role identification & Context */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[var(--navy)] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {roleLabels[currentRole].charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[var(--navy)]">
                {roleLabels[currentRole]} Workspace
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-[var(--orange-light)] text-[var(--orange-dark)] rounded border border-[#ffd5b8]">
                Demonstration
              </span>
            </div>
            <div className="text-xs text-[#5a6578] truncate max-w-[280px] sm:max-w-md">
              {roleDetails}
            </div>
          </div>
        </div>

        {/* Right: Role Switcher, Language Switcher, Sign Out */}
        <div className="flex items-center gap-3">
          {/* Quick Workspace Switcher for Demo testing */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            <label htmlFor="workspace-select" className="text-[#5a6578] font-medium sr-only">
              Workspace Switcher
            </label>
            <div className="relative">
              <select
                id="workspace-select"
                value={currentRole}
                onChange={handleRoleChange}
                className="bg-[#f8fafc] border border-[#d9dde1] rounded text-xs font-semibold text-[var(--navy)] py-1 pl-2.5 pr-7 focus:ring-1 focus:ring-[var(--navy)] cursor-pointer appearance-none"
              >
                <option value="candidate">Candidate: Riddhi</option>
                <option value="institute">Institute: ITI/Polytechnic</option>
                <option value="employer">Employer: TechCloud</option>
                <option value="government">Government: Maharashtra</option>
                <option value="admin">Platform Admin</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#5a6578] absolute right-2 top-2 pointer-events-none" />
            </div>
          </div>

          <Link
            to="/login"
            className="text-xs font-semibold text-[#5a6578] hover:text-[#d9383a] flex items-center gap-1 py-1 px-2 rounded hover:bg-[#f1f3f5] transition-colors"
            title="Sign out of workspace"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t('common.logout')}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
