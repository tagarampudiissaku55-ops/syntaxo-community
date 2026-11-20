import { CalendarDays, Handshake, Sparkles, Users } from 'lucide-react'
import { COMMUNITY_EVENTS } from '../config'
import Reveal from './Reveal'

const HIGHLIGHT_ICONS = [Users, Handshake, CalendarDays]

function EventCard({ event, index }) {
  return (
    <Reveal
      as="article"
      delay={index * 0.08}
      className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111827] shadow-[0_24px_80px_rgba(27,56,130,0.12)]"
    >
      <div className="grid items-stretch lg:grid-cols-[0.88fr_1.12fr]">
        <figure className="relative flex min-h-80 items-center justify-center overflow-hidden border-b border-white/[0.08] bg-[#080B14] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute -left-20 top-1/4 h-56 w-56 rounded-full bg-[#386BFF]/[0.14] blur-3xl" aria-hidden="true" />
          <img
            src={event.poster}
            alt={event.posterAlt}
            loading="lazy"
            decoding="async"
            className="relative h-auto max-h-[38rem] w-full object-contain"
          />
        </figure>

        <div className="relative flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#8957FF]/[0.12] blur-3xl" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#8957FF]/35 bg-[#8957FF]/[0.1] px-3 py-2 text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-violet-200 sm:text-xs">
              <Handshake size={15} className="shrink-0" aria-hidden="true" />
              {event.partnership}
            </span>

            <h3 className="mt-7 text-3xl font-medium tracking-tight sm:text-4xl">{event.name}</h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-blue-200">
              <Sparkles size={16} aria-hidden="true" />
              {event.community}
            </p>

            <div className="mt-7 grid gap-3 border-y border-white/[0.08] py-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">Organizing community</p>
                <p className="mt-2 text-sm font-medium text-white">{event.organizer}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">Attendance</p>
                <p className="mt-2 text-sm font-medium text-white">{event.attendees} Attendees</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
              {event.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 inline-flex items-start gap-3 rounded-lg border border-[#386BFF]/25 bg-[#386BFF]/[0.08] px-4 py-3 text-sm leading-6 text-blue-100">
              <Sparkles size={17} className="mt-1 shrink-0 text-blue-300" aria-hidden="true" />
              <span>{event.achievement}</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function CommunityEvents() {
  return (
    <section id="events" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,107,255,0.08),transparent_55%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-faint">Community Events &amp; Experiences</p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">Our Community. Our Journey.</h2>
          <p className="mt-5 text-lg leading-relaxed text-blue-100/80 sm:text-xl">
            Every connection creates an opportunity. Every collaboration brings new possibilities.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            At SYNTAXO, we believe in building communities through meaningful connections, collaborations, and shared experiences. Here&apos;s a glimpse of our journey.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8 sm:mt-16">
          {COMMUNITY_EVENTS.map((event, index) => (
            <div key={event.name} className="space-y-8">
              <EventCard event={event} index={index} />
              <div className="grid gap-3 sm:grid-cols-3">
                {event.highlights.map(({ value, label }, highlightIndex) => {
                  const Icon = HIGHLIGHT_ICONS[highlightIndex % HIGHLIGHT_ICONS.length]
                  return (
                    <Reveal key={label} delay={highlightIndex * 0.06}>
                      <div className="flex h-full items-center gap-4 rounded-xl border border-white/[0.08] bg-[#111827]/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#386BFF]/35 sm:p-6">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#386BFF]/25 bg-[#386BFF]/[0.1] text-blue-200">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-2xl font-medium tracking-tight text-white">{value}</p>
                          <p className="mt-1 text-xs leading-5 text-zinc-400 sm:text-sm">{label}</p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
