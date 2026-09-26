import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import hi from './hi.json'
import mr from './mr.json'

const STORAGE_KEY = 'swamarga.language'

const savedLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mr: { translation: mr },
    hi: { translation: hi },
  },
  lng: savedLanguage ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

function applyDocumentLanguage(language: string) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = language
}

i18n.on('languageChanged', (language) => {
  window.localStorage.setItem(STORAGE_KEY, language)
  applyDocumentLanguage(language)
})

applyDocumentLanguage(i18n.language)

export default i18n
