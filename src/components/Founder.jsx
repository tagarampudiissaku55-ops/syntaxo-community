import { ArrowUpRight } from 'lucide-react'
import { COORDINATORS, LINKS, SITE, TEAM } from '../config'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Founder() {
  return (
    <section id="founder" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Founder" title="The Vision Behind SYNTAXO" />

        <Reveal delay={0.1} className="mt-14 max-w-3xl border-l border-line-strong pl-6 sm:pl-10">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{SITE.founder}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-faint">Founder, SYNTAXO COMMUNITY</p>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Building a platform that connects ambitious minds, encourages collaboration and creates opportunities for
            the next generation of innovators.
          </p>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-white"
          >
            Connect on LinkedIn <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 ml-6 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-white"
          >
            View GitHub <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <h3 className="text-xl font-medium tracking-tight">Community Leadership</h3>
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => {
              const content = (
                <>
                  <div>
                    <p className="text-base font-medium">{member.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-faint">{member.role}</p>
                  </div>
                  {member.linkedin && (
                    <span className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 group-hover:text-white">
                      LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  )}
                </>
              )

              return member.linkedin ? (
                <a
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-card group flex min-h-36 flex-col justify-between bg-bg px-6 py-5"
                >
                  {content}
                </a>
              ) : (
                <div key={member.name} className="team-card flex min-h-36 flex-col justify-between bg-bg px-6 py-5">
                  {content}
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-16">
          <h3 className="text-xl font-medium tracking-tight">Community Coordinators</h3>
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {COORDINATORS.map((member) => {
              const content = (
                <>
                  <div>
                    <p className="text-base font-medium">{member.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-faint">{member.role}</p>
                  </div>
                  {member.linkedin && (
                    <span className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 group-hover:text-white">
                      LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  )}
                </>
              )

              return member.linkedin ? (
                <a
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-card group flex min-h-36 flex-col justify-between bg-bg px-6 py-5"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={member.name}
                  className="team-card flex min-h-36 flex-col justify-between bg-bg px-6 py-5"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
