import { useState } from 'react'
import BentoCard from './BentoCard'
import ProjectDemo, { projectDemos } from './ProjectDemo'
import './ProjectCard.css'

export function projectWhen(project) {
  return project.period || ''
}

export function projectLinks(project) {
  if (Array.isArray(project.links) && project.links.length) {
    return project.links.filter((item) => item?.href)
  }
  if (project.link) {
    return [{ href: project.link, label: project.linkLabel }]
  }
  return []
}

export function workLabel(item) {
  if (item.label) return item.label

  try {
    const url = new URL(item.href)
    const host = url.hostname.replace(/^www\./, '')
    const path = url.pathname.toLowerCase()

    if (host.includes('github')) return 'Code'
    if (path.endsWith('.pdf') || host.includes('arxiv') || host.includes('scholar')) {
      return 'Paper'
    }
  } catch {
    return 'Live demo'
  }

  return 'Live demo'
}

export default function ProjectCard({
  project,
  index,
  delay = 0,
  tone,
  className = '',
  teaser = false,
  compact = false,
  showcase = false,
  onFocus,
}) {
  const links = projectLinks(project)
  const when = projectWhen(project)
  const description = project.description || project.blurb
  const tags = project.tags || []
  const demos = projectDemos(project)
  const [toolsOpen, setToolsOpen] = useState(false)
  const shortCopy = teaser || compact

  return (
    <BentoCard
      className={`project-card ${showcase ? 'is-showcase' : ''} ${onFocus ? 'is-focusable' : ''} ${project.image && !showcase ? 'has-image' : ''} ${className}`}
      delay={delay}
      tone={tone}
      onClick={
        onFocus
          ? (event) => {
              if (event.target.closest('a, button')) return
              onFocus()
            }
          : undefined
      }
    >
      {showcase ? <ProjectDemo slides={demos} title={project.title} /> : null}
      {!showcase && project.image ? (
        <div className="project-image">
          <img src={project.image} alt={project.imageAlt || project.title} />
        </div>
      ) : null}
      <div className="project-main">
        {when ? <span className="project-when">{when}</span> : null}
        <h2>{project.title}</h2>
        <div className="project-body">
          {shortCopy ? (
            description ? <p>{description}</p> : null
          ) : (
            <div className="project-copy">
              {description ? (
                <section>
                  <p className="kicker">Description</p>
                  <p>{description}</p>
                </section>
              ) : null}
              {project.did ? (
                <section>
                  <p className="kicker">What I did</p>
                  <p>{project.did}</p>
                </section>
              ) : null}
            </div>
          )}
        </div>
        <div className="project-footer">
          <div className="project-footer__bar">
            {onFocus ? (
              <button type="button" className="project-focus" onClick={onFocus}>
                Focus
              </button>
            ) : null}
            {teaser && tags.length ? (
              <div className="project-tags">
                {tags.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
            ) : null}
            {!onFocus && !teaser && tags.length ? (
              <button
                type="button"
                className={`project-tools ${toolsOpen ? 'is-open' : ''}`}
                aria-expanded={toolsOpen}
                onClick={() => setToolsOpen((open) => !open)}
              >
                Tools used
              </button>
            ) : null}
            {links.length ? (
              <div className="project-links">
                {links.map((item) => (
                  <a key={item.href} className="project-link" href={item.href} target="_blank" rel="noreferrer">
                    {workLabel(item)} →
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          {!teaser && toolsOpen && tags.length ? (
            <div className="project-tags">
              {tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </BentoCard>
  )
}
