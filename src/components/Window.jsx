import { useEffect, useRef } from 'react'
import './Window.css'

const MIN_W = 480
const MIN_H = 320
const HANDLES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function measure(el, stage) {
  const box = el.getBoundingClientRect()
  const area = stage.getBoundingClientRect()
  return {
    x: box.left - area.left,
    y: box.top - area.top,
    w: box.width,
    h: box.height,
  }
}

function fitRect(rect, stage) {
  const maxW = Math.max(MIN_W, stage.width)
  const maxH = Math.max(MIN_H, stage.height)
  const w = clamp(rect.w, MIN_W, maxW)
  const h = clamp(rect.h, MIN_H, maxH)
  return {
    x: clamp(rect.x, 0, Math.max(0, stage.width - w)),
    y: clamp(rect.y, 0, Math.max(0, stage.height - h)),
    w,
    h,
  }
}

export default function Window({
  title,
  children,
  interactive = false,
  frame,
  stageRef,
  onFrame,
  onClose,
  onMinimize,
  onZoom,
}) {
  const windowRef = useRef(null)
  const chromeRef = useRef(null)
  const dragRef = useRef(null)
  const onFrameRef = useRef(onFrame)
  const interactiveRef = useRef(interactive)
  const zoomedRef = useRef(frame.zoomed)
  onFrameRef.current = onFrame
  interactiveRef.current = interactive
  zoomedRef.current = frame.zoomed

  useEffect(() => {
    const begin = (event, kind, handle) => {
      if (!interactiveRef.current || zoomedRef.current || event.button !== 0) return
      if (kind === 'move' && event.target.closest('.window-light')) return

      const stage = stageRef?.current
      const node = windowRef.current
      if (!stage || !node) return

      if (kind === 'resize') {
        event.preventDefault()
        event.stopPropagation()
      }

      const start = measure(node, stage)
      onFrameRef.current({ rect: start, zoomed: false })
      dragRef.current = { kind, handle, originX: event.clientX, originY: event.clientY, start }

      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        /* synthetic pointers cannot capture */
      }
    }

    const applyDrag = (event) => {
      const drag = dragRef.current
      const stage = stageRef?.current
      if (!drag || !stage) return

      const area = stage.getBoundingClientRect()
      const dx = event.clientX - drag.originX
      const dy = event.clientY - drag.originY
      const next = { ...drag.start }

      if (drag.kind === 'move') {
        next.x = drag.start.x + dx
        next.y = drag.start.y + dy
      } else {
        const handle = drag.handle
        if (handle.includes('e')) next.w = drag.start.w + dx
        if (handle.includes('s')) next.h = drag.start.h + dy
        if (handle.includes('w')) {
          next.x = drag.start.x + dx
          next.w = drag.start.w - dx
        }
        if (handle.includes('n')) {
          next.y = drag.start.y + dy
          next.h = drag.start.h - dy
        }
      }

      onFrameRef.current({ rect: fitRect(next, area), zoomed: false })
    }

    const endDrag = () => {
      dragRef.current = null
    }

    const chrome = chromeRef.current
    const onChromeDown = (event) => begin(event, 'move')
    chrome?.addEventListener('pointerdown', onChromeDown)

    const handleNodes = [...(windowRef.current?.querySelectorAll('.window-handle') ?? [])]
    const onHandleDown = handleNodes.map((node) => {
      const handle = HANDLES.find((name) => node.classList.contains(`is-${name}`))
      const listener = (event) => begin(event, 'resize', handle)
      node.addEventListener('pointerdown', listener)
      return () => node.removeEventListener('pointerdown', listener)
    })

    window.addEventListener('pointermove', applyDrag)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)

    return () => {
      chrome?.removeEventListener('pointerdown', onChromeDown)
      onHandleDown.forEach((off) => off())
      window.removeEventListener('pointermove', applyDrag)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [interactive, frame.zoomed, stageRef])

  const style =
    interactive && frame.rect && !frame.zoomed
      ? {
          left: frame.rect.x,
          top: frame.rect.y,
          width: frame.rect.w,
          height: frame.rect.h,
        }
      : undefined

  return (
    <section
      ref={windowRef}
      className={[
        'window',
        interactive ? 'is-managed' : 'is-static',
        interactive && frame.rect ? 'has-rect' : '',
        interactive && frame.zoomed ? 'is-zoomed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <div ref={chromeRef} className={`window-chrome ${interactive ? 'is-live' : ''}`}>
        <span className={`window-lights ${interactive ? 'is-live' : ''}`}>
          <button
            type="button"
            className="window-light is-close"
            aria-label="Close"
            disabled={!interactive}
            onClick={onClose}
          />
          <button
            type="button"
            className="window-light is-min"
            aria-label="Minimize"
            disabled={!interactive}
            onClick={onMinimize}
          />
          <button
            type="button"
            className="window-light is-zoom"
            aria-label={frame.zoomed ? 'Restore' : 'Zoom'}
            disabled={!interactive}
            onClick={() => {
              if (!frame.zoomed && !frame.rect) {
                const stage = stageRef.current
                const node = windowRef.current
                if (stage && node) onFrame({ rect: measure(node, stage) })
              }
              onZoom()
            }}
          />
        </span>
        {title ? <strong>{title}</strong> : null}
        {interactive ? (
          <button type="button" className="window-chrome__move" aria-label="Move window" />
        ) : null}
      </div>

      <div className="window__body">{children}</div>

      {interactive && !frame.zoomed
        ? HANDLES.map((handle) => (
            <button
              type="button"
              key={handle}
              className={`window-handle is-${handle}`}
              aria-label={`Resize ${handle}`}
            />
          ))
        : null}
    </section>
  )
}
