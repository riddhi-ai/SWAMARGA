import React from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Check } from 'lucide-react'

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
  ]

  const currentLang = i18n.language || 'en'

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = langCode
    }
  }

  return (
    <div
      className={`inline-flex items-center gap-1 bg-[#122540] p-1 rounded border border-[#2d486e] ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Languages className="w-3.5 h-3.5 text-[#a0aec0] ml-1.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">Choose language:</span>
      {languages.map((lang) => {
        const isSelected = currentLang.startsWith(lang.code)
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleLanguageChange(lang.code)}
            aria-pressed={isSelected}
            className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer ${
              isSelected
                ? 'bg-(--orange) text-white shadow-xs font-bold'
                : 'text-[#e2e8f0] hover:bg-(--navy) hover:text-white'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 shrink-0" aria-hidden="true" />}
            <span>{lang.label}</span>
          </button>
        )
      })}
    </div>
  )
}


