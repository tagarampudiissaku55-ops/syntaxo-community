import { LINKS } from '../config'
import Button from './Button'
import Reveal from './Reveal'

export default function JoinCTA() {
  return (
    <section className="border-t border-line py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-faint">Join Our Community</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Your Next Opportunity Starts With a Connection.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Be part of a growing ecosystem of builders, thinkers and innovators.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={LINKS.join} external icon className="!px-9 !py-4 uppercase tracking-[0.15em]">
              Join SYNTAXO
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
