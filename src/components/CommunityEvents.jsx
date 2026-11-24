import { CalendarDays, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../data/events'
import Button from './Button'
import Reveal from './Reveal'

const EVENT_DETAILS = [
  { key: 'date', label: 'Date', Icon: CalendarDays },
  { key: 'location', label: 'Location', Icon: MapPin },
  { key: 'attendance', label: 'Attendance', Icon: Users },
]

function EventCard({ event }) {
  return (
    <Reveal
      as="article"
      className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080B14] shadow-[0_24px_80px_rgba(27,56,130,0.12)]"
    >
      <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
        <Link
          to={`/events/${event.slug}`}
          className="group relative flex min-h-56 items-center justify-center overflow-hidden bg-[#05070d] p-3 sm:p-5 lg:min-h-[25rem]"
          aria-label={`View ${event.name} event details`}
        >
          <img
            src={event.photos[0].src}
            alt={event.photos[0].alt}
            loading="lazy"
            decoding="async"
            className="max-h-[28rem] w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
          />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            Event {event.number}
          </span>
        </Link>

        <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-faint">Event {event.number}</p>
          <h3 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">{event.name}</h3>
          <p className="mt-3 text-sm text-muted">
            {event.organizer} <span className="px-1 text-faint">×</span> {event.communityPartner}
          </p>

          <div className="mt-6 grid gap-3 border-y border-white/[0.08] py-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">Organized by</p>
              <p className="mt-1.5 text-sm text-white">{event.organizer}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">Community partner</p>
              <p className="mt-1.5 text-sm text-white">{event.communityPartner}</p>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {EVENT_DETAILS.map(({ key, label, Icon }) => (
              <div key={key} className="flex min-w-0 items-start gap-2.5">
                <Icon size={16} className="mt-0.5 shrink-0 text-zinc-500" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-faint">{label}</dt>
                  <dd className="mt-1 text-sm leading-5 text-zinc-300">{event[key]}</dd>
                </div>
              </div>
            ))}
          </dl>

          <Button href={`/events/${event.slug}`} variant="outline" className="mt-6 self-start">
            View Event
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

export default function CommunityEvents() {
  return (
    <section id="events" className="relative overflow-hidden border-t border-line py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,107,255,0.07),transparent_55%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-8 max-w-3xl sm:mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-faint">Events &amp; Collaborations</p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Community, in action.</h2>
        </Reveal>

        <div className="space-y-6">
          {EVENTS.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </div>
    </section>
  )
}
