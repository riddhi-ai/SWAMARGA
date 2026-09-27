import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import mr from './mr.json'
import hi from './hi.json'

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('swamarga_language') || 'en' : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      mr: { translation: mr },
      hi: { translation: hi },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

if (typeof document !== 'undefined') {
  document.documentElement.lang = savedLanguage
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('swamarga_language', lng)
    document.documentElement.lang = lng
  }
})

export default i18n
