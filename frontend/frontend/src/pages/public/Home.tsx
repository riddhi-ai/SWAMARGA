import { Link } from 'react-router-dom'
import { Section, ServiceList } from '../../components/SwamargaPage'

const services = [
  {
    title: 'Market demand',
    description: 'See roles, skills and workforce signals by sector and location.',
    href: '/candidate/market-demand',
    audience: 'Candidates · Institutes · Government',
  },
  {
    title: 'Skill & evidence gap',
    description: 'Understand the difference between what is required and what can be demonstrated.',
    href: '/candidate/skill-evidence-gap',
    audience: 'Candidates',
  },
  {
    title: 'Experience Bridge',
    description: 'Turn evidence gaps into practical, role-specific work.',
    href: '/candidate/experience-bridge',
    audience: 'Candidates · Employers',
  },
  {
    title: 'Training & course intelligence',
    description: 'Connect industry requirements with curriculum, trainers and capacity.',
    href: '/institute',
    audience: 'Training institutes · Government',
  },
  {
    title: 'Competency validation',
    description: 'Review practical evidence and validate demonstrated competencies.',
    href: '/employer',
    audience: 'Employers',
  },
  {
    title: 'Planning & capacity',
    description: 'Translate workforce signals into district-level planning actions.',
    href: '/government',
    audience: 'Government · District authorities',
  },
]

export default function Home() {
  return (
    <>
      <section className="home-intro site-width">
        <div className="home-intro-copy">
          <div className="page-eyebrow">Skill & workforce alignment</div>
          <h1>Connecting industry demand with the skills, training and evidence needed for work.</h1>
          <p>
            SWAMARGA brings labour-market signals, candidate skill evidence,
            training intelligence and employment outcomes into one connected
            service.
          </p>
          <div className="intro-actions">
            <Link to="/signup" className="primary-button">Create an account</Link>
            <Link to="/about" className="secondary-button">How SWAMARGA works</Link>
          </div>
        </div>

        <div className="home-intro-note">
          <span>SWAMARGA</span>
          <strong>From Industry Demand<br />to Job-Ready Talent</strong>
          <p>
            A prototype for the skill-development and employment ecosystem.
          </p>
        </div>
      </section>

      <section className="notice-strip">
        <div className="site-width notice-inner">
          <strong>Important information</strong>
          <span>
            Prototype data is clearly identified. Demonstration values are not
            official Maharashtra statistics.
          </span>
          <Link to="/help">Read about the platform →</Link>
        </div>
      </section>

      <div className="site-width home-content">
        <Section
          title="Services"
          intro="Access the parts of the workforce-alignment system relevant to your role."
        >
          <ServiceList items={services} />
        </Section>

        <Section
          title="Who uses SWAMARGA"
          intro="Different users see different information and actions."
        >
          <div className="stakeholder-grid" id="stakeholders">
            <Link to="/signup"><b>01</b><strong>Candidates</strong><span>Skills, evidence, practical experience and opportunities.</span></Link>
            <Link to="/signup"><b>02</b><strong>Training institutes</strong><span>Curriculum, course health, trainers and capacity.</span></Link>
            <Link to="/signup"><b>03</b><strong>Employers</strong><span>Competencies, hiring requirements and validation.</span></Link>
            <Link to="/login"><b>04</b><strong>Government</strong><span>Labour-market intelligence and planning information.</span></Link>
          </div>
        </Section>

        <Section
          title="The alignment loop"
          intro="SWAMARGA connects the stages that are often handled separately."
        >
          <div className="process-line">
            {[
              ['01', 'Industry demand'],
              ['02', 'Gap analysis'],
              ['03', 'Practical experience'],
              ['04', 'Verified skills'],
              ['05', 'Training action'],
              ['06', 'Outcomes & feedback'],
            ].map(([number, title]) => (
              <div key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Information & methodology"
          intro="Understand what the platform measures and how demonstration data is treated."
        >
          <div className="resource-list">
            <Link to="/about"><strong>About the problem</strong><span>Why labour-market alignment requires connected information.</span>→</Link>
            <Link to="/help"><strong>Data and methodology</strong><span>How live, seeded, prototype and illustrative information is distinguished.</span>→</Link>
            <Link to="/contact"><strong>Questions and feedback</strong><span>Get help with access or provide platform feedback.</span>→</Link>
          </div>
        </Section>
      </div>
    </>
  )
}
