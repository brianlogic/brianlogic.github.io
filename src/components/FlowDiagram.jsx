import { useId, useLayoutEffect, useRef, useState } from 'react'
import './FlowDiagram.css'

function NodeCard({ node, index }) {
  return (
    <span className="arch-node">
      {index != null ? <span className="arch-node__step">{String(index + 1).padStart(2, '0')}</span> : null}
      <strong>{node.label}</strong>
      {node.detail ? <em>{node.detail}</em> : null}
      {node.body ? <p>{node.body}</p> : null}
      {node.tags?.length ? (
        <span className="arch-tags">
          {node.tags.map((tag) => (
            <i key={tag}>{tag}</i>
          ))}
        </span>
      ) : null}
    </span>
  )
}

function Chip({ slot, label, detail, hub = false }) {
  return (
    <span className={`arch-chip${hub ? ' is-hub' : ''}`} data-slot={slot}>
      <strong>{label}</strong>
      {detail ? <em>{detail}</em> : null}
    </span>
  )
}

function sidePoint(box, side) {
  if (side === 'top') return { x: box.cx, y: box.top }
  if (side === 'bottom') return { x: box.cx, y: box.bottom }
  if (side === 'left') return { x: box.left, y: box.cy }
  if (side === 'right') return { x: box.right, y: box.cy }
  return { x: box.cx, y: box.cy }
}

function autoSides(a, b) {
  const dx = b.cx - a.cx
  const dy = b.cy - a.cy
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx >= 0 ? ['right', 'left'] : ['left', 'right']
  }
  return dy >= 0 ? ['bottom', 'top'] : ['top', 'bottom']
}

function isHorizontal(side) {
  return side === 'left' || side === 'right'
}

function orthoPath(start, end, fromSide, toSide) {
  const hStart = isHorizontal(fromSide)
  const hEnd = isHorizontal(toSide)

  if (hStart && hEnd) {
    const midX = (start.x + end.x) / 2
    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`
  }

  if (!hStart && !hEnd) {
    const midY = (start.y + end.y) / 2
    return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`
  }

  if (hStart) {
    return `M ${start.x} ${start.y} L ${end.x} ${start.y} L ${end.x} ${end.y}`
  }

  return `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`
}

function pathLabel(start, end, fromSide, toSide) {
  const hStart = isHorizontal(fromSide)
  const hEnd = isHorizontal(toSide)
  const alignedX = Math.abs(start.x - end.x) < 10
  const alignedY = Math.abs(start.y - end.y) < 10
  let x = (start.x + end.x) / 2
  let y = (start.y + end.y) / 2

  if (hStart && !hEnd) {
    x = start.x + (end.x - start.x) * 0.62
    y = start.y - 11
  } else if (!hStart && !hEnd && alignedX) {
    x += 22
  } else if (hStart && hEnd && alignedY) {
    y -= 11
  } else {
    y -= 10
  }

  return { lx: x, ly: y }
}

function useWires(rootRef, edges) {
  const [wires, setWires] = useState([])
  const serialized = JSON.stringify(edges)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const list = JSON.parse(serialized)

    const draw = () => {
      const origin = root.getBoundingClientRect()

      const boxOf = (name) => {
        const el = root.querySelector(`[data-slot="${CSS.escape(name)}"]`)
        if (!el) return null
        const rect = el.getBoundingClientRect()
        return {
          cx: rect.left - origin.left + rect.width / 2,
          cy: rect.top - origin.top + rect.height / 2,
          left: rect.left - origin.left,
          right: rect.right - origin.left,
          top: rect.top - origin.top,
          bottom: rect.bottom - origin.top,
        }
      }

      setWires(
        list.flatMap((edge) => {
          const from = boxOf(edge.from)
          const to = boxOf(edge.to)
          if (!from || !to) return []

          const [fromSide, toSide] =
            edge.fromSide && edge.toSide ? [edge.fromSide, edge.toSide] : autoSides(from, to)
          const start = sidePoint(from, fromSide)
          const end = sidePoint(to, toSide)
          const { lx, ly } = pathLabel(start, end, fromSide, toSide)

          return [
            {
              d: orthoPath(start, end, fromSide, toSide),
              label: edge.label,
              lx,
              ly,
              tone: edge.tone || '',
            },
          ]
        }),
      )
    }

    draw()
    const frame = requestAnimationFrame(draw)
    const observer = new ResizeObserver(draw)
    observer.observe(root)
    window.addEventListener('resize', draw)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', draw)
    }
  }, [serialized])

  return wires
}

