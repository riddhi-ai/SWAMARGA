export default function Collaborators() {
  const groups = [
    {
      title: 'Government & public institutions',
      text: 'Stakeholders responsible for skills, employment, district planning and public training programmes.',
    },
    {
      title: 'Training ecosystem',
      text: 'Training institutes, trainers and programme teams responsible for delivering relevant learning.',
    },
    {
      title: 'Industry & employers',
      text: 'Employers and industry representatives who define workplace requirements and validate competencies.',
    },
  ]

  return (
    <div className="public-page">
      <section className="page-hero">
        <p className="eyebrow">Collaborators</p>
        <h1>Built around the people who shape the skills ecosystem.</h1>
        <p>
          SWAMARGA is designed to connect government, training providers,
          employers and candidates without presenting unverified organisations
          as confirmed partners.
        </p>
      </section>

      <section className="collaborator-grid">
        {groups.map((group, index) => (
          <article key={group.title} className="collaborator-item">
            <span>0{index + 1}</span>
            <h2>{group.title}</h2>
            <p>{group.text}</p>
          </article>
        ))}
      </section>

      <section className="public-callout">
        <strong>Prototype status</strong>
        <p>
          This page describes stakeholder categories for the proposed
          platform. It does not claim confirmed partnerships or endorsements.
        </p>
      </section>
    </div>
  )
}
