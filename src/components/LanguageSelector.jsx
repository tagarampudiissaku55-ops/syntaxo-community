import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Globe2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../i18n/config'

export default function LanguageSelector({ mobile = false }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = SUPPORTED_LANGUAGES.find((item) => item.code === i18n.language) || SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    const escape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    window.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', escape)
    }
  }, [])

  function choose(code) {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className={mobile ? 'relative w-full' : 'relative'}>
      <button
        type="button"
        className={mobile
          ? 'flex h-11 w-full items-center justify-between rounded-lg border border-line bg-white/[0.03] px-3 text-sm text-white'
          : 'flex h-10 items-center gap-2 rounded-full border border-line px-3 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white'}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Globe2 size={14} aria-hidden="true" />
          <span aria-hidden="true">{current.flag}</span>
          <span>{current.label}</span>
        </span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className={mobile
            ? 'mt-2 grid gap-1 rounded-lg border border-line bg-[#090909] p-1.5'
            : 'absolute right-0 top-[calc(100%+8px)] z-[70] min-w-44 rounded-xl border border-line bg-[#090909] p-1.5 shadow-2xl'}
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              type="button"
              role="option"
              aria-selected={language.code === i18n.language}
              key={language.code}
              onClick={() => choose(language.code)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                language.code === i18n.language
                  ? 'bg-white/[0.1] text-white'
                  : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <span aria-hidden="true">{language.flag}</span>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
