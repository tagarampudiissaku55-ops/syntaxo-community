import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Button from './components/Button'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WhatWeDoPage from './pages/WhatWeDoPage'
import EventsPage from './pages/EventsPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'
import EventDetailPage from './pages/EventDetailPage'
import ExperienceHub from './components/ExperienceHub'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function NotFoundPage() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-faint">Page not found</p>
      <h1 className="mt-5 text-4xl font-medium tracking-tight">This page isn&apos;t here.</h1>
      <Button href="/" className="mt-8">Back to Home</Button>
    </section>
  )
}

function SiteLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventSlug" element={<EventDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ExperienceHub />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout />
    </BrowserRouter>
  )
}
