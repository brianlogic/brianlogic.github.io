import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BentoCard from '../components/BentoCard'
import Media from '../components/Media'
import { IconGitHub, IconLinkedIn, IconMail } from '../components/SocialIcons'
import { ABOUT } from '../data'
import './About.css'

const LINK_ICON = {
  Email: IconMail,
  GitHub: IconGitHub,
  LinkedIn: IconLinkedIn,
}

export default function About() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#contact') return
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <div className="about-page">
      <BentoCard className="about-lead" tone="violet" immediate>
        <p className="kicker">About</p>
        <p>{ABOUT.body}</p>
      </BentoCard>

      <div className="about-photos">
        {ABOUT.photos.map((photo) => (
          <figure key={photo.alt} className="about-photo">
            <Media src={photo.src} alt={photo.alt} fill />
          </figure>
        ))}
      </div>

      <BentoCard className="about-links" tone="mint" delay={0.22}>
        <p className="kicker" id="contact">
          Contact
        </p>
        <ul>
          {ABOUT.links.map((item) => {
            const Icon = LINK_ICON[item.label]
            const external = item.href.startsWith('http')

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                >
                  {Icon ? <Icon /> : null}
                  <span>
                    <strong>{item.label}</strong>
                    <em>{item.display || item.href}</em>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </BentoCard>
    </div>
  )
}
