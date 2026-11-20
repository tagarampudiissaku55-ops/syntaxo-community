import { ArrowUpRight, CalendarDays, Code2, Lightbulb, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const FOCUS_AREAS = [
  { icon: Code2, title: 'Technology & Innovation', description: 'Explore ideas and emerging technologies.' },
  { icon: Users, title: 'Community & Networking', description: 'Meet people who are curious and building.' },
  { icon: CalendarDays, title: 'Events & Hackathons', description: 'Learn together through shared experiences.' },
  { icon: Lightbulb, title: 'Learning & Opportunities', description: 'Turn knowledge into meaningful next steps.' },
]

export default function HomeFocus() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-faint">What We Focus On</p>
          <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">Ideas grow better together.</h2>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS_AREAS.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 0.05} className="h-full">
              <article className="group h-full rounded-xl border border-white/[0.08] bg-[#111827]/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#386BFF]/35 hover:shadow-[0_16px_44px_rgba(56,107,255,0.1)] sm:p-6">
                <Icon size={21} className="text-blue-200 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" aria-hidden="true" />
                <h3 className="mt-7 text-base font-medium leading-snug text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <Link to="/what-we-do" className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-200">
            Explore What We Do
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
