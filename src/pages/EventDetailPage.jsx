import { ArrowLeft, CalendarDays, Handshake, MapPin, Users } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import EventGallery from '../components/EventGallery'
import { EVENTS } from '../data/events'

const EVENT_FACTS = [
  { key: 'date', label: 'Date', Icon: CalendarDays },
  { key: 'location', label: 'Location', Icon: MapPin },
  { key: 'attendance', label: 'Attendance', Icon: Users },
]

export default function EventDetailPage() {
  const { eventSlug } = useParams()
  const event = EVENTS.find(({ slug }) => slug === eventSlug)

  if (!event) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-24 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-faint">Event not found</p>
        <h1 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">This event isn&apos;t here.</h1>
        <Button href="/events" className="mt-8">Back to events</Button>
      </section>
    )
  }

  return (
    <article className="border-b border-line py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All events
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-faint">Event {event.number}</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">{event.name}</h1>
          <p className="mt-3 text-base text-zinc-300 sm:text-lg">
            {event.organizer} <span className="px-1 text-faint">×</span> {event.communityPartner}
          </p>
        </header>

        <dl className="mt-8 grid gap-3 border-y border-white/[0.08] py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="flex items-start gap-3">
            <Users size={17} className="mt-0.5 shrink-0 text-zinc-500" aria-hidden="true" />
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">Organized by</dt>
              <dd className="mt-1.5 text-sm text-white">{event.organizer}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Handshake size={17} className="mt-0.5 shrink-0 text-zinc-500" aria-hidden="true" />
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">Community partner</dt>
              <dd className="mt-1.5 text-sm text-white">{event.communityPartner}</dd>
            </div>
          </div>
          {EVENT_FACTS.map(({ key, label, Icon }) => (
            <div key={key} className="flex min-w-0 items-start gap-3">
              <Icon size={17} className="mt-0.5 shrink-0 text-zinc-500" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">{label}</dt>
                <dd className="mt-1.5 text-sm leading-5 text-white">
                  {key === 'date'
                    ? <time dateTime={event.dateTime}>{event.date}</time>
                    : event[key]}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-8 max-w-3xl space-y-4 text-base leading-7 text-zinc-300">
          {event.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <section className="mt-12 sm:mt-16" aria-labelledby="event-gallery-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-faint">Moments from the day</p>
              <h2 id="event-gallery-heading" className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                Event gallery
              </h2>
            </div>
            <p className="text-sm text-muted">{event.photos.length} photographs</p>
          </div>
          <EventGallery event={event} />
        </section>
      </div>
    </article>
  )
}
