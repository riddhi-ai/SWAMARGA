type Props = {
  title: string
  description: string
}

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <section className="empty-page">
      <p className="eyebrow">SWAMARGA</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}
