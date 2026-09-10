import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PERSON } from '../data'
import { DESKTOP_APPS } from '../desktop'
import { IconGitHub, IconLinkedIn, IconMail } from './SocialIcons'
import './Dock.css'

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 4.2 4 10.4V20h5.2v-5.6h5.6V20H20v-9.6L12 4.2Z" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 6.5V5.75A1.75 1.75 0 0 1 10.75 4h2.5A1.75 1.75 0 0 1 15 5.75V6.5h3.25A1.75 1.75 0 0 1 20 8.25v9A1.75 1.75 0 0 1 18.25 19H5.75A1.75 1.75 0 0 1 4 17.25v-9A1.75 1.75 0 0 1 5.75 6.5H9Zm1.5-.75c0-.14.11-.25.25-.25h2.5c.14 0 .25.11.25.25V6.5h-3V5.75Z"
      />
    </svg>
  )
}

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z"
      />
    </svg>
  )
}

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a3.75 3.75 0 1 0-3.75-3.75A3.75 3.75 0 0 0 12 12Zm0 1.5c-3.3 0-7 1.68-7 4.25V19h14v-1.25c0-2.57-3.7-4.25-7-4.25Z"
      />
    </svg>
  )
}

const ICONS = {
  '/': IconHome,
  '/experience': IconBriefcase,
  '/projects': IconGrid,
  '/about': IconPerson,
}

const SOCIAL = [
  { href: `mailto:${PERSON.email}`, label: 'Email', Icon: IconMail },
  { href: PERSON.github, label: 'GitHub', Icon: IconGitHub },
  { href: PERSON.linkedin, label: 'LinkedIn', Icon: IconLinkedIn },
]

function dockScale(hover, index) {
  if (hover == null) return { scale: 1, lift: 0 }
  const distance = Math.abs(hover - index)
  if (distance === 0) return { scale: 1.5, lift: -10 }
  if (distance === 1) return { scale: 1.2, lift: -5 }
  if (distance === 2) return { scale: 1.06, lift: -2 }
  return { scale: 1, lift: 0 }
}

export default function Dock({ frames = {}, current, onOpen }) {
  const [hover, setHover] = useState(null)

  return (
    <nav className="dock" aria-label="Dock">
      <div className="dock__tray" onMouseLeave={() => setHover(null)}>
        {DESKTOP_APPS.map((app, index) => {
          const Icon = ICONS[app.to]
          const { scale, lift } = dockScale(hover, index)
          const closed = frames[app.to]?.closed
          const open = app.to === current && !closed
          return (
            <NavLink
              key={app.to}
              to={app.to}
              end={app.end}
              className={`dock__app ${open ? 'is-open' : ''}`}
              style={{ '--dock-scale': scale, '--dock-lift': `${lift}px` }}
              onMouseEnter={() => setHover(index)}
              onClick={() => onOpen?.(app.to)}
              aria-label={app.label}
            >
              <span className={`dock__icon is-${app.label.toLowerCase()}`}>
                <Icon />
              </span>
              <em>{app.label}</em>
            </NavLink>
          )
        })}

        <span className="dock__rule" aria-hidden="true" />

        {SOCIAL.map((item, index) => {
          const slot = DESKTOP_APPS.length + 1 + index
          const { scale, lift } = dockScale(hover, slot)
          const external = item.href.startsWith('http')
          return (
            <a
              key={item.href}
              href={item.href}
              className="dock__app is-social"
              style={{ '--dock-scale': scale, '--dock-lift': `${lift}px` }}
              onMouseEnter={() => setHover(slot)}
              aria-label={item.label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
            >
              <span className="dock__icon is-social">
                <item.Icon />
              </span>
              <em>{item.label}</em>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
