import { useEffect, useRef, useState } from 'react'
import './Wahoowa.css'

const CHANT = 'Wahooooooooowaaaaaaaa'
const HOLD_MS = 2200

// Mark which letters are the stretched/emphasized ones
function classifyChant(text) {
  return [...text].map((char, i) => {
    const lower = char.toLowerCase()
    // the long 'o' run and the long 'a' run are the emphasis
    const isEmphasis = (lower === 'o' || (lower === 'a' && i > 3))
    return { char, i, emphasis: isEmphasis }
  })
}

const LETTERS = classifyChant(CHANT)

export default function Wahoowa({ text, className = '' }) {
  const [show, setShow] = useState(false)
  const timers = useRef([])

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => clear, [])

  const enter = () => {
    if (show) return
    clear()
    setShow(true)
    timers.current.push(
      setTimeout(() => setShow(false), HOLD_MS),
    )
  }

  const leave = () => {
    clear()
    timers.current.push(setTimeout(() => setShow(false), 60))
  }

  return (
    <span
      className={`wahoowa ${className} ${show ? 'is-active' : ''}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <span className="wahoowa__name">{text}</span>
      <span className="wahoowa__chant" aria-hidden="true">
        {LETTERS.map(({ char, i, emphasis }) => (
          <span
            key={i}
            className={`wahoowa__char ${emphasis ? 'is-emphasis' : ''}`}
            style={{ '--i': i, '--total': LETTERS.length }}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="wahoowa__rule" aria-hidden="true" />
    </span>
  )
}
