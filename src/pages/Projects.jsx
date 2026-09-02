import { Link } from 'react-router-dom'
import BentoCard from '../components/BentoCard'
import { PROJECTS } from '../data'
import './Projects.css'

function projectWhen(project) {
  return [project.month, project.period].filter(Boolean).join(' · ')
}

function projectLinks(project) {
  if (Array.isArray(project.links) && project.links.length) {
    return project.links.filter((item) => item?.href)
  }
  if (project.link) {
    return [{ href: project.link, label: project.linkLabel }]
  }
  return []
}

function workLabel(item) {
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

export default function Projects() {
  return (
    <div className="projects">
      {PROJECTS.map((project, index) => {
        const links = projectLinks(project)

        return (
        <BentoCard
          key={project.title}
          className={`project-card ${project.image ? 'has-image' : ''}`}
          delay={0.06 * index}
        >
          {project.image ? (
            <div className="project-image">
              <img src={project.image} alt={project.imageAlt || project.title} />
            </div>
          ) : null}
          <span>0{index + 1} / {projectWhen(project)}</span>
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
      })}

      <BentoCard className="project-soon" delay={0.24} accent>
        <h2>Coming soon</h2>
        <p>More work is on the way. In the meantime, say hello.</p>
        <Link to="/contact">Contact →</Link>
      </BentoCard>
    </div>
  )
}
