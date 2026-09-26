import { PageIntro, Section } from '../../components/SwamargaPage'

export default function Collaborators() {
  return (
    <div className="site-width standard-page">
      <PageIntro
        eyebrow="Ecosystem"
        title="Designed for a connected workforce ecosystem."
        description="SWAMARGA brings together the information needs of candidates, training providers, employers and public workforce planners."
      />

      <Section title="Stakeholder groups">
        <div className="plain-grid">
          <article><b>Industry & employers</b><p>Define current competencies, validate practical evidence and provide outcome feedback.</p></article>
          <article><b>Training institutions</b><p>Use demand and outcome information to review curriculum and training capacity.</p></article>
          <article><b>Government & districts</b><p>Use aggregated workforce intelligence for planning and intervention.</p></article>
          <article><b>Candidates</b><p>Build practical evidence and understand the requirements behind opportunities.</p></article>
        </div>
      </Section>

      <div className="callout">
        <strong>Prototype status</strong>
        <p>
          This page describes stakeholder categories. It does not claim confirmed
          partnerships or endorsements.
        </p>
      </div>
    </div>
  )
}
