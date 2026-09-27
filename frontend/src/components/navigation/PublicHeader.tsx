import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ArrowRight, UserCircle } from 'lucide-react'

export const PublicHeader: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/collaborators', label: t('nav.collaborators') },
    { to: '/help', label: t('nav.help') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <header className="bg-white border-b border-[#d9dde1] sticky top-0 z-40 shadow-xs">
      <div className="site-container">
        <div className="flex items-center justify-between py-3">
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3.5 text-inherit no-underline">
            <img
              src={i18n.language.startsWith('en') ? '/swamarga_eng_logo.png' : '/swamarga_hin_mar_logo.png'}
              alt="SWAMARGA Logo"
              className="h-11 w-auto object-contain"
              onError={(e) => {
                // Fallback text badge if image fails
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-semibold rounded transition-colors no-underline ${
                    isActive
                      ? 'text-[var(--orange)] bg-[var(--orange-light)]'
                      : 'text-[#2d3748] hover:text-[var(--navy)] hover:bg-[#f1f3f5]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Portal Access Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/login"
              className="gov-btn gov-btn-secondary gov-btn-sm"
            >
              <UserCircle className="w-4 h-4 mr-1 text-[var(--navy)]" />
              {t('common.signIn')}
            </Link>
            <Link
              to="/candidate"
              className="gov-btn gov-btn-primary gov-btn-sm"
            >
              {t('home.candidateCta')}
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="md:hidden p-2 text-[#2d3748] hover:bg-[#f1f3f5] rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#eef1f3] space-y-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-semibold rounded no-underline ${
                      isActive
                        ? 'text-[var(--orange)] bg-[var(--orange-light)]'
                        : 'text-[#2d3748] hover:bg-[#f1f3f5]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="pt-3 border-t border-[#eef1f3] flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="gov-btn gov-btn-secondary text-center"
              >
                {t('common.signIn')}
              </Link>
              <Link
                to="/candidate"
                onClick={() => setMobileMenuOpen(false)}
                className="gov-btn gov-btn-primary text-center"
              >
                {t('home.candidateCta')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
