import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Market Demand',
    text: 'View demand signals by sector, role, skill and location.',
    link: 'Explore market demand',
  },
  {
    title: 'Skill & Evidence Gap',
    text: 'Identify skills that need development and competencies that need practical proof.',
    link: 'Assess skill and evidence gaps',
  },
  {
    title: 'Experience Bridge',
    text: 'Use role-specific practical tasks to build demonstrable experience.',
    link: 'Explore Experience Bridge',
  },
  {
    title: 'Training & Curriculum',
    text: 'Connect industry requirements with courses, curriculum and training needs.',
    link: 'View training services',
  },
  {
    title: 'Competency Passport',
    text: 'Maintain evidence of demonstrated and employer-validated competencies.',
    link: 'View competency services',
  },
  {
    title: 'Workforce Planning',
    text: 'Support district and institutional planning for skills, trainers and capacity.',
    link: 'View planning services',
  },
]

export default function Home() {
  return (
    <>
      <section className="gov-page-heading">
        <div className="gov-container">
          <p className="gov-breadcrumb">Home</p>
          <h1>Skill &amp; Workforce Alignment</h1>
          <p>
            From Industry Demand to Job-Ready Talent
          </p>
        </div>
      </section>

      <section className="gov-container gov-intro">
        <div className="gov-intro-main">
          <h2>SWAMARGA</h2>
          <p className="gov-lead">
            A digital platform for aligning workforce development with
            changing industry and labour-market requirements.
          </p>
          <p>
            SWAMARGA brings together labour-market signals, skill
            requirements, practical evidence, training information and
            workforce planning in one service environment.
          </p>

          <div className="gov-action-row">
            <Link to="/signup" className="gov-primary-button">
              Access services
            </Link>
            <Link to="/about" className="gov-secondary-button">
              About the platform
            </Link>
          </div>
        </div>

        <aside className="gov-notice-box" aria-labelledby="notice-heading">
          <h2 id="notice-heading">Important information</h2>
          <ul>
            <li>Prototype platform for SIH 2026, PS 26134.</li>
            <li>Demonstration data is labelled where applicable.</li>
            <li>Platform outputs are intended to support decision-making.</li>
          </ul>
        </aside>
      </section>

      <section id="services" className="gov-section gov-section-border">
        <div className="gov-container">
          <div className="gov-section-heading">
            <p className="gov-section-label">Services</p>
            <h2>Workforce development services</h2>
            <p>
              Services are organised around the needs of candidates,
              training institutions, employers and government authorities.
            </p>
          </div>

          <div className="gov-service-list">
            {services.map((service) => (
              <article className="gov-service-item" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to="/signup">{service.link}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stakeholders" className="gov-section">
        <div className="gov-container">
          <div className="gov-section-heading">
            <p className="gov-section-label">Stakeholders</p>
            <h2>Access services by role</h2>
          </div>

          <div className="gov-stakeholder-grid">
            <article>
              <h3>Candidate</h3>
              <p>
                Understand market demand, identify skill and evidence gaps,
                build practical experience and track competencies.
              </p>
              <Link to="/signup">Candidate services</Link>
            </article>

            <article>
              <h3>Training Institute</h3>
              <p>
                Review industry demand, course health, curriculum needs,
                trainer requirements and capacity.
              </p>
              <Link to="/signup">Institute services</Link>
            </article>

            <article>
              <h3>Employer</h3>
              <p>
                Define competency requirements, review evidence and provide
                employer validation and outcome feedback.
              </p>
              <Link to="/signup">Employer services</Link>
            </article>

            <article>
              <h3>Government / District Authority</h3>
              <p>
                Examine district-level demand and support workforce,
                training and capacity planning.
              </p>
              <Link to="/login">Government services</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="gov-section gov-section-border">
        <div className="gov-container">
          <div className="gov-section-heading">
            <p className="gov-section-label">How it works</p>
            <h2>From demand to action</h2>
          </div>

          <ol className="gov-process">
            <li><span>01</span><strong>Industry demand</strong></li>
            <li><span>02</span><strong>Gap analysis</strong></li>
            <li><span>03</span><strong>Practical experience</strong></li>
            <li><span>04</span><strong>Verified competencies</strong></li>
            <li><span>05</span><strong>Training &amp; capacity action</strong></li>
            <li><span>06</span><strong>Placement &amp; feedback</strong></li>
          </ol>
        </div>
      </section>

      <section className="gov-section gov-data-section">
        <div className="gov-container">
          <div className="gov-section-heading">
            <p className="gov-section-label">Information &amp; methodology</p>
            <h2>Understanding the information used by SWAMARGA</h2>
            <p>
              The platform is designed to combine job-market signals,
              employer inputs, training information and outcome data.
            </p>
          </div>

          <div className="gov-info-links">
            <Link to="/help#data">Data &amp; methodology</Link>
            <Link to="/help#resources">Reports &amp; resources</Link>
            <Link to="/about">About SWAMARGA</Link>
            <Link to="/contact">Feedback &amp; contact</Link>
          </div>
        </div>
      </section>

    </>
  )
}



