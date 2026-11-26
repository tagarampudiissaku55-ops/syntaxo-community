import { COORDINATORS, MEDICAL_TEAM, TEAM } from '../config'
import Reveal from '../components/Reveal'
import TeamMemberCard from '../components/TeamMemberCard'
import { useTranslation } from 'react-i18next'

const MEMBERS_BY_ROLE = [...TEAM, ...MEDICAL_TEAM, ...COORDINATORS].reduce((groups, member) => {
  if (!groups[member.role]) groups[member.role] = []
  groups[member.role].push(member)
  return groups
}, {})

export default function TeamPage() {
  const { t } = useTranslation()
  const roleLabel = (role) => ({
    'Co-lead': t('team.coLead'),
    'Operations Lead': t('team.operations'),
    'Tech Lead': t('team.tech'),
    'Digital Lead': t('team.digital'),
    'Tech Team': t('team.techTeam'),
    'Event Coordinator': t('team.event'),
    'Community Coordinator': t('team.community'),
    'Content Creation': t('team.content'),
  }[role] || role)
  return (
    <section className="min-h-[60vh] border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-faint">{t('team.eyebrow')}</p>
          <h1 className="mt-5 text-3xl font-medium tracking-tight sm:text-5xl">{t('team.title')}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t('team.intro')}
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {Object.entries(MEMBERS_BY_ROLE).map(([role, members], groupIndex) => (
            <section key={role} aria-labelledby={`team-${groupIndex}`}>
              <Reveal>
                <h2 id={`team-${groupIndex}`} className="text-xl font-medium tracking-tight sm:text-2xl">{roleLabel(role)}</h2>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                  <TeamMemberCard key={member.name} member={member} delay={(index % 3) * 0.05} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
