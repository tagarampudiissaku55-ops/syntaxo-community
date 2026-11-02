import { MapPin } from 'lucide-react'
import Reveal from './Reveal'

export default function Location() {
  return (
    <section id="community" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="rounded-2xl border border-line p-8 transition-colors duration-300 hover:border-line-strong sm:p-14">
          <p className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-faint">
            <MapPin size={14} aria-hidden="true" /> Community Location
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            Visakhapatnam, Andhra Pradesh, India.
          </h2>
          <p className="mt-6 text-xl text-white sm:text-2xl">Starting in Visakhapatnam. Growing beyond boundaries.</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            SYNTAXO aims to expand into more cities, bringing builders, thinkers and innovators together wherever
            ideas are waiting to happen.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
