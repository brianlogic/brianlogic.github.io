import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Dock from './components/Dock'
import MenuBar from './components/MenuBar'
import Window from './components/Window'
import About from './pages/About'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Projects from './pages/Projects'
import { appForPath, defaultWindowRect, emptyWindowFrame, hasUsableRect, useDesktopWindowing } from './desktop'
import './components/Desktop.css'

const ease = [0.22, 1, 0.36, 1]

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const app = appForPath(location.pathname)
  const interactive = useDesktopWindowing()
  const stageRef = useRef(null)
  const [frames, setFrames] = useState({})

  const frame = frames[app.to] ?? emptyWindowFrame()
  const open = !frame.closed

  const patchFrame = (key, patch) => {
    setFrames((current) => ({
      ...current,
      [key]: { ...(current[key] ?? emptyWindowFrame()), ...patch },
    }))
  }

  const openApp = (to) => {
    patchFrame(to, { closed: false, minimized: false })
    if (to !== app.to) navigate(to)
  }

  useLayoutEffect(() => {
    if (!interactive) return
    const stage = stageRef.current
    if (!stage) return

    const ensureRect = () => {
      const area = stage.getBoundingClientRect()
      if (area.width < 80 || area.height < 80) return
      setFrames((current) => {
        const existing = current[app.to]
        if (existing?.zoomed || hasUsableRect(existing?.rect)) return current
        return {
          ...current,
          [app.to]: { ...(existing ?? emptyWindowFrame()), rect: defaultWindowRect(area) },
        }
      })
    }

    ensureRect()
    const observer = new ResizeObserver(ensureRect)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [interactive, app.to, open])

  return (
    <div className="desktop">
      <MenuBar onOpen={openApp} />

      <main className="desktop__stage">
        <div className="desktop__stack" ref={stageRef}>
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key={app.to}
                className="desktop__front"
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={
                  frame.minimized
                    ? { opacity: 0, scale: 0.42, y: 90 }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.28, ease }}
                aria-hidden={frame.minimized || undefined}
                inert={frame.minimized ? true : undefined}
                style={{ pointerEvents: frame.minimized ? 'none' : undefined }}
              >
                <Window
                  title={app.title}
                  interactive={interactive}
                  frame={frame}
                  stageRef={stageRef}
                  onFrame={(patch) => patchFrame(app.to, patch)}
                  onClose={() => patchFrame(app.to, { closed: true, minimized: false, zoomed: false })}
                  onMinimize={() => patchFrame(app.to, { minimized: true, zoomed: false })}
                  onZoom={() => patchFrame(app.to, { zoomed: !frame.zoomed })}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
                  </Routes>
                </Window>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      <Dock frames={frames} current={app.to} onOpen={openApp} />
    </div>
  )
}
