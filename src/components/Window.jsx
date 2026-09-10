import './Window.css'

export function WindowChrome({ title, meta }) {
  return (
    <div className="window-chrome" aria-hidden="true">
      <span className="window-lights">
        <i />
        <i />
        <i />
      </span>
      {title ? <strong>{title}</strong> : null}
      {meta ? <em>{meta}</em> : null}
    </div>
  )
}

export default function Window({ title, meta, nested = false, className = '', children }) {
  return (
    <section className={`window ${nested ? 'is-nested' : ''} ${className}`.trim()}>
      <WindowChrome title={title} meta={meta} />
      <div className="window__body">{children}</div>
    </section>
  )
}
