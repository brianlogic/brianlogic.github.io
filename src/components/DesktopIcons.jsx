import { DESKTOP_ICON_GROUPS } from './iconRegistry'
import './DesktopIcons.css'

export default function DesktopIcons() {
  return (
    <div className="desktop-icons" aria-hidden="true">
      {DESKTOP_ICON_GROUPS.map(({ name, items }) => (
        <div className="desktop-icons__group" data-group={name} key={name}>
          {items.map(({ label, Icon, color, src }) => (
            <span className="desktop-icon" key={label}>
              <span className="desktop-icon__art">
                {src ? <img src={src} alt="" draggable="false" /> : <Icon color={color} />}
              </span>
              <em>{label}</em>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
