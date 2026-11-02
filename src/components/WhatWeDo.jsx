import { Code2, CalendarDays, Wrench, Users, Mic, Rocket } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const ITEMS = [
  { icon: Code2, title: 'Hackathons', text: 'Build innovative solutions.' },
  { icon: CalendarDays, title: 'Tech Events', text: 'Discover emerging technologies.' },
  { icon: Wrench, title: 'Workshops', text: 'Learn practical skills.' },
  { icon: Users, title: 'Networking', text: 'Connect with like-minded people.' },
  { icon: Mic, title: 'Podcasts', text: 'Share stories and perspectives.' },
  { icon: Rocket, title: 'Startup Collaborations', text: 'Turn ideas into opportunities.' },
]

export default function WhatWeDo() {
  return (
    <section id="initiatives" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Initiatives" title="What We Do" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08} className="h-full">
              <article className="premium-card group h-full bg-black p-8 transition-colors duration-300 hover:bg-neutral-950 sm:p-10">
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  className="text-muted transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
                <h3 className="mt-10 text-xl font-medium tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
