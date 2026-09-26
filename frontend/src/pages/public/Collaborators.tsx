import { Link } from 'react-router-dom'

export default function Collaborators() {
  return (
    <>
      <section className="gov-page-heading">
        <div className="gov-container">
          <p className="gov-breadcrumb">
            <Link to="/">Home</Link> / Collaborators
          </p>
          <h1>Collaborators &amp; ecosystem</h1>
          <p>Stakeholders involved in workforce development and industry alignment.</p>
        </div>
      </section>

      <div className="gov-container gov-content-page">
        <section>
          <h2>Workforce ecosystem</h2>
          <p>
            Effective skill alignment involves coordination between
            government authorities, training providers, employers, industry
            representatives and candidates.
          </p>
        </section>

        <section>
          <div className="gov-definition-list">
            <div><strong>Government &amp; district authorities</strong><span>Planning, monitoring and workforce interventions.</span></div>
            <div><strong>Training institutions</strong><span>Curriculum, delivery, trainers and infrastructure.</span></div>
            <div><strong>Employers &amp; industry</strong><span>Demand signals, competency requirements and validation.</span></div>
            <div><strong>Candidates &amp; learners</strong><span>Skills, practical evidence, training and employment pathways.</span></div>
          </div>
        </section>

        <section>
          <h2>Prototype information</h2>
          <p>
            Formal institutional partnerships and official data integrations
            should only be represented after they are established and
            verified.
          </p>
        </section>
      </div>
    </>
  )
}



