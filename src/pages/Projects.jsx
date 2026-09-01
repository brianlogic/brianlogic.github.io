import { Link } from 'react-router-dom'
import BentoCard from '../components/BentoCard'
import { PROJECTS } from '../data'
import './Projects.css'

function workLabel(project) {
  if (project.linkLabel) return project.linkLabel

  try {
    const url = new URL(project.link)
    const host = url.hostname.replace(/^www\./, '')
    const path = url.pathname.toLowerCase()

    if (host.includes('github')) return 'View on GitHub'
    if (path.endsWith('.pdf') || host.includes('arxiv') || host.includes('scholar')) {
      return 'Read the paper'
    }
  } catch {
    return 'View work'
  }

  return 'View work'
}

export default function Projects() {
  return (
    <div className="projects">
      {PROJECTS.map((project, index) => (
        <BentoCard key={project.title} className="project-card" delay={0.06 * index}>
          <span>0{index + 1} / {project.year}</span>
          <h2>{project.title}</h2>
          <p>{project.blurb}</p>
          <div className="project-footer">
            <div className="project-tags">
              {project.tags.map((tag) => (
                <em key={tag}>{tag}</em>
              ))}
            </div>
            {project.link ? (
              <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                {workLabel(project)} →
              </a>
            ) : null}
          </div>
        </BentoCard>
      ))}

      <BentoCard className="project-soon" delay={0.24} accent>
        <h2>Coming soon</h2>
        <p>More work is on the way. In the meantime, say hello.</p>
        <Link to="/contact">Contact →</Link>
      </BentoCard>
    </div>
  )
}
