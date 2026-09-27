import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { Landmark } from 'lucide-react'

export const GovUtilityBar: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-[#122540] text-[#e2e8f0] text-xs py-1.5 border-b border-[#2d486e]">
      <div className="site-container flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Landmark className="w-3.5 h-3.5 text-[var(--orange)]" aria-hidden="true" />
          <span>{t('common.state')}</span>
          <span className="text-[#718096]">|</span>
          <span className="hidden sm:inline text-[#cbd5e0]">{t('common.prototypeNotice')}</span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
