import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { LINKS, NAV_ITEMS } from '../config'
import Button from './Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-black/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <Link to="/" className="flex items-center gap-3" aria-label="SYNTAXO Community home" onClick={close}>
          <img src="/logo-mark.png" alt="" width="36" height="36" className="h-9 w-9" />
          <img src="/logo-wordmark.png" alt="SYNTAXO" width="120" height="17" className="hidden h-[15px] w-auto sm:block" />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) => `relative text-sm transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-white after:transition-all after:duration-300 ${
                  isActive ? 'text-white after:w-full' : 'text-muted after:w-0 hover:after:w-full'
                }`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href={LINKS.join} external className="!px-5 !py-2.5">
              Join Community
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 pt-6 sm:px-8">
              {NAV_ITEMS.map(({ label, path }) => (
                <li key={path} className="border-b border-line">
                  <NavLink
                    to={path}
                    end={path === '/'}
                    onClick={close}
                    className={({ isActive }) => `block py-5 text-2xl font-medium tracking-tight ${isActive ? 'text-white' : 'text-muted'}`}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-8">
                <Button href={LINKS.join} external className="w-full" onClick={close}>
                  Join Community
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
