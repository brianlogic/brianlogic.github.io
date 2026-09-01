import BentoCard from '../components/BentoCard'
import TechIcon from '../components/TechIcon'
import { FACTS, PERSON, TECH, TIMELINE } from '../data'
import './Home.css'

export default function Home() {
  return (
    <div className="bento">
      <BentoCard className="bento-photo" immediate>
        <img src={PERSON.photo} alt={`${PERSON.name} portrait`} />
        <span className="bento-photo__caption">{PERSON.photoCaption}</span>
      </BentoCard>

      <BentoCard className="bento-about" tone="cyan" delay={0.08}>
        <p className="kicker">01 — About</p>
        <h2>A short summary</h2>
        <p>{PERSON.about}</p>
      </BentoCard>

      <BentoCard className="bento-now" tone="mint" delay={0.12}>
        <p className="status">
          <span className="status__dot" />
          Currently
        </p>
        <h2>{PERSON.school}</h2>
        <p>{PERSON.now}</p>
      </BentoCard>

      <BentoCard className="bento-role" accent delay={0.16}>
        <p className="kicker kicker-on-accent">Role</p>
        <h2>{PERSON.role}</h2>
      </BentoCard>

      <BentoCard className="bento-profile" delay={0.1}>
        <h1>
          {PERSON.first} <em>{PERSON.last}</em>
        </h1>
        <p className="bento-profile__place">{PERSON.location}</p>
        <p className="bento-profile__focus">{PERSON.focus}</p>
      </BentoCard>

      <BentoCard className="bento-facts" tone="violet" delay={0.18}>
        <p className="kicker">Snapshot</p>
        <ul className="fact-list">
          {FACTS.map((fact) => (
            <li key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </li>
          ))}
        </ul>
      </BentoCard>

      <BentoCard className="bento-tech" tone="cyan" delay={0.2}>
        <p className="kicker">02 — Stack</p>
        <h2>Tools I reach for</h2>
        <div className="tech-grid">
          {TECH.map((item) => (
            <TechIcon key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </BentoCard>

      <BentoCard className="bento-links" tone="mint" delay={0.22}>
        <p className="kicker">Elsewhere</p>
        <h2>Find me</h2>
        <div className="link-list">
          <a href={PERSON.github} target="_blank" rel="noreferrer">
            GitHub →
          </a>
          <a href={PERSON.linkedin} target="_blank" rel="noreferrer">
            LinkedIn →
          </a>
          <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </div>
      </BentoCard>

      <BentoCard className="bento-edu" delay={0.26}>
        <p className="kicker">03 — Path</p>
        <h2>Timeline</h2>
        <ul className="edu-list">
          {TIMELINE.map((item) => (
            <li key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <span>{item.dates}</span>
              </div>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </BentoCard>

      <BentoCard className="bento-quote" accent delay={0.28}>
        <p>“{PERSON.quote}”</p>
      </BentoCard>
    </div>
  )
}
