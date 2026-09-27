import React from 'react'
import { Outlet } from 'react-router-dom'
import { SkipLink } from '../components/ui/SkipLink'
import { GovUtilityBar } from '../components/navigation/GovUtilityBar'
import { PublicHeader } from '../components/navigation/PublicHeader'
import { PublicFooter } from '../components/navigation/PublicFooter'

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f5]">
      <SkipLink />
      <GovUtilityBar />
      <PublicHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}
export default PublicLayout
