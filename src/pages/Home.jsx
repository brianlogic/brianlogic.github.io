import BentoCard from '../components/BentoCard'
import TechIcon from '../components/TechIcon'
import { PERSON, TECH, TIMELINE } from '../data'
import './Home.css'

export default function Home() {
  return (
    <div className="bento">
      <BentoCard className="bento-photo" immediate>
        <img src={PERSON.photo} alt={`${PERSON.name} portrait`} />
      </BentoCard>

      <BentoCard className="bento-intro" tone="cyan" delay={0.06}>
        <h1>
          {PERSON.first} <em>{PERSON.last}</em>
        </h1>
        <p className="bento-intro__role">{PERSON.role}</p>
        <ul className="bento-intro__facts">
          <li>
            <span>Focus</span>
            <strong>{PERSON.focus}</strong>
          </li>
          <li>
            <span>School</span>
            <strong>{PERSON.school}</strong>
          </li>
          <li>
            <span>Location</span>
            <strong>{PERSON.location}</strong>
          </li>
        </ul>
      </BentoCard>

      <BentoCard className="bento-about" delay={0.1}>
        <p>{PERSON.about}</p>
      </BentoCard>

      <BentoCard className="bento-tech" tone="cyan" delay={0.14}>
        <p className="kicker">Stack</p>
        <h2>Tools I use</h2>
        <div className="tech-grid">
          {TECH.map((item) => (
            <TechIcon key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </BentoCard>

      <BentoCard className="bento-links" tone="mint" delay={0.18}>
        <p className="kicker">Contact</p>
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

      <BentoCard className="bento-edu" delay={0.22}>
        <p className="kicker">Path</p>
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

      <BentoCard className="bento-quote" accent delay={0.26}>
        <p>“{PERSON.quote}”</p>
      </BentoCard>
    </div>
  )
}
