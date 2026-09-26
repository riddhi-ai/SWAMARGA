import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Route,
  ShieldCheck,
} from 'lucide-react'

const roles = [
  {
    icon: GraduationCap,
    title: 'Candidates',
    text: 'Understand skill and evidence gaps, build practical experience and explore relevant opportunities.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Employers',
    text: 'Define workplace competencies, review evidence and provide structured validation.',
  },
  {
    icon: Landmark,
    title: 'Government',
    text: 'Translate labour-market signals into district-level training and capacity decisions.',
  },
  {
    icon: GraduationCap,
    title: 'Training institutes',
    text: 'Identify curriculum, trainer, equipment and capacity actions from industry demand.',
  },
]

const capabilities = [
  'Labour-market intelligence',
  'Skill & evidence gap analysis',
  'Experience Bridge',
  'Curriculum alignment',
  'Training capacity planning',
  'Employer validation',
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Skill &amp; workforce alignment</p>

          <h1>
            From industry demand
            <br />
            to job-ready talent.
          </h1>

          <p className="hero-description">
            SWAMARGA connects labour-market demand, training systems and
            candidate capabilities to support better skills and employment
            decisions.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="button button-primary">
              Create an account
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/about" className="button button-secondary">
              Understand the platform
            </Link>
          </div>
        </div>

        <div className="home-hero-aside" aria-label="Platform pathway">
          <p className="aside-label">The alignment pathway</p>

          <ol className="pathway-list">
            <li>
              <span>01</span>
              <strong>Industry demand</strong>
              <small>What employers require</small>
            </li>
            <li>
              <span>02</span>
              <strong>Skill analysis</strong>
              <small>Where requirements and capability differ</small>
            </li>
            <li>
              <span>03</span>
              <strong>Training action</strong>
              <small>What should change or be added</small>
            </li>
            <li>
              <span>04</span>
              <strong>Practical capability</strong>
              <small>What a candidate can demonstrate</small>
            </li>
            <li>
              <span>05</span>
              <strong>Employment outcomes</strong>
              <small>What happens after training</small>
            </li>
          </ol>
        </div>
      </section>

      <section className="home-section home-section-bordered">
        <div className="section-lead">
          <p className="eyebrow">One platform, different workspaces</p>
          <h2>Each stakeholder sees the decisions relevant to them.</h2>
        </div>

        <div className="role-grid">
          {roles.map(({ icon: Icon, title, text }) => (
            <article className="role-item" key={title}>
              <Icon size={22} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-lead">
          <p className="eyebrow">What the platform connects</p>
          <h2>From signals to practical action.</h2>
          <p>
            SWAMARGA is designed around the complete alignment loop rather
            than a single skill-matching score.
          </p>
        </div>

        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <div className="capability-row" key={capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{capability}</strong>
              <ArrowRight size={17} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="home-loop">
        <div className="loop-heading">
          <p className="eyebrow">Continuous improvement</p>
          <h2>Training decisions should not stop at training.</h2>
        </div>

        <div className="loop-flow">
          <div>
            <BarChart3 aria-hidden="true" />
            <strong>Demand</strong>
            <span>Industry signals</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <GraduationCap aria-hidden="true" />
            <strong>Training</strong>
            <span>Curriculum &amp; capacity</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <ShieldCheck aria-hidden="true" />
            <strong>Validation</strong>
            <span>Practical evidence</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <Route aria-hidden="true" />
            <strong>Outcomes</strong>
            <span>Placement &amp; feedback</span>
          </div>
        </div>
      </section>

      <section className="home-note">
        <div>
          <strong>Prototype information</strong>
          <p>
            SWAMARGA is being developed as a prototype for SIH 2026, PS 26134.
            Demonstration, seeded and illustrative data are identified where
            applicable.
          </p>
        </div>

        <Link to="/about" className="text-arrow-link">
          Read about the platform <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
