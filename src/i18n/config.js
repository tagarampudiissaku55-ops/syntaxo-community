import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'
import te from './locales/te.json'

export const LANGUAGE_KEY = 'syntaxo-language'
export const SUPPORTED_LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'English', shortLabel: 'EN' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी', shortLabel: 'हि' },
  { code: 'te', flag: '🇮🇳', label: 'తెలుగు', shortLabel: 'తె' },
]

function getInitialLanguage() {
  const saved = window.localStorage.getItem(LANGUAGE_KEY)
  if (SUPPORTED_LANGUAGES.some((language) => language.code === saved)) return saved
  const browser = navigator.language?.toLowerCase().split('-')[0]
  return SUPPORTED_LANGUAGES.some((language) => language.code === browser) ? browser : 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    te: { translation: te },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnEmptyString: false,
})

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
  window.localStorage.setItem(LANGUAGE_KEY, language)
})

document.documentElement.lang = i18n.language

export default i18n
