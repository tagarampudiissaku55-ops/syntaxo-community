import { motion, useReducedMotion } from 'framer-motion'

const CIRCUITS = [
  { path: 'M460 178h90l38 38h70l26 26h122', color: '#386BFF', delay: 0 },
  { path: 'M512 614h72l42-42h83l34-34h104', color: '#8957FF', delay: 1.2 },
  { path: 'M720 122v76l32 32v52', color: '#8957FF', delay: 0.6 },
  { path: 'M808 682v-82l-32-32v-48', color: '#386BFF', delay: 1.8 },
]

const PARTICLES = [
  { left: '59%', top: '21%', color: '#386BFF', delay: 0, size: 3 },
  { left: '76%', top: '28%', color: '#8957FF', delay: 1.2, size: 4 },
  { left: '91%', top: '39%', color: '#386BFF', delay: 0.6, size: 2 },
  { left: '67%', top: '77%', color: '#8957FF', delay: 1.8, size: 3 },
  { left: '88%', top: '70%', color: '#386BFF', delay: 0.9, size: 4 },
  { left: '53%', top: '62%', color: '#8957FF', delay: 1.5, size: 2 },
  { left: '95%', top: '17%', color: '#386BFF', delay: 0.3, size: 3 },
]

const SYMBOLS = [
  { text: '</>', left: '62%', top: '34%', delay: 0 },
  { text: '{ }', left: '88%', top: '55%', delay: 0.8 },
  { text: '01', left: '72%', top: '82%', delay: 1.4 },
]

export default function HomeHeroEffects({ pointerX, pointerY, pointerOpacity }) {
  const reduce = useReducedMotion()
  const animation = (value) => reduce ? undefined : value

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_48%,rgba(56,107,255,0.1),transparent_42%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="syntaxo-circuit-fade" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#386BFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#386BFF" stopOpacity="0.8" />
            <stop offset="1" stopColor="#8957FF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {CIRCUITS.map(({ path, color, delay }, index) => (
          <motion.path
            key={path}
            d={path}
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 10"
            initial={false}
            animate={animation({ strokeDashoffset: [0, -56], opacity: [0.12, 0.34, 0.12] })}
            transition={{ duration: 7 + index, delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <motion.path
          d="M520 260C628 316 676 370 760 395s129 74 188 130M548 520c94-43 143-112 216-126s125-69 177-148"
          stroke="url(#syntaxo-circuit-fade)"
          strokeWidth="1"
          strokeDasharray="2 12"
          animate={animation({ strokeDashoffset: [0, -84] })}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <motion.div
        className="absolute left-0 top-0 h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{
          x: pointerX,
          y: pointerY,
          opacity: pointerOpacity,
          background: 'radial-gradient(circle, rgba(56,107,255,0.16), rgba(137,87,255,0.09) 42%, transparent 72%)',
        }}
      />

      <div
        className="absolute right-[-5rem] top-[48%] h-64 w-64 -translate-y-1/2 opacity-35 sm:right-[2%] sm:h-80 sm:w-80 sm:opacity-55 lg:right-[7%] lg:h-[27rem] lg:w-[27rem]"
        style={{ perspective: '900px' }}
      >
        <motion.div
          className="absolute inset-[12%] rounded-full border border-[#386BFF]/20"
          style={{
            background: 'radial-gradient(circle at 34% 29%, rgba(137,87,255,0.3), rgba(56,107,255,0.12) 38%, rgba(8,11,20,0.4) 72%, transparent 78%)',
            boxShadow: 'inset 0 0 38px rgba(56,107,255,0.14), 0 0 54px rgba(56,107,255,0.12)',
            transformStyle: 'preserve-3d',
          }}
          animate={animation({ rotate: [0, 360], scale: [0.98, 1.02, 0.98] })}
          transition={{ rotate: { duration: 36, repeat: Infinity, ease: 'linear' }, scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <div className="absolute inset-[12%] rounded-full border border-violet-300/10" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/35 to-transparent" />
        </motion.div>

        <div className="absolute inset-[3%] rounded-full" style={{ transform: 'rotateX(68deg)', transformStyle: 'preserve-3d' }}>
          <motion.div
            className="absolute inset-0 rounded-full border border-[#386BFF]/35"
            animate={animation({ rotate: 360 })}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <div className="absolute inset-[-7%] rounded-full" style={{ transform: 'rotateY(68deg)', transformStyle: 'preserve-3d' }}>
          <motion.div
            className="absolute inset-0 rounded-full border border-[#8957FF]/30"
            animate={animation({ rotate: -360 })}
            transition={{ duration: 31, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <motion.span
          className="absolute left-[49%] top-[20%] h-2 w-2 rounded-full bg-blue-300"
          style={{ boxShadow: '0 0 18px rgba(56,107,255,0.9)' }}
          animate={animation({ scale: [0.75, 1.25, 0.75], opacity: [0.5, 1, 0.5] })}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {PARTICLES.map(({ left, top, color, delay, size }) => (
        <motion.span
          key={`${left}-${top}`}
          className="absolute rounded-full"
          style={{ left, top, width: size, height: size, backgroundColor: color, boxShadow: `0 0 14px ${color}88` }}
          animate={animation({ y: [0, -10, 0], opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] })}
          transition={{ duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {SYMBOLS.map(({ text, left, top, delay }) => (
        <motion.span
          key={text}
          className="absolute text-[10px] font-medium tracking-[0.18em] text-blue-200/35"
          style={{ left, top }}
          animate={animation({ y: [0, -7, 0], opacity: [0.25, 0.55, 0.25] })}
          transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  )
}
