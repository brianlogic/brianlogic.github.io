import ProjectCard from '../components/ProjectCard'
import { PROJECTS } from '../data'
import './Projects.css'

export default function Projects() {
  return (
    <div className="projects">
      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} delay={0.06 * index} />
      ))}
    </div>
  )
}
