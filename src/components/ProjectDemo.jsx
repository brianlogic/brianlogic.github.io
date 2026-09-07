import { useEffect, useState } from 'react'
import { projectDemos } from '../projectMedia'
import './ProjectDemo.css'

export { projectDemos }

function isVideo(slide) {
  if (slide?.type === 'video') return true
  return typeof slide?.src === 'string' && /\.(mp4|webm|mov)(\?|$)/i.test(slide.src)
}

function videoType(src) {
  if (/\.webm(\?|$)/i.test(src)) return 'video/webm'
  if (/\.mov(\?|$)/i.test(src)) return 'video/quicktime'
  if (/\.mp4(\?|$)/i.test(src)) return 'video/mp4'
  return undefined
}

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
      <div className="project-demo__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>Preview</em>
      </div>

      <div className="project-demo__stage">
        {slide ? (
          isVideo(slide) ? (
            <video autoPlay muted loop playsInline preload="metadata">
              <source src={slide.src} type={videoType(slide.src)} />
            </video>
          ) : (
            <img src={slide.src} alt={slide.alt || title} decoding="async" />
          )
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
