import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div className="public-page">
      <section className="page-hero">
        <p className="eyebrow">About SWAMARGA</p>
        <h1>
          Connecting industry demand,
          <br />
          training and employment outcomes.
        </h1>
        <p>
          SWAMARGA is a proposed labour-market intelligence and
          skill-alignment platform for candidates, training institutions,
          employers and government stakeholders.
        </p>
      </section>

      <section className="content-block" id="how-it-works">
        <div className="content-label">The problem</div>
        <div className="content-copy">
          <h2>Skills requirements change faster than training systems can respond.</h2>
          <p>
            Training programmes can become disconnected from changing
            technologies, local industry requirements, practical workplace
            competencies and employer expectations.
          </p>
          <p>
            The platform is designed to connect these signals and turn them
            into decisions about skills, courses, practical assessment,
            trainers, equipment and capacity.
          </p>
        </div>
      </section>

      <section className="content-block">
        <div className="content-label">Two connected pathways</div>
        <div className="pathway-columns">
          <div>
            <h2>Candidate &amp; training</h2>
            <p>
              Candidate profile → skill and evidence gap → learning
              recommendation → Experience Bridge → assessment and validation
              → Competency Passport → opportunity matching.
            </p>
          </div>

          <div>
            <h2>Institution &amp; policy</h2>
            <p>
              Industry demand → skill analysis → course mapping → curriculum
              recommendations → trainer, equipment and capacity planning →
              district action.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block">
        <div className="content-label">Why evidence matters</div>
        <div className="content-copy">
          <h2>A skill gap and an evidence gap are not the same thing.</h2>
          <p>
            A candidate may not know a competency, may have learned it
            theoretically, or may know it but not yet have practical evidence
            demonstrating it.
          </p>
          <p>
            SWAMARGA separates these states so that the next action can be
            more specific than simply recommending another course.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <div>
          <p className="eyebrow">Explore the service</p>
          <h2>See how the platform works for your role.</h2>
        </div>
        <Link to="/signup" className="button button-primary">
          Create an account
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
