import { LockKeyhole, MapPin, Radio } from 'lucide-react'
import Reveal from './Reveal'

const UPCOMING_LOCATIONS = [
  { delay: '0ms' },
  { delay: '180ms' },
  { delay: '360ms' },
  { delay: '540ms' },
]

export default function Location() {
  return (
    <section id="community" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08090d] p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
            <div className="absolute left-[68%] top-[18%] h-56 w-56 rounded-full bg-violet-500/[0.07] blur-3xl" />
            <div className="absolute bottom-[-8rem] right-[-4rem] h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl" />
          </div>

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">Our Expansion Journey</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">
              One Community. Multiple Cities.
            </h2>
            <p className="mt-5 text-xl text-white sm:text-2xl">Starting in Visakhapatnam. Growing beyond boundaries.</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              SYNTAXO aims to expand into more cities, bringing builders, thinkers and innovators together wherever
              ideas are waiting to happen.
            </p>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
              <div className="relative overflow-hidden rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/[0.13] via-[#11131a] to-blue-500/[0.08] p-6 sm:p-8">
                <div className="absolute right-[-3rem] top-[-3rem] h-40 w-40 rounded-full border border-violet-400/10" />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300">Active Community</span>
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>
                </div>

                <div className="mt-12 flex items-end gap-5">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10">
                    <span className="absolute inset-[-8px] animate-ping rounded-full border border-violet-400/20 motion-reduce:animate-none" />
                    <MapPin size={28} strokeWidth={1.5} className="text-violet-200" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">Visakhapatnam</h3>
                    <p className="mt-2 text-sm text-zinc-400">Andhra Pradesh, India</p>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-3 overflow-hidden text-[10px] uppercase tracking-[0.22em] text-zinc-600" aria-hidden="true">
                  <span className="text-violet-300">Origin</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-violet-400/60 to-blue-400/10" />
                  <Radio size={14} className="text-blue-300/70" />
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Future destinations</p>
                <div className="grid grid-cols-2 gap-3">
                  {UPCOMING_LOCATIONS.map((location, index) => (
                    <div
                      key={index}
                      className="group relative min-h-36 overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-violet-500/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 motion-reduce:transform-none"
                      style={{ animation: `syntaxoFloat 4s ease-in-out ${location.delay} infinite` }}
                    >
                      <div className="absolute right-[-2rem] top-[-2rem] h-20 w-20 rounded-full border border-blue-400/10 bg-blue-500/[0.04] blur-sm" />
                      <LockKeyhole size={17} strokeWidth={1.5} className="text-zinc-500 transition-colors group-hover:text-violet-300" aria-hidden="true" />
                      <p className="mt-7 text-2xl font-medium text-zinc-500 blur-[1px] transition-all group-hover:blur-0">???</p>
                      <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-600">Coming Soon · Mystery Location</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/[0.07] pt-8 text-center">
              <p className="text-xl font-medium tracking-tight sm:text-2xl">Every big movement starts somewhere. Ours starts here.</p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                More cities. More communities. More opportunities. The Syntaxo journey is only beginning.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes syntaxoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="syntaxoFloat"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
