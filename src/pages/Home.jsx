import { Link } from 'react-router-dom'
import BentoCard from '../components/BentoCard'
import Media from '../components/Media'
import ProjectCard from '../components/ProjectCard'
import { IconGitHub, IconLinkedIn, IconMail } from '../components/SocialIcons'
import TechIcon from '../components/TechIcon'
import Wahoowa from '../components/Wahoowa'
import { ABOUT, PERSON, PROJECTS, TECH, TIMELINE } from '../data'
import './Home.css'

const FEATURED = PROJECTS.filter((project) => project.featured).slice(0, 3)
const HOME_TONES = ['cyan', 'mint', 'violet']

export default function Home() {
  return (
    <div className="bento">
      <BentoCard className="bento-photo" immediate>
        <Media src={PERSON.photo} alt={`${PERSON.name} portrait`} fill />
      </BentoCard>

      <BentoCard className="bento-intro" tone="cyan" delay={0.06}>
        <div className="bento-intro__headline">
          <h1>
            {PERSON.first} <em>{PERSON.last}</em>
          </h1>
          <p className="bento-intro__role">{PERSON.role}</p>
          <p className="bento-intro__place">{PERSON.location}</p>
        </div>
        <div className="bento-intro__facts">
          <p className="bento-intro__major">{PERSON.focus}</p>
          <Wahoowa className="bento-intro__school" text={PERSON.school} />
        </div>
      </BentoCard>

      <BentoCard className="bento-about" delay={0.1}>
        <p>{PERSON.about}</p>
      </BentoCard>

      <div className="bento-workhead">
        <p className="kicker">Projects</p>
        <Link to="/projects">View all →</Link>
      </div>

      {FEATURED.map((project, index) => (
        <ProjectCard
          key={project.title}
          className={`bento-proj bento-proj-${index}`}
          project={project}
          index={index}
          delay={0.14 + index * 0.05}
          tone={HOME_TONES[index]}
          teaser
        />
      ))}

      <BentoCard className="bento-tech" tone="cyan" delay={0.3}>
        <p className="kicker">Stack</p>
        <h2>Tools I use</h2>
        <div className="tech-grid">
          {TECH.map((item) => (
            <TechIcon key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </BentoCard>

      <BentoCard className="bento-links" tone="mint" delay={0.34}>
        <p className="kicker">Contact</p>
        <div className="link-list">
          {ABOUT.links.map((item) => {
            const Icon = { Email: IconMail, GitHub: IconGitHub, LinkedIn: IconLinkedIn }[item.label]
            const external = item.href.startsWith('http')

            return (
              <a
                key={item.href}
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
            )
          })}
        </div>
      </BentoCard>

      <BentoCard className="bento-edu" delay={0.36}>
        <p className="kicker">Path</p>
        <h2>Timeline</h2>
        <ul className="edu-list">
          {TIMELINE.toReversed().map((item) => (
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
