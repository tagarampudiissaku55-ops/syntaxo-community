import { Globe2 } from 'lucide-react'
import Reveal from './Reveal'

function initials(name) {
  return name.split(' ').map((part) => part[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}

export default function TeamMemberCard({ member, delay = 0 }) {
  const Card = member.linkedin ? 'a' : 'div'
  const linkProps = member.linkedin
    ? { href: member.linkedin, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${member.name} on LinkedIn` }
    : {}

  return (
    <Reveal delay={delay} className="h-full">
      <Card {...linkProps} className="team-card group relative flex min-h-48 h-full flex-col justify-between overflow-hidden rounded-lg border border-white/[0.08] bg-[#141414] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-4">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-base font-medium text-white transition-all duration-300 group-hover:scale-105 group-hover:border-violet-400/60">
            <span aria-hidden="true">{initials(member.name)}</span>
            {member.image && (
              <img
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: member.imagePosition || 'center' }}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                onError={(event) => { event.currentTarget.style.display = 'none' }}
              />
            )}
          </div>
          {member.linkedin && <Globe2 size={18} strokeWidth={1.6} className="mt-1 text-zinc-500 transition-colors group-hover:text-violet-300" aria-hidden="true" />}
        </div>
        <div className="mt-8">
          <h3 className="text-base font-medium leading-snug text-white">{member.name}</h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-zinc-500">{member.role}</p>
        </div>
      </Card>
    </Reveal>
  )
}
