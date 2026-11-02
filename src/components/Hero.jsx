import { motion, useReducedMotion } from 'framer-motion'
import { LINKS } from '../config'
import Button from './Button'

export default function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-20">
      {/* Subtle coding-inspired motif */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-medium leading-none tracking-tighter text-white/[0.04] text-[16rem] sm:text-[24rem] lg:right-[2%] lg:text-[34rem]"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {'</>'}
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.p {...fade(0.05)} className="mb-7 text-xs font-medium uppercase tracking-[0.35em] text-faint">
          Welcome to SYNTAXO
        </motion.p>

        <motion.h1
          {...fade(0.15)}
          className="max-w-4xl text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Where Minds Connect.
          <br />
          <span className="text-muted">Ideas Become Reality.</span>
        </motion.h1>

        <motion.p {...fade(0.3)} className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          SYNTAXO is a growing community bringing together students, developers, entrepreneurs, creators and
          innovators to connect, collaborate and build the future together.
        </motion.p>

        <motion.div {...fade(0.45)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={LINKS.join} external icon>
            Join Our Community
          </Button>
          <Button href="#about" variant="outline">
            Explore SYNTAXO
          </Button>
        </motion.div>

        <motion.p {...fade(0.6)} className="mt-16 text-[11px] uppercase tracking-[0.35em] text-faint">
          Connect. Collaborate. Grow.
        </motion.p>
      </div>
    </section>
  )
}
