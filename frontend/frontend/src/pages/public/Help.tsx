import { PageIntro, Section } from '../../components/SwamargaPage'

const questions = [
  ['What is SWAMARGA?', 'A workforce-alignment platform connecting labour-market demand, candidate evidence, training intelligence and outcomes.'],
  ['What is an evidence gap?', 'A situation where a person may have learned a skill but does not yet have sufficient practical evidence to demonstrate it.'],
  ['Is the information official government data?', 'Not all information in the prototype is official. Seeded, prototype and illustrative information is labelled separately.'],
  ['Who can use the platform?', 'Candidate, training-institute, employer and government workspaces are designed for different users.'],
]

export default function Help() {
  return (
    <div className="site-width standard-page">
      <PageIntro eyebrow="Help & resources" title="Find your way around SWAMARGA." description="Answers to common questions about the platform and its information." />

      <Section title="Frequently asked questions">
        <div className="faq-list">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="Using the platform">
        <div className="reading-grid">
          <p><strong>Candidates:</strong> begin with your profile and target role, then review the skill and evidence gaps.</p>
          <p><strong>Institutes:</strong> review market demand, course health and capacity before making curriculum or resource decisions.</p>
          <p><strong>Employers:</strong> define competencies and review practical evidence.</p>
          <p><strong>Government:</strong> use aggregated information for district-level planning and capacity decisions.</p>
        </div>
      </Section>
    </div>
  )
}
