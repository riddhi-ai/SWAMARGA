type Props = {
  label: string
  value: string | number
  detail: string
}

export default function MetricCard({ label, value, detail }: Props) {
  return (
    <section className="metric-card" aria-label={label}>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      <p className="metric-detail">{detail}</p>
    </section>
  )
}
