import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function EventGallery({ event }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null)
  const closeButtonRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const lightboxOpen = activePhotoIndex !== null
  const activePhoto = lightboxOpen ? event.photos[activePhotoIndex] : null

  useEffect(() => {
    if (!lightboxOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (keyEvent) => {
      if (keyEvent.key === 'Escape') setActivePhotoIndex(null)
      if (keyEvent.key === 'ArrowRight') {
        setActivePhotoIndex((index) => (index + 1) % event.photos.length)
      }
      if (keyEvent.key === 'ArrowLeft') {
        setActivePhotoIndex((index) => (index - 1 + event.photos.length) % event.photos.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [lightboxOpen, event.photos.length])

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:auto-rows-[9rem] lg:grid-cols-12">
        {event.photos.map((photo, index) => {
          const layout = index === 0
            ? 'sm:col-span-2 lg:col-span-7 lg:row-span-3'
            : 'lg:col-span-5'
          const aspect = index === 0
            ? 'aspect-[16/10] sm:aspect-[2/1] lg:h-full lg:aspect-auto'
            : 'aspect-[4/3] lg:h-full lg:aspect-auto'

          return (
            <figure key={photo.src} className={`group overflow-hidden rounded-xl border border-white/[0.1] bg-[#080B14] ${layout}`}>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(index)}
                aria-label={`Enlarge photo: ${photo.alt}`}
                className={`relative block w-full overflow-hidden ${aspect}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-xs font-medium text-white/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  Enlarge photo
                </span>
              </button>
            </figure>
          )
        })}
      </div>

      <AnimatePresence>
        {lightboxOpen && activePhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(mouseEvent) => {
              if (mouseEvent.target === mouseEvent.currentTarget) setActivePhotoIndex(null)
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${event.name} photo gallery`}
              className="relative flex max-h-full w-full max-w-6xl flex-col items-center justify-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-xs text-white/70" aria-live="polite">
                  {activePhotoIndex + 1} / {event.photos.length}
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  aria-label="Close photo viewer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                >
                  <X size={19} aria-hidden="true" />
                </button>
              </div>

              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[calc(100dvh-8rem)] max-w-full object-contain"
              />
              <p className="max-w-3xl text-center text-sm text-white/75">{activePhoto.alt}</p>

              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex((index) => (index - 1 + event.photos.length) % event.photos.length)}
                  aria-label="Previous photo"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 sm:h-12 sm:w-12"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex((index) => (index + 1) % event.photos.length)}
                  aria-label="Next photo"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 sm:h-12 sm:w-12"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
