import { useState } from 'react'
import BentoCard from '../components/BentoCard'
import { PERSON } from '../data'
import './Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

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
    <div className="contact">
      <BentoCard className="contact-mail" delay={0.05}>
        <p>Email</p>
        <button type="button" onClick={copyEmail}>
          {copied ? 'Copied' : PERSON.email}
        </button>
      </BentoCard>

      <BentoCard className="contact-social" delay={0.1} href={PERSON.github}>
        <h2>GitHub</h2>
        <p>Find more of my repositories</p>
      </BentoCard>

      <BentoCard className="contact-social" delay={0.14} href={PERSON.linkedin}>
        <h2>LinkedIn</h2>
        <p>Let’s connect</p>
      </BentoCard>

      <BentoCard className="contact-form" delay={0.18}>
        <h2>Say hello</h2>
        <p>A short note is plenty. I’ll write back.</p>
        {sent ? (
          <p className="contact-thanks">Thanks — I’ll get back to you soon.</p>
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
