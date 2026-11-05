import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Lightbulb, Sparkles, Users, X } from 'lucide-react'
import { LINKS } from '../config'

export default function InitiativeModal({ initiative, onClose }) {
  const closeButtonRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!initiative) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [initiative, onClose])

  const Icon = initiative?.icon

  return (
    <AnimatePresence>
      {initiative && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-5"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="initiative-modal-title"
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-white/10 bg-[#111216] shadow-2xl sm:max-h-[88vh] sm:rounded-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex justify-end border-b border-white/[0.07] bg-[#111216]/95 px-5 py-4 backdrop-blur-md sm:px-7">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-white/30 hover:bg-white/5"
                aria-label="Close initiative details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-blue-500/10 text-violet-300">
                  {Icon && <Icon size={24} strokeWidth={1.5} aria-hidden="true" />}
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">SYNTAXO Initiative</p>
                <h2 id="initiative-modal-title" className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">{initiative.title}</h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">{initiative.description}</p>
              </motion.div>

              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                <ModalSection icon={Sparkles} title="What we conduct">
                  <ul className="space-y-3">
                    {initiative.activities.map((activity) => (
                      <li key={activity} className="flex gap-3 text-sm leading-6 text-zinc-300">
                        <Check size={16} className="mt-1 shrink-0 text-violet-400" aria-hidden="true" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </ModalSection>

                <ModalSection icon={Lightbulb} title="Real-world examples">
                  <ul className="space-y-3">
                    {initiative.examples.map((example) => (
                      <li key={example} className="flex gap-3 text-sm leading-6 text-zinc-300">
                        <Check size={16} className="mt-1 shrink-0 text-blue-400" aria-hidden="true" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </ModalSection>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <ModalSection icon={Users} title="Benefits for students">
                  <ul className="space-y-3">
                    {initiative.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-sm leading-6 text-zinc-300">
                        <Check size={16} className="mt-1 shrink-0 text-violet-400" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </ModalSection>

                <ModalSection icon={Sparkles} title="Why it matters">
                  <p className="text-sm leading-6 text-zinc-300">{initiative.whyItMatters}</p>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">How to get involved</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{initiative.involvement}</p>
                </ModalSection>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-500">Take the next step with SYNTAXO.</p>
                <a
                  href={LINKS.join}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
                >
                  Join SYNTAXO Community
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalSection({ icon: Icon, title, children }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Icon size={18} className="text-zinc-400" aria-hidden="true" />
        <h3 className="text-sm font-medium tracking-tight text-white">{title}</h3>
      </div>
      {children}
    </section>
  )
}
