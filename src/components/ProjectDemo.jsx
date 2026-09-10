import { useEffect, useState } from 'react'
import { projectDemos } from '../projectMedia'
import Media from './Media'
import { WindowChrome } from './Window'
import './ProjectDemo.css'

export { projectDemos }

export default function ProjectDemo({ slides = [], title = 'Project' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [index, slides.length])

  const slide = slides[index]
  const many = slides.length > 1

  const go = (step) => {
    setIndex((current) => (current + step + slides.length) % slides.length)
  }

  return (
    <div
      className={`project-demo ${slide ? 'has-media' : 'is-empty'}`}
      tabIndex={many ? 0 : undefined}
      onKeyDown={
        many
          ? (event) => {
              if (event.key === 'ArrowLeft') go(-1)
              if (event.key === 'ArrowRight') go(1)
            }
          : undefined
      }
    >
      <WindowChrome meta="Preview" />

      <div className="project-demo__stage">
        {slide ? (
          <Media src={slide.src} alt={slide.alt || title} type={slide.type} />
        ) : (
          <p>Screenshot or GIF of the app in use</p>
        )}
      </div>

      {slide?.caption ? <p className="project-demo__caption">{slide.caption}</p> : null}

      {many ? (
        <div className="project-demo__nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous demo">
            ←
          </button>
          <div className="project-demo__dots" role="tablist" aria-label="Demos">
            {slides.map((item, i) => (
              <button
                key={item.src + i}
                type="button"
                className={i === index ? 'is-active' : ''}
                onClick={() => setIndex(i)}
                aria-label={item.caption || `Demo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next demo">
            →
          </button>
        </div>
      ) : null}
    </div>
  )
}
