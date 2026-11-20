import { BriefcaseBusiness, Cpu, Lightbulb, Users } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const HIGHLIGHTS = [
  { icon: Users, label: 'Networking' },
  { icon: Cpu, label: 'Technology' },
  { icon: Lightbulb, label: 'Innovation' },
  { icon: BriefcaseBusiness, label: 'Opportunities' },
]

export default function About() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="About SYNTAXO" title="More Than Just a Community.">
          SYNTAXO brings students, developers, innovators and tech enthusiasts together to learn, collaborate and create opportunities through technology.
        </SectionHeading>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, label }, index) => (
            <Reveal key={label} delay={index * 0.05}>
              <div className="group flex h-full items-center gap-3 rounded-xl border border-white/[0.08] bg-[#111827]/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#386BFF]/35 hover:shadow-[0_12px_36px_rgba(56,107,255,0.1)] sm:gap-4 sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#386BFF]/25 bg-[#386BFF]/[0.1] text-blue-200 transition duration-300 group-hover:scale-110 group-hover:border-violet-400/40">
                  <Icon size={18} className="transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-white sm:text-base">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <Button href="/about" variant="outline">Explore About Us</Button>
        </Reveal>
      </div>
    </section>
  )
}
