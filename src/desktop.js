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

export function stackedApps(pathname) {
  const current = appForPath(pathname)
  return DESKTOP_APPS.filter((app) => app.to !== current.to).slice(0, 2)
}
