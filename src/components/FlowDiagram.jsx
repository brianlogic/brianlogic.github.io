import './FlowDiagram.css'

export default function FlowDiagram({ caption, nodes = [], image, imageAlt }) {
  if (image) {
    return (
      <figure className="flow">
        <img src={image} alt={imageAlt || caption || ''} />
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
