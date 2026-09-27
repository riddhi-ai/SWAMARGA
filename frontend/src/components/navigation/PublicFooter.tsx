import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, ExternalLink } from 'lucide-react'

export const PublicFooter: React.FC = () => {
  const { t, i18n } = useTranslation()

  return (
    <footer className="bg-[#122540] text-[#cbd5e0] pt-12 pb-8 border-t-4 border-[var(--orange)]">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#2d486e]">
          {/* Column 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded inline-block">
                <img
                  src={i18n.language.startsWith('en') ? '/swamarga_eng_logo.png' : '/swamarga_hin_mar_logo.png'}
                  alt="SWAMARGA Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-[#a0aec0] leading-relaxed">
              {t('common.fullName')}
            </p>
            <div className="text-xs text-[#e2e8f0] font-semibold pt-1">
              {t('common.state')}
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              {t('nav.about')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/collaborators" className="hover:text-white transition-colors">
                  {t('nav.collaborators')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  {t('nav.help')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Workspaces */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Workspaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/candidate" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>{t('common.candidate')} Portal</span>
                  <ExternalLink className="w-3 h-3 text-[var(--orange)]" />
                </Link>
              </li>
              <li>
                <Link to="/institute" className="hover:text-white transition-colors">
                  {t('common.institute')} Workspace
                </Link>
              </li>
              <li>
                <Link to="/employer" className="hover:text-white transition-colors">
                  {t('common.employer')} Workspace
                </Link>
              </li>
              <li>
                <Link to="/government" className="hover:text-white transition-colors">
                  {t('common.government')} Intelligence
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  {t('common.admin')} Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Accessibility */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Compliance & Notice
            </h4>
            <p className="text-xs text-[#a0aec0] leading-relaxed mb-3">
              Designed in alignment with UX4G 3.0 and WCAG 2.2 AA accessibility principles for public digital services.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#3e9b45] bg-[#1a382c] px-2.5 py-1 rounded border border-[#2e7a34]/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>WCAG 2.2 AA Targeted</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a0aec0] gap-3">
          <div>
            © 2026 SWAMARGA. Government Workforce Intelligence Digital Service Prototype.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--orange)] font-semibold">
              {t('common.prototypeNotice')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
