import { GitBranch, Handshake, Globe2, Mail, MapPin, Users } from 'lucide-react'
import { LINKS, SITE } from '../config'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import { useTranslation } from 'react-i18next'

const SOCIAL_LINKS = [
  { icon: Globe2, label: 'LinkedIn', href: LINKS.communityLinkedin },
  { icon: Globe2, label: 'Instagram', href: LINKS.instagram },
  { icon: GitBranch, label: 'GitHub', href: LINKS.github },
]

const ENQUIRIES = [
  {
    icon: Users,
    title: 'Community & Collaboration',
    text: 'Have an idea to collaborate or create something with SYNTAXO?',
    subject: 'Community%20Collaboration%20Enquiry',
  },
  {
    icon: Handshake,
    title: 'Partnerships',
    text: 'Reach out to discuss community, event or partnership opportunities.',
    subject: 'Partnership%20Enquiry',
  },
]

export default function ContactPage() {
  const { t } = useTranslation()
  return (
    <section className="min-h-[65vh] border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-faint">{t('contact.eyebrow')}</p>
          <h1 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">{t('contact.title')}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {t('contact.intro')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {ENQUIRIES.map(({ icon: Icon, title, text, subject }, index) => (
            <Reveal key={title} delay={index * 0.06}>
              <a
                href={`${LINKS.contactEmail}?subject=${subject}`}
                className="group block h-full min-w-0 rounded-xl border border-white/[0.08] bg-[#111827]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 sm:p-8"
              >
                <Icon size={22} className="text-violet-300" aria-hidden="true" />
                <h2 className="mt-6 text-xl font-medium">{title === 'Community & Collaboration' ? t('contact.community') : t('contact.partnership')}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{title === 'Community & Collaboration' ? t('contact.communityText') : t('contact.partnershipText')}</p>
                <span className="mt-6 inline-flex min-w-0 items-center gap-2 text-sm text-blue-200">
                  <Mail size={16} aria-hidden="true" />
                  <span className="break-all">syntaxocommunity@gmail.com</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="h-full min-w-0 rounded-xl border border-white/[0.08] bg-[#111827]/70 p-6 sm:p-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{t('contact.contactInfo')}</h2>
              <a href={LINKS.contactEmail} className="mt-5 inline-flex min-w-0 items-center gap-3 text-sm text-white transition-colors hover:text-blue-200">
                <Mail size={18} className="text-blue-200" aria-hidden="true" />
                <span className="break-all">syntaxocommunity@gmail.com</span>
              </a>
              <p className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
                <MapPin size={18} className="text-blue-200" aria-hidden="true" />
                {t('footer.location')}
              </p>
              <a href={LINKS.founderEmail} className="mt-4 inline-block text-sm text-zinc-400 transition-colors hover:text-white">
                {t('contact.founder')}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-xl border border-white/[0.08] bg-[#111827]/70 p-6 sm:p-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{t('contact.connect')}</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2.5 text-sm text-zinc-300 transition hover:border-violet-300/40 hover:text-white">
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
              <Button href={LINKS.join} external icon className="mt-7">{t('nav.join')}</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
