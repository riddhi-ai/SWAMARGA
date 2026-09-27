import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SkipLink } from '../components/ui/SkipLink'
import { GovUtilityBar } from '../components/navigation/GovUtilityBar'

export const AuthLayout: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f5]">
      <SkipLink />
      <GovUtilityBar />
      <main id="main-content" className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-inherit no-underline">
            <img
              src="/swamarga_eng_logo.png"
              alt="SWAMARGA"
              className="h-10 w-auto"
              onError={(e) => {
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
            <span className="text-2xl font-black text-(--navy)">
              SWA<span className="text-(--orange)">MARGA</span>
            </span>
          </Link>
          <p className="text-xs text-[#5a6578] mt-1 font-medium">{t('common.tagline')}</p>
        </div>

        <div className="w-full max-w-md bg-white border border-[#d9dde1] rounded p-6 sm:p-8 shadow-xs">
          <Outlet />
        </div>

        <div className="mt-8 text-center text-xs text-[#5a6578]">
          <span>© 2026 SWAMARGA · {t('common.state')}</span>
        </div>
      </main>
    </div>
  )
}
export default AuthLayout


