import BentoCard from '../components/BentoCard'
import TechIcon from '../components/TechIcon'
import { TIMELINE, PERSON, TECH } from '../data'
import './Home.css'

export default function Home() {
  return (
    <div className="bento">
      <BentoCard className="bento-profile" immediate>
        <span className="avatar" aria-hidden="true">
          <span className="avatar__ring" />
          <span className="avatar__letter">BT</span>
        </span>
        <h1>
          {PERSON.first} <em>{PERSON.last}</em>
        </h1>
        <p className="bento-profile__place">{PERSON.location}</p>
      </BentoCard>

      <BentoCard className="bento-about" delay={0.08}>
        <p className="kicker">01 — About</p>
        <h2>A little quieter than most portfolios.</h2>
        <p>{PERSON.about}</p>
      </BentoCard>

      <BentoCard className="bento-role" accent delay={0.14}>
        <h2>{PERSON.role}</h2>
      </BentoCard>

      <BentoCard className="bento-photo" delay={0.12}>
        <img src={PERSON.photo} alt="Calm ocean at blue hour" />
        <span className="bento-photo__caption">{PERSON.photoCaption}</span>
      </BentoCard>

      <BentoCard className="bento-quote" accent delay={0.22}>
        <p>“{PERSON.quote}”</p>
      </BentoCard>

      <BentoCard className="bento-tech" delay={0.18}>
        <p className="kicker">02 — Stack</p>
        <h2>Tools I reach for</h2>
        <div className="tech-grid">
          {TECH.map((item) => (
            <TechIcon key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </BentoCard>

      <BentoCard className="bento-edu" delay={0.26}>
        <p className="kicker">03 — Path</p>
        <h2>TIMELINE</h2>
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
    </div>
  )
}
