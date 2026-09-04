import { useEffect, useState } from 'react'
import './ExperienceCarousel.css'

export default function ExperienceCarousel({ images = [] }) {
  const slides = images.filter((item) => item.src)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [index, slides.length])

  if (!slides.length) return null

  const go = (step) => {
    setIndex((current) => (current + step + slides.length) % slides.length)
  }

  const slide = slides[index] ?? slides[0]

  return (
    <div
      className="experience-carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(-1)
        if (event.key === 'ArrowRight') go(1)
      }}
    >
      <p className="kicker">Screens</p>

      <div className="experience-carousel__stage">
        <button
          type="button"
          className="experience-carousel__nav"
          onClick={() => go(-1)}
          aria-label="Previous screen"
        >
          ←
        </button>

        <figure className="experience-carousel__slide">
          <div className="experience-carousel__frame">
            <img src={slide.src} alt={slide.alt || ''} />
          </div>
          {slide.caption ? <figcaption>{slide.caption}</figcaption> : null}
        </figure>

        <button
          type="button"
          className="experience-carousel__nav"
          onClick={() => go(1)}
          aria-label="Next screen"
        >
          →
        </button>
      </div>

      <div className="experience-carousel__dots" role="tablist" aria-label="Screens">
        {slides.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className={`experience-carousel__dot ${i === index ? 'is-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={item.caption || `Screen ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
