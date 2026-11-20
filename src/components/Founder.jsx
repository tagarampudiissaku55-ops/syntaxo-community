import { ArrowUpRight, GitBranch, Globe2, Handshake, Lightbulb, Mail, Network } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS, SITE } from '../config'
import Reveal from './Reveal'

function PhilosophyCard({ icon: Icon, title, description }) {
  return (
    <Reveal className="h-full">
      <article className="group flex h-full min-h-44 flex-col rounded-lg border border-white/[0.08] bg-[#161616] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-6">
        <Icon size={22} strokeWidth={1.5} className="text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-violet-300" aria-hidden="true" />
        <h4 className="mt-7 text-sm font-medium uppercase tracking-[0.16em] text-white">{title}</h4>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
      </article>
    </Reveal>
  )
}

export default function Founder() {
  return (
    <section id="founder" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">Founder</p>
          <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-5xl">The Vision Behind SYNTAXO</h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-14 overflow-hidden rounded-lg border border-white/[0.12] bg-[#111111] p-6 sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-violet-500/[0.08] blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <h3 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl">{SITE.founder}</h3>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-violet-300">Founder, SYNTAXO COMMUNITY</p>
              <p className="mt-7 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
                Building a platform that connects ambitious minds, encourages collaboration and creates opportunities for
                the next generation of innovators.
              </p>
              <a href={LINKS.founderEmail} className="mt-7 inline-flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white">
                <Mail size={17} className="text-violet-300" aria-hidden="true" />
                tagarampudiissaku55@gmail.com
              </a>

              <blockquote className="mt-8 border-l-2 border-violet-500 pl-5 text-lg leading-relaxed text-white/90 sm:text-xl">
                “Every meaningful community begins with a vision, grows through collaboration, and creates impact through people.”
              </blockquote>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
                  <Globe2 size={17} className="text-zinc-500 transition-colors group-hover:text-violet-300" aria-hidden="true" />
                  Connect on LinkedIn
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
                  <GitBranch size={17} className="text-zinc-500 transition-colors group-hover:text-violet-300" aria-hidden="true" />
                  View GitHub
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <Reveal delay={0.18} className="mx-auto w-full max-w-[390px]">
              <div className="relative rounded-xl bg-gradient-to-br from-violet-500/70 via-white/[0.12] to-blue-500/70 p-px">
                <div className="absolute inset-[-16px] -z-10 rounded-2xl bg-violet-500/[0.08] blur-2xl" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#161616]">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-medium text-zinc-700" aria-hidden="true">IT</div>
                  <img
                    src="https://res.cloudinary.com/dwz9z3dmp/image/upload/v1793869778/WhatsApp_Image_2026-11-05_at_2.38.34_PM_strhbo.jpg"
                    alt="Issaku Tagarampudi, Founder of SYNTAXO Community"
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.035] motion-reduce:transform-none"
                    onError={(event) => { event.currentTarget.style.display = 'none' }}
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative mt-12 border-t border-white/[0.08] pt-9">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">Community Values · The Syntaxo Philosophy</p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <PhilosophyCard icon={Network} title="Connect" description="Bringing ambitious minds together and building meaningful relationships." />
              <PhilosophyCard icon={Handshake} title="Collaborate" description="Encouraging teamwork, knowledge sharing and community-driven innovation." />
              <PhilosophyCard icon={Lightbulb} title="Create" description="Turning ideas into meaningful projects, solutions and opportunities." />
            </div>
          </div>

          <div className="relative mt-12 flex flex-col gap-6 border-t border-white/[0.08] pt-9 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">Be Part of the Vision.</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
                Join a growing community of builders, thinkers and innovators shaping the future through technology and collaboration.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/team" className="premium-button inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Meet Our Team</Link>
              <a href={LINKS.founderEmail} className="premium-button inline-flex items-center justify-center rounded-full border border-white/[0.16] px-5 py-3 text-sm font-medium text-white hover:border-violet-400/50">Connect With Founder</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
