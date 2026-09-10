import { useEffect, useState } from 'react'

export const DESKTOP_APPS = [
  { to: '/', label: 'Home', title: 'Brian Tran', end: true },
  { to: '/experience', label: 'Experience', title: 'Experience' },
  { to: '/projects', label: 'Projects', title: 'Projects' },
  { to: '/about', label: 'About', title: 'About' },
]

export function appForPath(pathname) {
  if (pathname.startsWith('/about') || pathname.startsWith('/contact')) {
    return DESKTOP_APPS.find((app) => app.to === '/about')
  }

  return (
    DESKTOP_APPS.find((app) => (app.end ? pathname === app.to : pathname.startsWith(app.to))) ??
    DESKTOP_APPS[0]
  )
}

export function emptyWindowFrame() {
  return {
    rect: null,
    zoomed: false,
    minimized: false,
    closed: false,
  }
}

const MIN_W = 480
const MIN_H = 320

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function defaultWindowRect(stage) {
  const w = clamp(Math.round(stage.width * 0.86), Math.min(MIN_W, stage.width), stage.width)
  const h = clamp(Math.round(stage.height * 0.88), Math.min(MIN_H, stage.height), stage.height)
  return {
    x: Math.round((stage.width - w) / 2),
    y: Math.round((stage.height - h) / 2),
    w,
    h,
  }
}

export function hasUsableRect(rect) {
  return Boolean(rect && rect.w >= 80 && rect.h >= 80)
}

export function useDesktopWindowing() {
  const [enabled, setEnabled] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (min-width: 721px)').matches
      : false,
  )

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (min-width: 721px)')
    const sync = () => setEnabled(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return enabled
}
