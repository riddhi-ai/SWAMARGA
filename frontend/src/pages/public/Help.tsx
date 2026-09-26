import { Link } from 'react-router-dom'

export default function Help() {
  return (
    <>
      <section className="gov-page-heading">
        <div className="gov-container">
          <p className="gov-breadcrumb">
            <Link to="/">Home</Link> / Help
          </p>
          <h1>Help &amp; information</h1>
          <p>Access guidance about services, accessibility and platform information.</p>
        </div>
      </section>

      <div className="gov-container gov-content-page">
        <section>
          <h2>Getting started</h2>
          <p>
            Select the service area relevant to your role. Candidate,
            training institute, employer and government services provide
            different workflows.
          </p>
        </section>

        <section id="accessibility">
          <h2>Accessibility</h2>
          <p>
            SWAMARGA is being developed with WCAG 2.2 AA accessibility
            requirements in mind, including keyboard access, visible focus,
            semantic structure, readable contrast and responsive layouts.
          </p>
        </section>

        <section id="data">
          <h2>Data &amp; methodology</h2>
          <p>
            The prototype is designed to use job-market signals, employer
            inputs, industry consultations, sector information, training
            information and outcomes. Data sources and their status should
            be clearly identified within the platform.
          </p>
        </section>

        <section id="resources">
          <h2>Resources</h2>
          <div className="gov-resource-list">
            <a href="#resources">Reports and labour-market information</a>
            <a href="#resources">Skill development programmes</a>
            <a href="#resources">Training and curriculum information</a>
            <a href="#resources">Methodology and platform documentation</a>
          </div>
        </section>

        <section id="privacy">
          <h2>Privacy</h2>
          <p>
            Privacy, data-use and consent requirements should be defined
            before production deployment. This prototype does not represent
            a production privacy policy.
          </p>
        </section>
      </div>
    </>
  )
}



