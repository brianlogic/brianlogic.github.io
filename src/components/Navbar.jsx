import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => (prev ? y > 8 : y > 24))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(9, 9, 9, 0.78)' : 'rgba(9, 9, 9, 0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      aria-label="Primary"
    >
      <motion.div className="nav-pill" layout transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
        <AnimatePresence initial={false}>
          {scrolled && (
            <motion.span
              className="nav-mark"
              initial={{ opacity: 0, scale: 0.6, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 28 }}
              exit={{ opacity: 0, scale: 0.6, width: 0 }}
              transition={{ duration: 0.28 }}
              aria-hidden="true"
            >
              BT
            </motion.span>
          )}
        </AnimatePresence>

        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    className="nav-link__pill"
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="nav-link__label">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </motion.div>

      <motion.span className="nav-progress" style={{ scaleX: scrollYProgress }} />
    </motion.nav>
  )
}
