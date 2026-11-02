import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <Reveal className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-faint">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {children && <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{children}</p>}
    </Reveal>
  )
}
