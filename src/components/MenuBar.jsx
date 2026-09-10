import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PERSON } from '../data'
import { DESKTOP_APPS } from '../desktop'
import './MenuBar.css'

function formatClock(date) {
  return date.toLocaleString(undefined, {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function MenuBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="menubar">
      <span className="menubar__mark">BT</span>
      <strong className="menubar__app">Brian Tran</strong>
      <nav className="menubar__nav" aria-label="Primary">
        {DESKTOP_APPS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `menubar__link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="menubar__status">
        <span>{PERSON.location}</span>
        <time dateTime={now.toISOString()}>{formatClock(now)}</time>
      </div>
    </header>
  )
}
