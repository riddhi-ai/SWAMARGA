import { Section, PageIntro } from '../../components/SwamargaPage'

export default function About() {
  return (
    <div className="site-width standard-page">
      <PageIntro
        eyebrow="About SWAMARGA"
        title="A connected view of skills, workforce demand and training action."
        description="SWAMARGA is designed around the challenge of aligning skill development with changing industry requirements and emerging job-market demand."
      />

      <Section title="The problem">
        <div className="reading-grid">
          <p>
            Labour-market demand changes faster than many training systems can
            update their curriculum, capacity and planning. At the same time,
            candidate skill records often do not show whether a person can
            practically demonstrate a competency.
          </p>
          <p>
            SWAMARGA connects these information points so that demand signals can
            lead to practical candidate actions, institutional decisions and
            workforce planning.
          </p>
        </div>
      </Section>

      <Section title="What makes the platform different">
        <div className="plain-grid">
          <article><b>Evidence Gap Engine</b><p>Separates a skill a person has not developed from a skill they may know but cannot yet demonstrate.</p></article>
          <article><b>Experience Bridge</b><p>Turns evidence gaps into practical role-specific tasks and projects.</p></article>
          <article><b>Demand-to-Action</b><p>Connects labour-market signals with curriculum, trainer, equipment and seat planning.</p></article>
          <article><b>Competency Passport</b><p>Records demonstrated and employer-validated competencies rather than course completion alone.</p></article>
        </div>
      </Section>

      <Section title="Prototype data">
        <div className="callout">
          <strong>Data provenance matters.</strong>
          <p>
            SWAMARGA distinguishes live API data, seeded demonstration data,
            prototype data and illustrative scenario values. Demonstration
            numbers must not be interpreted as official Maharashtra statistics.
          </p>
        </div>
      </Section>
    </div>
  )
}
