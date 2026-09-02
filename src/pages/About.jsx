import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BentoCard from '../components/BentoCard'
import { IconGitHub, IconLinkedIn, IconMail } from '../components/SocialIcons'
import { ABOUT, PERSON } from '../data'
import './About.css'

export default function About() {
  const location = useLocation()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (location.hash !== '#contact') return
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="about-page">
      <BentoCard className="about-lead" tone="violet" immediate>
        <p className="kicker">About</p>
        <h1>Off the resume</h1>
        <p>{ABOUT.lead}</p>
      </BentoCard>

      {ABOUT.photos.map((photo, index) => (
        <BentoCard
          key={photo.alt}
          className={`about-photo about-photo-${index}`}
          delay={0.06 + index * 0.04}
        >
          <img src={photo.src} alt={photo.alt} />
        </BentoCard>
      ))}

      {ABOUT.cards.map((card, index) => (
        <BentoCard
          key={card.title}
          className={`about-card about-card-${index}`}
          tone={['cyan', 'mint', 'violet', ''][index % 4] || undefined}
          delay={0.08 + index * 0.05}
        >
          <p className="kicker">{String(index + 1).padStart(2, '0')}</p>
          <h2>{card.title}</h2>
          <p>{card.body}</p>
        </BentoCard>
      ))}

      <BentoCard className="about-likes" accent delay={0.28}>
        <p className="kicker kicker-on-accent">Into</p>
        <ul>
          {ABOUT.likes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </BentoCard>

      <BentoCard className="about-mail" tone="mint" delay={0.32}>
        <p id="contact">
          <IconMail />
          Email
        </p>
        <button type="button" onClick={copyEmail}>
          {copied ? 'Copied' : PERSON.email}
        </button>
      </BentoCard>

      <BentoCard className="about-social" delay={0.36} href={PERSON.github} tone="cyan">
        <h2>
          <IconGitHub />
          GitHub
        </h2>
      </BentoCard>

      <BentoCard className="about-social about-linkedin" delay={0.4} href={PERSON.linkedin} tone="violet">
        <h2>
          <IconLinkedIn />
          LinkedIn
        </h2>
      </BentoCard>
    </div>
  )
}
