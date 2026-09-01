const ICONS = {
  js: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#7eafc8" />
      <path fill="#0e1319" d="M8 18.2c.4.7 1 .9 1.7.9 1 0 1.6-.5 1.6-2.3v-6.3h1.7V17c0 2.5-1.5 3.6-3.6 3.6-1.9 0-3-.9-3.6-2.1l1.5-.8Zm6.3-.3c.5.9 1.3 1.5 2.6 1.5 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.7-.3c-1.8-.8-3-1.8-3-3.9 0-1.9 1.5-3.4 3.8-3.4 1.6 0 2.8.6 3.6 2l-1.5.9c-.4-.7-1-.9-1.9-.9s-1.6.5-1.6 1.2c0 .8.5 1.1 1.8 1.7l.7.3c2.1.9 3.3 1.9 3.3 4 0 2.3-1.8 3.5-4.2 3.5-2.3 0-3.8-1.1-4.5-2.5l1.7-.8Z" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#4a87ab" />
      <path fill="#e6eef5" d="M13.3 12.2h-2.1v7.2H9.2v-7.2H7.1v-1.6h6.2v1.6Zm2.5 7.4c-.8 0-1.6-.2-2.2-.6l.5-1.5c.5.3 1.1.5 1.7.5.7 0 1.1-.3 1.1-.7 0-.4-.3-.6-1.2-.9l-.8-.3c-1.4-.5-2-1.3-2-2.6 0-1.5 1.2-2.6 3.2-2.6.8 0 1.5.2 2.1.5l-.5 1.5c-.5-.3-1-.4-1.5-.4-.7 0-1.1.3-1.1.7 0 .4.3.6 1.2.9l.8.3c1.6.6 2.2 1.4 2.2 2.7 0 1.6-1.2 2.6-3.5 2.6Z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#8eb8d4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#8eb8d4" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#8eb8d4" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#8eb8d4" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#6aa3c4" d="M2 4h4.2L12 14.2 17.8 4H22L12 22 2 4Z" />
      <path fill="#2c5570" d="M6.2 4h3.2L12 8.8 14.6 4h3.2L12 14.2 6.2 4Z" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#5a96b5" d="M11.3 2.2 3.8 6.5A1.6 1.6 0 0 0 3 7.9v8.2c0 .6.3 1.1.8 1.4l7.5 4.3c.5.3 1.1.3 1.6 0l7.5-4.3c.5-.3.8-.8.8-1.4V7.9c0-.6-.3-1.1-.8-1.4L12.9 2.2a1.6 1.6 0 0 0-1.6 0Z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#7eb4d0" d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.5.7.2 1.2.7 1.8 1.3C13.2 11 14.4 12 16.5 12c2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.5-.7-.2-1.2-.7-1.8-1.3C15.3 7 14.1 6 12 6Zm-5 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.5.7.2 1.2.7 1.8 1.3C8.2 17 9.4 18 11.5 18c2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.5-.7-.2-1.2-.7-1.8-1.3C10.3 13 9.1 12 7 12Z" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#8eb8d4" />
      <path fill="#0e1319" d="M16.7 16.8h-1.6l-5.2-8v8H8.3V7.2h1.7l5.2 8V7.2h1.5v9.6Z" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <text x="3" y="16" fill="#8eb8d4" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="700">ex</text>
    </svg>
  ),
  mongo: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#6aa3c4" d="M12.4 2s3.8 3.2 3.8 9.2c0 4.8-2.4 7.2-3.6 8.2l-.6 2.6h-.2l-.5-2.6C10 18.4 7.6 16 7.6 11.2 7.6 5.2 11.4 2 11.4 2h1Z" />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="8" ry="9" fill="#3d6a88" />
      <path fill="#e6eef5" d="M9 8.2c1.4-.8 4.6-.8 5.4.6.5.9.3 2.5-.6 3.2 1.3.4 2 1.4 1.6 2.8-.5 1.8-2.3 2.4-4.4 2.1V19H9.6v-2.1C8 16.6 7 15.4 7 13.6c0-2.2 1-4.4 2-5.4Zm1.6 1.4c-.5.5-.8 1.6-.4 2.4.6.1 1.6 0 2.1-.5.4-.5.4-1.5 0-2-.5-.5-1.2-.4-1.7.1Zm.3 4.3c-.7.1-1.3.5-1.3 1.2s.8 1.2 2.1 1.1v-2.2c-.3 0-.6-.1-.8-.1Z" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10" cy="7" r="3" fill="#5a8fb0" />
      <circle cx="14" cy="7" r="3" fill="#9ec9e0" />
      <circle cx="10" cy="12" r="3" fill="#3d6a88" />
      <circle cx="14" cy="12" r="3" fill="#7eb4d0" />
      <circle cx="10" cy="17" r="3" fill="#2c5570" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#5a96b5" d="M21.3 11 13 2.7a1 1 0 0 0-1.4 0l-2 2 2.5 2.5a1.7 1.7 0 0 1 2.1 2.1l2.4 2.4a1.7 1.7 0 1 1-1 1L13.3 11a1.7 1.7 0 0 1-1.9.3L9 13.7v.1A1.7 1.7 0 1 1 7.6 12L10 9.5l-.1-.3L7.3 6.6 2.7 11.2a1 1 0 0 0 0 1.4l8.3 8.3a1 1 0 0 0 1.4 0l8.9-8.9a1 1 0 0 0 0-1.4Z" />
    </svg>
  ),
}

export default function TechIcon({ id, label }) {
  return (
    <span className="tech-icon" title={label}>
      {ICONS[id]}
      <span>{label}</span>
    </span>
  )
}
