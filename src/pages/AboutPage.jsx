import { Compass, Lightbulb, Target, Users } from 'lucide-react'
import Founder from '../components/Founder'
import Reveal from '../components/Reveal'
import Vision from '../components/Vision'
import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()
  const DETAILS = [
    { icon: Lightbulb, title: t('about.storyTitle'), text: t('about.story') },
    { icon: Users, title: t('about.whoTitle'), text: t('about.who') },
    { icon: Target, title: t('about.missionTitle'), text: t('about.mission') },
    { icon: Compass, title: t('about.whyTitle'), text: t('about.why') },
  ]
  return (
    <>
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-faint">{t('about.eyebrow')}</p>
            <h1 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">{t('about.title')}</h1>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t('about.intro')}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {DETAILS.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={(index % 2) * 0.06}>
                <article className="h-full rounded-xl border border-white/[0.08] bg-[#111827]/65 p-6 sm:p-8">
                  <Icon size={22} className="text-violet-300" aria-hidden="true" />
                  <h2 className="mt-6 text-xl font-medium tracking-tight">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Vision />
      <Founder />
    </>
  )
}
