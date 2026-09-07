import { useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS } from '../data'
import './Projects.css'

const TONES = ['cyan', 'mint', 'violet', 'cyan', 'mint']

const SLOTS = [
  { className: 'is-hero', compact: false, showcase: true },
  { className: 'is-side', compact: true, showcase: false },
  { className: 'is-side', compact: true, showcase: false },
  { className: 'is-wide', compact: false, showcase: false },
  { className: 'is-wide', compact: false, showcase: false },
]

const DEFAULT_HERO = PROJECTS.find((project) => project.hero) ?? PROJECTS[0]

function orderAround(focusedTitle) {
  const focused = PROJECTS.find((project) => project.title === focusedTitle) ?? DEFAULT_HERO
  const rest = PROJECTS.filter((project) => project.title !== focused.title)
  return [focused, ...rest].slice(0, 5)
}

export default function Projects() {
  const [focused, setFocused] = useState(DEFAULT_HERO.title)
  const lineup = useMemo(() => orderAround(focused), [focused])

  return (
    <div className="projects">
      <div className="projects-head">
        <p className="kicker">Projects</p>
        <h1>Five builds</h1>
        <p>Focus any project to open it in the big card.</p>
      </div>

      {lineup.map((project, index) => {
        const slot = SLOTS[index]
        const isHero = index === 0
        return (
          <ProjectCard
            key={project.title}
            className={`projects-card projects-card-${index} ${slot.className}`}
            project={project}
            index={index}
            delay={0.06 * index}
            tone={TONES[index]}
            compact={slot.compact}
            showcase={slot.showcase}
            onFocus={isHero ? undefined : () => setFocused(project.title)}
          />
        )
      })}
    </div>
  )
}
