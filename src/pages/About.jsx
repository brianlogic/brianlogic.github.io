import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BentoCard from '../components/BentoCard'
import { IconGitHub, IconLinkedIn, IconMail } from '../components/SocialIcons'
import { ABOUT, PERSON } from '../data'
import './About.css'

export default function About() {
  const location = useLocation()
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

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

  const onSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="about-page">
      <BentoCard className="about-lead" tone="violet" immediate>
        <p className="kicker">About</p>
        <h1>Off the resume</h1>
        <p>{ABOUT.lead}</p>
      </BentoCard>

      <BentoCard className="about-photo" delay={0.06}>
        <img src={PERSON.photo} alt={`${PERSON.name} portrait`} />
      </BentoCard>

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

      <BentoCard className="about-form" delay={0.44}>
        <p className="kicker">Contact</p>
        <h2>Say hello</h2>
        <p>A short note is plenty. I’ll write back.</p>
        {sent ? (
          <p className="about-thanks">Thanks — I’ll get back to you soon.</p>
        ) : (
          <form onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" placeholder="Jane Doe" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="jane@example.com" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" placeholder="Enter your message here" required />
            </label>
            <button type="submit">Send Message</button>
          </form>
        )}
      </BentoCard>
    </div>
  )
}
