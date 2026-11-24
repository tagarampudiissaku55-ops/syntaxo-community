import About from '../components/About'
import Hero from '../components/Hero'
import HomeFocus from '../components/HomeFocus'
import Location from '../components/Location'
import JoinCTA from '../components/JoinCTA'
import CommunityEvents from '../components/CommunityEvents'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <HomeFocus />
      <Location />
      <CommunityEvents />
      <JoinCTA />
    </>
  )
}
