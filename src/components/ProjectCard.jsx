import BentoCard from './BentoCard'
import './ProjectCard.css'

export function projectWhen(project) {
  return [project.month, project.period].filter(Boolean).join(' · ')
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
}) {
  const links = projectLinks(project)
  const when = projectWhen(project)

  return (
    <BentoCard
      className={`project-card ${project.image ? 'has-image' : ''} ${className}`}
      delay={delay}
      tone={tone}
    >
      {project.image ? (
        <div className="project-image">
          <img src={project.image} alt={project.imageAlt || project.title} />
        </div>
      ) : null}
      {when ? <span>{when}</span> : null}
      <h2>{project.title}</h2>
      <p>{project.blurb}</p>
      <div className="project-footer">
        <div className="project-tags">
          {project.tags.map((tag) => (
            <em key={tag}>{tag}</em>
          ))}
        </div>
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
    </BentoCard>
  )
}