function WireBoard({ className, edges, children }) {
  const rootRef = useRef(null)
  const wires = useWires(rootRef, edges)
  const markerId = `arr${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <div ref={rootRef} className={className}>
      <svg className="wires" aria-hidden="true">
        <defs>
          {['', 'ok', 'warn'].map((tone) => (
            <marker
              key={tone || 'default'}
              id={tone ? `${markerId}-${tone}` : markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M 0 1.2 L 10 5 L 0 8.8 z" className={tone ? `wire-head is-${tone}` : 'wire-head'} />
            </marker>
          ))}
        </defs>
        {wires.map((wire, index) => (
          <g key={`${wire.d}-${index}`} className={wire.tone ? `is-${wire.tone}` : undefined}>
            <path
              d={wire.d}
              className="wire-line"
              fill="none"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd={`url(#${wire.tone ? `${markerId}-${wire.tone}` : markerId})`}
            />
            {wire.label ? (
              <text x={wire.lx} y={wire.ly} textAnchor="middle">
                {wire.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      {children}
    </div>
  )
}

function ChartBox({ slot, label, detail, kind = 'process' }) {
  if (kind === 'decision') {
    return (
      <div className="chart-dia" data-slot={slot} role="img" aria-label={label}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,3 97,50 50,97 3,50" />
        </svg>
        <span>{label}</span>
      </div>
    )
  }

  return (
    <div className={`chart-box is-${kind}`} data-slot={slot}>
      <strong>{label}</strong>
      {detail ? <em>{detail}</em> : null}
    </div>
  )
}

const STACK_LINKS = [
  { from: 'browser', to: 'hub', label: 'HTTPS' },
  { from: 'hub', to: 'entra', label: 'OIDC' },
  { from: 'hub', to: 'graph', label: 'Graph' },
  { from: 'hub', to: 'orm', label: 'Prisma' },
  { from: 'orm', to: 'db', label: 'SQL' },
]

function StackMap({ nodes = [], links }) {
  const bySlot = Object.fromEntries(nodes.map((node) => [node.slot, node]))
  const edges = links?.length ? links : STACK_LINKS

  return (
    <WireBoard className="stack-map" edges={edges}>
      {bySlot.entra ? (
        <div className="stack-map__cell is-entra">
          <Chip slot="entra" label={bySlot.entra.label} detail={bySlot.entra.detail} />
        </div>
      ) : null}
      {bySlot.graph ? (
        <div className="stack-map__cell is-graph">
          <Chip slot="graph" label={bySlot.graph.label} detail={bySlot.graph.detail} />
        </div>
      ) : null}
      {bySlot.browser ? (
        <div className="stack-map__cell is-browser">
          <Chip slot="browser" label={bySlot.browser.label} detail={bySlot.browser.detail} />
        </div>
      ) : null}
      {bySlot.hub ? (
        <div className="stack-map__cell is-hub">
          <Chip slot="hub" label={bySlot.hub.label} detail={bySlot.hub.detail} hub />
        </div>
      ) : null}
      {bySlot.orm ? (
        <div className="stack-map__cell is-orm">
          <Chip slot="orm" label={bySlot.orm.label} detail={bySlot.orm.detail} />
        </div>
      ) : null}
      {bySlot.db ? (
        <div className="stack-map__cell is-db">
          <Chip slot="db" label={bySlot.db.label} detail={bySlot.db.detail} />
        </div>
      ) : null}
    </WireBoard>
  )
}

function Flowchart({ layer }) {
  const chart = layer.chart || {}
  const start = chart.start || []
  const after = chart.afterReviewer || []
  const lastStart = start.length ? `start-${start.length - 1}` : null
  const firstAfter = after.length ? 'after-0' : 'agate'
  const lastAfter = after.length ? `after-${after.length - 1}` : null

  const edges = [
    ...start.slice(1).map((_, index) => ({ from: `start-${index}`, to: `start-${index + 1}` })),
    lastStart ? { from: lastStart, to: 'rgate' } : null,
    { from: 'rgate', to: 'back', label: 'Reject', fromSide: 'left', toSide: 'top', tone: 'warn' },
    { from: 'rgate', to: firstAfter, label: 'Accept', fromSide: 'right', toSide: 'top', tone: 'ok' },
    ...after.slice(1).map((_, index) => ({ from: `after-${index}`, to: `after-${index + 1}` })),
    lastAfter ? { from: lastAfter, to: 'agate' } : null,
    { from: 'agate', to: 'back', label: 'Reject', fromSide: 'left', toSide: 'bottom', tone: 'warn' },
    { from: 'agate', to: 'done', label: 'Accept', tone: 'ok' },
  ].filter(Boolean)

  return (
    <WireBoard className="chart" edges={edges}>
      <div className="chart-spine">
        {start.map((step, index) => (
          <ChartBox
            key={step.label}
            slot={`start-${index}`}
            label={step.label}
            detail={step.detail}
            kind={index === 0 ? 'start' : 'process'}
          />
        ))}
        <ChartBox slot="rgate" label={chart.reviewerGate || 'Accept?'} kind="decision" />
      </div>

      <div className="chart-fork">
        <ChartBox
          slot="back"
          label={chart.back || 'Returned'}
          detail="Notes go back to the author"
          kind="warn"
        />
        <div className="chart-continue">
          {after.map((step, index) => (
            <ChartBox key={step.label} slot={`after-${index}`} label={step.label} detail={step.detail} />
          ))}
          <ChartBox slot="agate" label={chart.adminGate || 'Accept?'} kind="decision" />
          <ChartBox slot="done" label={chart.done || 'Accepted'} kind="end" />
        </div>
      </div>
    </WireBoard>
  )
}

function ShipMap({ nodes = [] }) {
  const local = nodes.filter((node) => node.lane === 'local')
  const ship = nodes.filter((node) => node.lane !== 'local')
  const edges = ship.slice(0, -1).map((node, index) => ({
    from: node.id,
    to: ship[index + 1].id,
  }))

  return (
    <div className="ship">
      {local.length ? (
        <div className="ship-lane is-local">
          <p className="ship-kicker">Local</p>
          {local.map((node) => (
            <Chip key={node.id || node.label} slot={node.id} label={node.label} detail={node.detail} />
          ))}
        </div>
      ) : null}

      <div className="ship-lane">
        <p className="ship-kicker">CI / CD</p>
        <WireBoard className="ship-row" edges={edges}>
          {ship.map((node) => (
            <Chip key={node.id || node.label} slot={node.id} label={node.label} detail={node.detail} />
          ))}
        </WireBoard>
      </div>
    </div>
  )
}

function LayerBody({ layer }) {
  const nodes = layer.nodes || []

  if (layer.kind === 'flowchart') {
    return <Flowchart layer={layer} />
  }

  if (layer.kind === 'stackmap') {
    return <StackMap nodes={nodes} links={layer.links} />
  }

  if (layer.kind === 'strip') {
    return <ShipMap nodes={nodes} />
  }

  if (layer.kind === 'identity') {
    const [left, right] = nodes
    return (
      <div className="arch-identity">
        {left ? <NodeCard node={left} /> : null}
        <div className="arch-handshake" aria-hidden="true">
          <span>{layer.bridge || 'OAuth 2.0'}</span>
        </div>
        {right ? <NodeCard node={right} /> : null}
      </div>
    )
  }

  if (layer.kind === 'pipeline') {
    return (
      <ol className="arch-pipe">
        {nodes.map((node, index) => (
          <li key={node.id || node.label}>
            <span className="arch-chip">
              <strong>{node.label}</strong>
              {node.detail ? <em>{node.detail}</em> : null}
            </span>
            {index < nodes.length - 1 ? <span className="arch-rail" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ol className="arch-strip">
      {nodes.map((node, nodeIndex) => (
        <li key={node.id || node.label}>
          {nodeIndex > 0 ? <span className="flow-arrow" aria-hidden="true" /> : null}
          <span className="arch-chip">
            <strong>{node.label}</strong>
            {node.detail ? <em>{node.detail}</em> : null}
          </span>
        </li>
      ))}
    </ol>
  )
}

export default function FlowDiagram({ caption, nodes = [], layers, image, imageAlt }) {
  if (image) {
    return (
      <figure className="flow">
        <img src={image} alt={imageAlt || caption || ''} />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    )
  }

  if (layers?.length) {
    return (
      <figure className="flow arch">
        <div className="arch-stack">
          {layers.map((layer) => (
            <section key={layer.id || layer.title} className={`arch-band is-${layer.kind || 'flow'}`}>
              <header className="arch-head">
                <div>
                  {layer.kicker ? <p className="arch-kicker">{layer.kicker}</p> : null}
                  {layer.title ? <h3>{layer.title}</h3> : null}
                  {layer.blurb ? <p className="arch-blurb">{layer.blurb}</p> : null}
                </div>
              </header>
              <LayerBody layer={layer} />
            </section>
          ))}
        </div>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    )
  }

  if (!nodes.length) return null

  return (
    <figure className="flow">
      <ol className="flow-nodes">
        {nodes.map((node, index) => (
          <li key={node.id || node.label}>
            {index > 0 ? <span className="flow-arrow" aria-hidden="true" /> : null}
            <span className="flow-node">{node.label}</span>
          </li>
        ))}
      </ol>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
