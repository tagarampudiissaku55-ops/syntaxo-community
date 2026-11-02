import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Vision from './components/Vision'
import Location from './components/Location'
import Founder from './components/Founder'
import JoinCTA from './components/JoinCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Vision />
        <Location />
        <Founder />
        <JoinCTA />
      </main>
      <Footer />
    </>
  )
}
