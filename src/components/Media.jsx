import { useLayoutEffect, useRef, useState } from 'react'
import './Media.css'

export function isVideoSrc(src, type) {
  if (type === 'video') return true
  return typeof src === 'string' && /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

function videoMime(src) {
  if (/\.webm(\?|$)/i.test(src)) return 'video/webm'
  if (/\.mov(\?|$)/i.test(src)) return 'video/quicktime'
  if (/\.mp4(\?|$)/i.test(src)) return 'video/mp4'
  return undefined
}

export default function Media({
  src,
  alt = '',
  type,
  fill = false,
  className = '',
  ...rest
}) {
  const nodeRef = useRef(null)
  const [readySrc, setReadySrc] = useState('')
  const video = isVideoSrc(src, type)
  const ready = Boolean(src) && readySrc === src

  useLayoutEffect(() => {
    const node = nodeRef.current
    if (!node || !src) return

    if (video) {
      if (node.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setReadySrc(src)
      return
    }

    if (node.complete && node.naturalWidth > 0) setReadySrc(src)
  }, [src, video])

  if (!src) return null

  const settle = () => setReadySrc(src)

  return (
    <span
      className={['media', fill && 'is-fill', ready ? 'is-ready' : 'is-wait', className]
        .filter(Boolean)
        .join(' ')}
      aria-busy={!ready}
    >
      <span className="media__loader" aria-hidden="true">
        <span className="media__shimmer" />
        <span className="media__ring" />
      </span>
      {video ? (
        <video
          key={src}
          ref={nodeRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          {...rest}
          onLoadedData={settle}
          onCanPlay={settle}
          onError={settle}
        >
          <source src={src} type={videoMime(src)} />
        </video>
      ) : (
        <img
          key={src}
          ref={nodeRef}
          src={src}
          alt={alt}
          decoding="async"
          {...rest}
          onLoad={settle}
          onError={settle}
        />
      )}
    </span>
  )
}
