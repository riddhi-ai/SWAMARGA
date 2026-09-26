import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section className="gov-page-heading">
        <div className="gov-container">
          <p className="gov-breadcrumb">
            <Link to="/">Home</Link> / About SWAMARGA
          </p>
          <h1>About SWAMARGA</h1>
          <p>Skill &amp; Workforce Alignment through Market Analysis, Readiness, Guidance &amp; Advancement</p>
        </div>
      </section>

      <div className="gov-container gov-content-page">
        <section>
          <h2>Purpose</h2>
          <p>
            SWAMARGA is designed to help connect changing industry demand
            with workforce development decisions. It brings together
            information that can otherwise remain separated across labour
            markets, training programmes, candidates, employers and
            institutions.
          </p>
        </section>

        <section>
          <h2>What the platform connects</h2>
          <div className="gov-definition-list">
            <div><strong>Industry demand</strong><span>Roles, skills, locations and emerging requirements.</span></div>
            <div><strong>Workforce readiness</strong><span>Skills, evidence and practical demonstrations.</span></div>
            <div><strong>Training systems</strong><span>Courses, curriculum, trainers, labs and capacity.</span></div>
            <div><strong>Outcomes</strong><span>Placement, employer feedback and competency validation.</span></div>
          </div>
        </section>

        <section>
          <h2>Designed for multiple stakeholders</h2>
          <p>
            Candidate, training institute, employer and government views
            expose different parts of the same workforce development
            ecosystem.
          </p>
        </section>

        <section>
          <h2>Prototype status</h2>
          <p>
            SWAMARGA is being developed as a prototype for Smart India
            Hackathon 2026, Problem Statement 26134. Demonstration data is
            not presented as official Maharashtra statistics.
          </p>
        </section>
      </div>
    </>
  )
}



