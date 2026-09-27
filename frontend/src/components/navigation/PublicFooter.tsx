import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, ExternalLink } from 'lucide-react'

export const PublicFooter: React.FC = () => {
  const { t, i18n } = useTranslation()

  const linkStyle = {
    color: '#cbd5e0',
    textDecoration: 'none',
  }

  return (
    <footer
      style={{
        backgroundColor: '#122540',
        color: '#cbd5e0',
        borderTop: '4px solid #e28743',
      }}
      className="pt-12 pb-8"
    >
      <div className="site-container">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10"
          style={{ borderBottom: '1px solid #2d486e' }}
        >
          {/* Column 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded inline-block">
                <img
                  src={
                    i18n.language.startsWith('en')
                      ? '/swamarga_eng_logo.png'
                      : '/swamarga_hin_mar_logo.png'
                  }
                  alt="SWAMARGA Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <p
              className="text-xs leading-relaxed"
              style={{ color: '#a0aec0' }}
            >
              {t('common.fullName')}
            </p>

            <div
              className="text-xs font-semibold pt-1"
              style={{ color: '#e2e8f0' }}
            >
              {t('common.state')}
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-3"
              style={{ color: '#ffffff' }}
            >
              {t('nav.about')}
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/about"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>

              <li>
                <Link
                  to="/collaborators"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('nav.collaborators')}
                </Link>
              </li>

              <li>
                <Link
                  to="/help"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('nav.help')}
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Workspaces */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-3"
              style={{ color: '#ffffff' }}
            >
              WORKSPACES
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/candidate"
                  style={linkStyle}
                  className="transition-colors flex items-center gap-1"
                >
                  <span>
                    {t('common.candidate')} Portal
                  </span>
                  <ExternalLink
                    className="w-3 h-3"
                    style={{ color: '#e28743' }}
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/institute"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('common.institute')} Workspace
                </Link>
              </li>

              <li>
                <Link
                  to="/employer"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('common.employer')} Workspace
                </Link>
              </li>

              <li>
                <Link
                  to="/government"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('common.government')} Intelligence
                </Link>
              </li>

              <li>
                <Link
                  to="/admin"
                  style={linkStyle}
                  className="transition-colors"
                >
                  {t('common.admin')} Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Accessibility */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-3"
              style={{ color: '#ffffff' }}
            >
              COMPLIANCE & NOTICE
            </h4>

            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: '#a0aec0' }}
            >
              Designed in alignment with UX4G 3.0 and WCAG 2.2 AA
              accessibility principles for public digital services.
            </p>

            <div
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded"
              style={{
                color: '#3e9b45',
                backgroundColor: '#1a382c',
                border: '1px solid rgba(46, 122, 52, 0.4)',
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>WCAG 2.2 AA Targeted</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-3"
          style={{ color: '#a0aec0' }}
        >
          <div>
            © 2026 SWAMARGA. Government Workforce Intelligence Digital Service
            Prototype.
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-semibold"
              style={{ color: '#e28743' }}
            >
              {t('common.prototypeNotice')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}