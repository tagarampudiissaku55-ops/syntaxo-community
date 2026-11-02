import Reveal from './Reveal'

export default function Vision() {
  return (
    <section id="vision" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-faint">Our Vision</p>
          <blockquote className="max-w-4xl text-2xl font-medium leading-snug tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.2]">
            To build a connected ecosystem where students, developers, creators and entrepreneurs learn together,
            innovate together and grow together.
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
