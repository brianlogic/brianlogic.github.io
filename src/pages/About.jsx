import BentoCard from '../components/BentoCard'
import { ABOUT, PERSON } from '../data'
import './About.css'

export default function About() {
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
    </div>
  )
}
