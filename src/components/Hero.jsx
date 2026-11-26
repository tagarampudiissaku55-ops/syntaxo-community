import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { LINKS } from '../config'
import Button from './Button'
import HomeHeroEffects from './HomeHeroEffects'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(-400)
  const pointerY = useMotionValue(-400)
  const pointerOpacity = useMotionValue(0)
  const glowX = useSpring(pointerX, { stiffness: 55, damping: 22 })
  const glowY = useSpring(pointerY, { stiffness: 55, damping: 22 })
  const glowOpacity = useSpring(pointerOpacity, { stiffness: 70, damping: 24 })
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })
  const trackPointer = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(event.clientX - bounds.left - 192)
    pointerY.set(event.clientY - bounds.top - 192)
    pointerOpacity.set(1)
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-20"
      onPointerMove={trackPointer}
      onPointerLeave={() => pointerOpacity.set(0)}
    >
      <HomeHeroEffects pointerX={glowX} pointerY={glowY} pointerOpacity={glowOpacity} />

      {/* Subtle coding-inspired motif */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 z-[1] -translate-y-1/2 select-none font-medium leading-none tracking-tighter text-white/[0.04] text-[16rem] sm:text-[24rem] lg:right-[2%] lg:text-[34rem]"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {'</>'}
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.p {...fade(0.05)} className="mb-7 text-xs font-medium uppercase tracking-[0.35em] text-faint">
          {t('hero.welcome')}
        </motion.p>

        <motion.h1
          {...fade(0.15)}
          className="max-w-4xl text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          SYNTAXO
          <br />
          <span className="text-muted">{t('hero.title')}</span>
        </motion.h1>

        <motion.p {...fade(0.3)} className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {t('hero.description')}
        </motion.p>

        <motion.div {...fade(0.45)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={LINKS.join} external icon>
            {t('hero.join')}
          </Button>
          <Button href="/about" variant="outline">
            {t('hero.explore')}
          </Button>
        </motion.div>

        <motion.p {...fade(0.6)} className="mt-16 text-[11px] uppercase tracking-[0.35em] text-faint">
          {t('hero.tagline')}
        </motion.p>
      </div>
    </section>
  )
}
