import { Link } from 'react-router-dom'
import { LINKS, NAV_ITEMS, SITE } from '../config'
import Reveal from './Reveal'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: LINKS.communityLinkedin },
  { label: 'Instagram', href: LINKS.instagram },
  { label: 'GitHub', href: LINKS.github },
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
            <div>
              <Link to="/" aria-label="SYNTAXO Community home">
                <img src="/logo-mark.png" alt="SYNTAXO logo" width="44" height="44" className="h-11 w-11" loading="lazy" />
              </Link>
              <p className="mt-5 text-sm font-medium tracking-[0.25em]">{SITE.fullName}</p>
              <p className="mt-2 text-xs tracking-[0.25em] text-faint">{SITE.tagline}</p>
              <p className="mt-5 text-sm leading-6 text-muted">{SITE.location}</p>
            </div>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Explore</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted">
                {NAV_ITEMS.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="footer-link transition-colors duration-300 hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Connect</h2>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link transition-colors duration-300 hover:text-white">{label}</a>
                  </li>
                ))}
                <li><a href={LINKS.join} target="_blank" rel="noopener noreferrer" className="footer-link transition-colors duration-300 hover:text-white">Join Community</a></li>
                <li><a href={LINKS.contactEmail} className="footer-link transition-colors duration-300 hover:text-white">Email</a></li>
              </ul>
              <a href={LINKS.contactEmail} className="mt-5 inline-block text-sm text-zinc-400 transition-colors hover:text-white">syntaxocommunity@gmail.com</a>
            </div>
          </div>

          <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
            Copyright &copy; 2026 SYNTAXO COMMUNITY. All rights reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
