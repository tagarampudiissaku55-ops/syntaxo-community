import { ArrowUpRight } from 'lucide-react'

const base =
  'premium-button group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-offset-4'

const variants = {
  solid: 'bg-white text-black hover:bg-neutral-200',
  outline: 'border border-line-strong text-white hover:border-white hover:bg-white/5',
}

export default function Button({ href, variant = 'solid', external = false, icon = false, children, className = '', ...rest }) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...externalProps} {...rest}>
      {children}
      {icon && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  )
}
