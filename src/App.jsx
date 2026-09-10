import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dock from './components/Dock'
import MenuBar from './components/MenuBar'
import Window, { WindowChrome } from './components/Window'
import About from './pages/About'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Projects from './pages/Projects'
import { appForPath, stackedApps } from './desktop'
import './components/Desktop.css'

const ease = [0.22, 1, 0.36, 1]

export default function App() {
  const location = useLocation()
  const app = appForPath(location.pathname)
  const backs = stackedApps(location.pathname)

  return (
    <div className="desktop">
      <MenuBar />

      <main className="desktop__stage">
        <div className="desktop__stack">
          {backs.map((item, index) => (
            <div key={item.to} className={`desktop__back is-${index}`} aria-hidden="true">
              <WindowChrome title={item.title} />
            </div>
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="desktop__front"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.28, ease }}
            >
              <Window title={app.title}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
                </Routes>
              </Window>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Dock />
    </div>
  )
}
