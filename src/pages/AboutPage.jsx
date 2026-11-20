import { Compass, Lightbulb, Target, Users } from 'lucide-react'
import Founder from '../components/Founder'
import Reveal from '../components/Reveal'
import Vision from '../components/Vision'

const DETAILS = [
  {
    icon: Lightbulb,
    title: 'Our Story',
    text: 'SYNTAXO is a technology and innovation-driven community designed to create opportunities for learning, networking, collaboration and real-world experiences. Our journey starts in Visakhapatnam and grows through the people who make this community.',
  },
  {
    icon: Users,
    title: 'Who We Are',
    text: 'SYNTAXO brings together students, developers, entrepreneurs, creators and innovators to connect, learn, collaborate and build the future together.',
  },
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To connect ambitious minds, encourage collaboration and create opportunities for the next generation of innovators.',
  },
  {
    icon: Compass,
    title: 'Why SYNTAXO Exists',
    text: 'Great ideas grow when great minds come together. SYNTAXO creates a place for people to share knowledge, build relationships and turn ideas into opportunities.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-faint">About SYNTAXO</p>
            <h1 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">More Than Just a Community.</h1>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              We believe that great ideas grow when great minds come together.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {DETAILS.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={(index % 2) * 0.06}>
                <article className="h-full rounded-xl border border-white/[0.08] bg-[#111827]/65 p-6 sm:p-8">
                  <Icon size={22} className="text-violet-300" aria-hidden="true" />
                  <h2 className="mt-6 text-xl font-medium tracking-tight">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Vision />
      <Founder />
    </>
  )
}
