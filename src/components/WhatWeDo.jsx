import { useCallback, useState } from 'react'
import { ArrowUpRight, CalendarDays, Code2, Mic, Rocket, Users, Wrench } from 'lucide-react'
import InitiativeModal from './InitiativeModal'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const ITEMS = [
  {
    icon: Code2,
    title: 'Hackathons',
    text: 'Build innovative solutions.',
    description: 'Hackathons are collaborative technology events where participants work in teams to develop innovative solutions to real-world problems within a limited time.',
    activities: ['12-hour and 24-hour hackathons.', 'AI and machine learning challenges.', 'Web and app development competitions.', 'Problem-solving challenges.', 'Prototype development.', 'Startup innovation competitions.'],
    examples: ['Building AI-powered applications.', 'Developing healthcare solutions.', 'Creating smart education platforms.', 'Building sustainability projects.', 'Developing innovative web and mobile applications.'],
    benefits: ['Improve coding and problem-solving skills.', 'Build real-world projects.', 'Develop teamwork and leadership.', 'Network with developers and mentors.', 'Discover prizes and opportunities.'],
    whyItMatters: 'Hackathons turn ideas into practical prototypes, helping students experience how technology teams solve meaningful problems under real constraints.',
    involvement: 'Join SYNTAXO community updates, form a team through the community, and take part in upcoming hackathon announcements and preparation sessions.',
  },
  {
    icon: CalendarDays,
    title: 'Tech Events',
    text: 'Discover emerging technologies.',
    description: 'Tech events bring students, developers, entrepreneurs and industry professionals together to explore emerging technologies and share knowledge.',
    activities: ['Technology meetups.', 'Developer conferences.', 'AI and Generative AI events.', 'Cloud computing sessions.', 'Product launches and demonstrations.', 'Industry expert talks.', 'Developer community gatherings.'],
    examples: ['Google Developer Group meetups.', 'React Hyderabad community meetups.', 'AI technology conferences.', 'Cloud computing events.', 'Startup technology summits.'],
    benefits: ['Learn about emerging technologies.', 'Meet industry professionals.', 'Discover career opportunities.', 'Expand professional networks.', 'Understand real-world technology trends.'],
    whyItMatters: 'Tech events help students connect classroom learning with current tools, industry conversations and the wider technology ecosystem.',
    involvement: 'Follow SYNTAXO announcements, register for participating events, and share your interests with the community to help shape future sessions.',
  },
  {
    icon: Wrench,
    title: 'Workshops',
    text: 'Learn practical skills.',
    description: 'Interactive learning sessions designed to help students gain practical knowledge and develop technical skills.',
    activities: ['Hands-on coding workshops.', 'Generative AI workshops.', 'Git and GitHub sessions.', 'Web development workshops.', 'Prompt engineering sessions.', 'Robotics and automation workshops.', 'Career development sessions.'],
    examples: ['Build your first AI application.', 'Learn React.js practically.', 'Create projects using GitHub.', 'Explore AI tools and automation.', 'Develop your first website.'],
    benefits: ['Practical learning.', 'Hands-on experience.', 'Technical skill development.', 'Project-building confidence.', 'Guidance from experienced mentors.'],
    whyItMatters: 'Workshops make technical concepts tangible through guided practice, helping students leave with skills they can apply immediately.',
    involvement: 'Join the SYNTAXO community, watch for workshop announcements, register early and bring your questions to the session.',
  },
  {
    icon: Users,
    title: 'Networking',
    text: 'Connect with like-minded people.',
    description: 'Networking helps students connect with developers, founders, entrepreneurs, mentors and like-minded individuals.',
    activities: ['Networking meetups.', 'Founder interactions.', 'Student networking sessions.', 'Community collaborations.', 'Professional introductions.', 'Mentorship connections.'],
    examples: ['Meet startup founders.', 'Connect with developers.', 'Build project teams.', 'Meet industry professionals.', 'Collaborate with other student communities.'],
    benefits: ['Build meaningful connections.', 'Discover opportunities.', 'Improve communication skills.', 'Find collaborators.', 'Grow professional relationships.'],
    whyItMatters: 'Strong communities create access to knowledge, teams and opportunities that students often cannot find by working alone.',
    involvement: 'Participate in SYNTAXO discussions, attend community meetups, introduce yourself and collaborate on student-led projects.',
  },
  {
    icon: Mic,
    title: 'Podcasts',
    text: 'Share stories and perspectives.',
    description: 'A platform where industry experts, founders, developers and innovators share their journeys, experiences, insights and knowledge.',
    activities: ['Founder interviews.', 'Developer conversations.', 'Startup stories.', 'Career discussions.', 'Technology discussions.', 'Student success stories.'],
    examples: ['Conversations with startup founders.', 'Interviews with software engineers.', 'AI industry discussions.', 'Entrepreneur journeys.', 'Career guidance podcasts.'],
    benefits: ['Learn from real experiences.', 'Understand industry challenges.', 'Gain career insights.', 'Discover entrepreneurial journeys.', 'Get inspired by successful people.'],
    whyItMatters: 'Honest stories make career and technology choices more understandable by showing the paths, setbacks and lessons behind success.',
    involvement: 'Join SYNTAXO to receive podcast announcements, submit topic suggestions and nominate community voices worth featuring.',
  },
  {
    icon: Rocket,
    title: 'Startup Collaborations',
    text: 'Turn ideas into opportunities.',
    description: 'An initiative that connects aspiring entrepreneurs, student innovators, startup founders and developers to transform ideas into meaningful solutions.',
    activities: ['Startup networking.', 'Idea validation sessions.', 'Team formation.', 'Product development collaborations.', 'Startup pitching sessions.', 'Mentorship opportunities.', 'Innovation challenges.'],
    examples: ['Students building SaaS products.', 'Collaborating on AI startups.', 'Developing MVPs.', 'Connecting student founders with mentors.', 'Building products with cross-college teams.'],
    benefits: ['Entrepreneurial experience.', 'Real-world product development.', 'Team-building opportunities.', 'Startup ecosystem exposure.', 'Collaboration with innovators.'],
    whyItMatters: 'Startup collaboration gives students a practical way to learn how ideas become products, teams and sustainable solutions.',
    involvement: 'Share your idea or skills with the SYNTAXO community, find compatible collaborators and participate in community innovation sessions.',
  },
]

export default function WhatWeDo() {
  const [activeInitiative, setActiveInitiative] = useState(null)
  const closeModal = useCallback(() => setActiveInitiative(null), [])

  return (
    <section id="initiatives" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Initiatives" title="What We Do" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08} className="h-full">
              <button
                type="button"
                onClick={() => setActiveInitiative(ITEMS[i])}
                className="premium-card group flex h-full w-full flex-col items-start bg-black p-8 text-left transition-colors duration-300 hover:bg-neutral-950 sm:p-10"
                aria-haspopup="dialog"
              >
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  className="text-muted transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
                <h3 className="mt-10 text-xl font-medium tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 transition-colors group-hover:text-white">
                  Explore More
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <InitiativeModal initiative={activeInitiative} onClose={closeModal} />
    </section>
  )
}
