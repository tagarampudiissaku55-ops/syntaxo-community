import Reveal from './Reveal'
import { useTranslation } from 'react-i18next'

export default function Vision() {
 const { t }=useTranslation()
  return (
    <section id="vision" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-faint">{t('vision.label')}</p>
          <blockquote className="max-w-4xl text-2xl font-medium leading-snug tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.2]">
            {t('vision.text')}
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
