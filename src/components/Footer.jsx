import { LINKS, SITE } from '../config'
import Reveal from './Reveal'

const FOOTER_LINKS = [
  { label: 'Community LinkedIn', href: LINKS.communityLinkedin, external: true },
  { label: 'WhatsApp Community', href: LINKS.join, external: true },
  { label: 'Instagram', href: LINKS.instagram, external: true },
  { label: 'Email', href: LINKS.contactEmail },
  { label: 'About', href: '#about' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" aria-label="Back to top">
              <img src="/logo-mark.png" alt="SYNTAXO logo" width="44" height="44" className="h-11 w-11" loading="lazy" />
            </a>
            <p className="mt-5 text-sm font-medium tracking-[0.25em]">{SITE.fullName}</p>
            <p className="mt-2 text-xs tracking-[0.25em] text-faint">{SITE.tagline}</p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="footer-link transition-colors duration-300 hover:text-white"
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
          Copyright &copy; 2026 SYNTAXO COMMUNITY. All rights reserved.
        </p>
        </Reveal>
      </div>
    </footer>
  )
}
