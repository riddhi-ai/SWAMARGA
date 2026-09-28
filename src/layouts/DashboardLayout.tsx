import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SkipLink } from '../components/ui/SkipLink'
import { GovUtilityBar } from '../components/navigation/GovUtilityBar'
import { DashboardHeader } from '../components/navigation/DashboardHeader'
import { DashboardSidebar } from '../components/navigation/DashboardSidebar'
import type { UserRole } from '../types'
import { Menu, X } from 'lucide-react'

export const DashboardLayout: React.FC<{ role?: UserRole }> = ({ role }) => {
  const location = useLocation()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Infer role from URL path if not explicitly provided
  const detectRole = (): UserRole => {
    if (role) return role
    const path = location.pathname
    if (path.startsWith('/institute')) return 'institute'
    if (path.startsWith('/employer')) return 'employer'
    if (path.startsWith('/government')) return 'government'
    if (path.startsWith('/admin')) return 'admin'
    return 'candidate'
  }

  const currentRole = detectRole()

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f5]">
      <SkipLink />
      <GovUtilityBar />
      <DashboardHeader currentRole={currentRole} />

      {/* Mobile Drawer Trigger Bar */}
      <div className="md:hidden bg-white border-b border-[#d9dde1] px-4 py-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-(--navy) p-1 rounded hover:bg-[#f1f3f5]"
          aria-expanded={mobileSidebarOpen}
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Workspace Menu</span>
        </button>
        <span className="text-xs font-bold text-[#5a6578] uppercase">{currentRole}</span>
      </div>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar currentRole={currentRole} />
        </div>

        {/* Mobile Sidebar Modal */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-50 bg-white w-64 max-w-xs h-full flex flex-col shadow-xl">
              <DashboardSidebar
                currentRole={currentRole}
                onClose={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Workspace Surface */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout


