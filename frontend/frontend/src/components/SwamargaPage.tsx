import { Link } from 'react-router-dom'

type SectionProps = {
  title: string
  intro?: string
  children: React.ReactNode
}

export function Section({ title, intro, children }: SectionProps) {
  return (
    <section className="sw-section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

type Service = {
  title: string
  description: string
  href: string
  audience?: string
}

export function ServiceList({ items }: { items: Service[] }) {
  return (
    <div className="service-list">
      {items.map((item, index) => (
        <Link className="service-row" to={item.href} key={item.title}>
          <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="service-main">
            <strong>{item.title}</strong>
            <span>{item.description}</span>
            {item.audience && <small>{item.audience}</small>}
          </span>
          <span className="service-arrow" aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  )
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className="page-intro">
      {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  )
}

export function InfoTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Status({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'green' | 'orange' | 'red'
}) {
  return <span className={`status status-${tone}`}>{children}</span>
}

export function WorkspacePage({
  role,
  title,
  description,
  children,
}: {
  role: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="workspace">
      <div className="workspace-topline">
        <span>{role}</span>
        <span>SWAMARGA · Prototype workspace</span>
      </div>

      <PageIntro title={title} description={description} />

      {children}
    </div>
  )
}
