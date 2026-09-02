import BentoCard from '../components/BentoCard'
import FlowDiagram from '../components/FlowDiagram'
import { EXPERIENCE } from '../data'
import './Experience.css'

export default function Experience() {
  return (
    <div className="experience">
      <BentoCard className="experience-lead" tone="cyan" immediate>
        <p className="kicker">Experience</p>
        <h1>What I worked on</h1>
        <p>Roles, systems, and how the pieces connected. Add diagrams, screenshots, and write-ups in data.js.</p>
      </BentoCard>

      {EXPERIENCE.map((job, index) => (
        <article key={job.id} className="experience-job">
          <BentoCard className="experience-head" tone={index % 2 ? 'mint' : 'violet'} delay={0.06 * index}>
            <p className="kicker">{job.dates}</p>
            <h2>{job.role}</h2>
            <p className="experience-org">{job.org}</p>
            <p>{job.summary}</p>
            {job.stack?.length ? (
              <div className="experience-tags">
                {job.stack.map((item) => (
                  <em key={item}>{item}</em>
                ))}
              </div>
            ) : null}
          </BentoCard>

          <BentoCard className="experience-body" delay={0.06 * index + 0.04}>
            {job.highlights?.length ? (
              <ul className="experience-highlights">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {job.sections?.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </section>
            ))}

            {job.diagram ? (
              <FlowDiagram
                caption={job.diagram.caption}
                nodes={job.diagram.nodes}
                image={job.diagram.image}
                imageAlt={job.diagram.imageAlt}
              />
            ) : null}

            {job.images?.filter((item) => item.src).map((item) => (
              <figure key={item.src} className="experience-shot">
                <img src={item.src} alt={item.alt || ''} />
                {item.caption ? <figcaption>{item.caption}</figcaption> : null}
              </figure>
            ))}
          </BentoCard>
        </article>
      ))}
    </div>
  )
}
